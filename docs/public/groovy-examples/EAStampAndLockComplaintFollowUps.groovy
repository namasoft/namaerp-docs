package com.namasoft.modules.crm.domain.entityactions

import com.namasoft.common.utilities.CollectionsUtility
import com.namasoft.common.utilities.Matcher
import com.namasoft.common.utilities.ObjectChecker
import com.namasoft.infra.domainbase.common.NaMaContext
import com.namasoft.infra.domainbase.datafields.DateDF
import com.namasoft.infra.domainbase.datafields.LongTextDF
import com.namasoft.infra.domainbase.entity.base.EntityAction
import com.namasoft.infra.domainbase.util.DetailLineUtil
import com.namasoft.infra.domainbase.util.Result
import com.namasoft.modules.crm.domain.details.CRMComplainFollowUpLine
import com.namasoft.modules.crm.domain.entities.CRMComplaint

class EAStampAndLockComplaintFollowUps implements EntityAction<CRMComplaint> {
    @Override
    Result doAction(CRMComplaint object, LongTextDF... parameters) {
        List<CRMComplainFollowUpLine> oldLines = object.getOldData() == null ? new ArrayList<>() : object.getOldData().getFollowUpLines();
        List<CRMComplainFollowUpLine> currentLines = object.getFollowUpLines();
        List<CRMComplainFollowUpLine> newLines = new ArrayList<>();
        CollectionsUtility.compareTwoLists(currentLines, oldLines, DetailLineUtil.DetailLineMatcher.Instance, new ArrayList<CRMComplainFollowUpLine>(), newLines, new ArrayList<CRMComplainFollowUpLine>());
        for (def line : newLines) {
            line.setFollowUpEmployee(NaMaContext.getCurrentContext().getCurrentEmployee());
            line.setFollowUpDate(DateDF.today());
        }
        CollectionsUtility.getIntersection(oldLines, currentLines, DetailLineUtil.DetailLineMatcher.Instance, new CollectionsUtility.Callback() {
            @Override
            void process(Object oldLine, Object currentLine) {
                CRMComplainFollowUpLine nl = currentLine;
                CRMComplainFollowUpLine ol = oldLine;
                nl.setFollowUpDate(ol.getFollowUpDate());
                nl.setFollowUpEmployee(ol.getFollowUpEmployee());
                nl.setRemarks(ol.getRemarks());
            }
        })
        return Result.createSuccessResult();
    }
}
