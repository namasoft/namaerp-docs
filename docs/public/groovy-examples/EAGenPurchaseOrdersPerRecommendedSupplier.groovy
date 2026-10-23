package com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy

import com.namasoft.common.fieldids.NotGeneratedFields
import com.namasoft.common.utilities.CollectionsUtility
import com.namasoft.infor.domainbase.util.actions.EAGenerateEntityFromEntityAction
import com.namasoft.infra.domainbase.common.criteria.CriteriaBuilder
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.entity.base.EntityMediator
import com.namasoft.infra.domainbase.entity.generic.GenericReference
import com.namasoft.infra.domainbase.persistence.repos.FilterOnDimensions
import com.namasoft.infra.domainbase.persistence.repos.ListPageMatchingParameters
import com.namasoft.infra.domainbase.persistence.repos.Persister
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.supplychain.domain.details.ItemRequestLine
import com.namasoft.modules.supplychain.domain.details.PurchaseOrderLine
import com.namasoft.modules.supplychain.domain.entities.ItemRequest
import com.namasoft.modules.supplychain.domain.entities.PurchaseOrder
import com.namasoft.modules.supplychain.domain.utils.SCDocFromDocCopier
import com.namasoft.modules.supplychain.utils.SCEntityTypes

import static com.namasoft.common.fieldids.AllModulesFieldIDs.PurchaseOrder_supplier

public class EAGenPurchaseOrdersPerRecommendedSupplier implements EntityAction<ItemRequest> {
    @Override
    Result doAction(ItemRequest doc, LongTextDF... parameters) {
        Result result = Result.createAccumulatingResult();
        Map<GenericReference, List<ItemRequestLine>> map = CollectionsUtility.mapList(doc.getDetails(), { it.getRecommendedSupplier()?.toGenericReference() });
        List<PurchaseOrder> orders = listOrders(doc)
        map.remove(null);
        for (Map.Entry<GenericReference, List<ItemRequestLine>> e : map.entrySet()) {
            PurchaseOrder order = findOrder(e.getKey(), doc);
            if (order == null) {
                order = EntityMediator.createEntity(SCEntityTypes.PurchaseOrder());
            } else {
                order.startEditing().addToAccumulatingResult(result);
            }
            EAGenerateEntityFromEntityAction.copyFieldsFromSourceToTarget(doc, order, parameters[1].getPrimitiveValue());
            EntityMediator.copyCommonDataFromSourceToGeneraed(doc, order, order.getTerm(), order.getBook());
            SCDocFromDocCopier.copyHeaderDataExceptWareAndLocator(order, doc);
            EAGenerateEntityFromEntityAction.copyFieldsFromSourceToTarget(doc, order, parameters[1].getPrimitiveValue());
            order.setRef5(GenericReference.fromEntity(doc));
            order.setSupplier(GenericReference.toReal(e.getKey()));
            order.setFromDoc(GenericReference.fromEntity(doc));
            List<PurchaseOrderLine> old = new ArrayList<>(order.getDetails());
            order.getDetails().clear();
            for (ItemRequestLine src : e.getValue()) {
                PurchaseOrderLine copy = old.isEmpty() ? order.createLine() : old.remove(0);
                SCDocFromDocCopier.copyLine(src, copy, doc);
                copy.getQuantity().getQuantity().getPrimeQty().setValue(src.getN2());
                order.getDetails().add(copy);
            }
            EntityMediator.commitFromBusinessAction(order).addToAccumulatingResult(result);
            Persister.flush();
            for (ItemRequestLine src : e.getValue()) {
                src.setRef4(order.toGenericReference());
            }
            orders.remove(order);
        }
        deleteOrders(orders, result);
        result
    }

    private List<PurchaseOrder> listOrders(ItemRequest doc) {
        List<PurchaseOrder> existing = Persister.listPageMatching(PurchaseOrder.class,
                ListPageMatchingParameters.create().criteria(CriteriaBuilder.create().field(NotGeneratedFields.ref5 + ".id").equal(doc.getId()).build()));
        return existing;
    }

    private void deleteOrders(List<PurchaseOrder> orders, Result result) {
        for (PurchaseOrder order : orders) {
            EntityMediator.deleteEntityFromBusinessAction(order).addToAccumulatingResult(result);
        }
    }

    private PurchaseOrder findOrder(GenericReference supplier, ItemRequest doc) {
        return Persister.findFirstRecordMatching(PurchaseOrder.class, CriteriaBuilder.create().field(NotGeneratedFields.ref5 + ".id").equal(doc.getId()).and().field(PurchaseOrder_supplier).equal(GenericReference.toReal(supplier)).build(), FilterOnDimensions.No);
    }

    @Override
    List<String> columnNames() {
        return Arrays.asList("","Fields Map")
    }
}
