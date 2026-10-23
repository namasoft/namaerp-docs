package com.namasoft.modules.srvcenter.domain.utils

import com.namasoft.common.utilities.CollectionsUtility
import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.common.invoicing.IInvoice
import com.namasoft.infra.domainbase.datafields.BooleanDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.datafields.UniqueIDDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.generic.GenericReference
import com.namasoft.infra.domainbase.util.DetailLineUtil
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.srvcenter.domain.entities.SIPurchaseInvoice
import com.namasoft.modules.srvcenter.domain.entities.SISalesInvoice
import com.namasoft.modules.supplychain.domain.details.BasicSCDocumentLine
import com.namasoft.modules.supplychain.domain.entities.*

import java.util.stream.Collectors

public class EAGuessInvoiceSourceLineOfSourceLineId implements EntityAction<BasicSCDocument> {

    @Override
    Result doAction(BasicSCDocument doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        if (!(doc instanceof AbsSalesInvoice || doc instanceof AbsPurchaseInvoice))
            return result;
        IInvoice invoice = (IInvoice) doc;
        if (BooleanDF.isTrue(invoice.ifOut()))
            guessSourceLineForSales((AbsSalesInvoice) doc);
        else
            guessSourceLineForPurchase((AbsPurchaseInvoice) doc);
        return result;
    }

    private void guessSourceLineForSales(AbsSalesInvoice invoice) {
        List<StockIssue> stockIssues = new ArrayList<>();
        if (invoice instanceof SalesInvoice)
            stockIssues.addAll(((SalesInvoice) invoice).getStockDocs().stream().map({ l -> l.getStockDoc() }).collect(Collectors.toList()));
        else
            stockIssues.addAll(((SISalesInvoice) invoice).getStockDocs().stream().map({ l -> l.getStockDoc() }).collect(Collectors.toList()));
        guessSourceLines(invoice, stockIssues);
    }

    private void guessSourceLineForPurchase(AbsPurchaseInvoice invoice) {
        List<StockReceipt> stockReceipts = new ArrayList<>();
        if (invoice instanceof PurchaseInvoice)
            stockReceipts.addAll(((PurchaseInvoice) invoice).getStockDocs().stream().map({ l -> l.getStockDoc() }).collect(Collectors.toList()));
        else
            stockReceipts.addAll(((SIPurchaseInvoice) invoice).getStockDocs().stream().map({ l -> l.getStockDoc() }).collect(Collectors.toList()));
        guessSourceLines(invoice, stockReceipts);
    }

    private void guessSourceLines(BasicSCDocument doc, List<? extends BasicSCDocument> stockDocs) {
        BasicSCDocument fromDoc = GenericReference.toRealOrNull(doc.getFromDoc(), BasicSCDocument.class);
        if (fromDoc == null)
            return;
        for (BasicSCDocumentLine line : doc.getDetails()) {
            if (ObjectChecker.isEmptyOrNull(line.getSourceLineId()))
                continue;
            BasicSCDocumentLine fromDocLine = DetailLineUtil.findLineWithId(fromDoc.getDetails(), line.getSourceLineId());
            if (fromDocLine != null)
                continue;
            line.setSourceLineId(findSourceOfSourceLine(doc, stockDocs, line.getSourceLineId()));
        }
    }

    private UniqueIDDF findSourceOfSourceLine(BasicSCDocument doc, List<? extends BasicSCDocument> stockDocs, UniqueIDDF sourceLineId) {
        for (BasicSCDocument stockDoc : stockDocs) {
            BasicSCDocumentLine line = DetailLineUtil.findLineWithId(stockDoc.getDetails(), sourceLineId);
            if (line == null)
                continue;
            UniqueIDDF id = findSourceOfSourceLine(doc, stockDoc, line.getSourceLineId());
            if (id != null)
                return id;
        }
        return null;
    }

    private UniqueIDDF findSourceOfSourceLine(BasicSCDocument myDoc, BasicSCDocument doc, UniqueIDDF sourceLineId) {
        BasicSCDocument document = GenericReference.toRealOrNull(doc.getFromDoc(), BasicSCDocument.class);
        if (document == null)
            return null;
        BasicSCDocumentLine docLine = DetailLineUtil.findLineWithId(document.getDetails(), sourceLineId);
        if (docLine == null)
            return null;
        if (ObjectChecker.areEqual(myDoc.getFromDoc(), doc.getFromDoc()))
            return docLine.getId();
        return findSourceOfSourceLine(myDoc, document, docLine.getSourceLineId());
    }

    @Override
    List<String> columnNames() {
        return CollectionsUtility.asList("");
    }
}

