package com.namasoft.infor.domainbase.util.actions;

import com.namasoft.bus.TransactionProvider;
import com.namasoft.common.utilities.*;
import com.namasoft.infra.domainbase.common.NaMaContext;
import com.namasoft.infra.domainbase.datafields.*;
import com.namasoft.infra.domainbase.datafields.enums.EntityTypeDF;
import com.namasoft.infra.domainbase.entity.base.*;
import com.namasoft.infra.domainbase.persistence.repos.*;
import com.namasoft.infra.domainbase.util.*;
import com.namasoft.modules.basic.domain.entities.EntityFlow;
import com.namasoft.modules.basic.domain.primitives.EntityTargetAction;

import java.util.*
import java.util.stream.Collectors;

public class EARunEntityFlowFromQueryMultiEntityType implements EntityAction<BaseEntity> {
    @Override
    public Result doAction(EntityTargetAction action, BaseEntity o, LongTextDF... parameters) {
        List<String> codes = StringUtils.csvLineToList(parameters[1].getPrimitiveValue());
        List<EntityFlow> flows = codes.stream().map { Persister.findByBusinessCode(EntityFlow.class, EntityCodeDF.fromString(it), FilterOnDimensions.No) }.collect(Collectors.toList());
        if (flows.stream().anyMatch { ObjectChecker.isEmptyOrNull(it) })
            return Result.createFailureResult("Could not find entity flows with codes {0}", parameters[1]);
        Result result = Result.createAccumulatingResult();
        List<Object[]> rows = Persister.prepareAndExecuteJDBCQuery(o, parameters[2].getPrimitiveValue());
        for (int i = 0; i < rows.size(); i++) {
            Object[] row = rows[i];
            NaMaContext.addTaskProgress("Running flow for {0} of {1}", i + 1, rows.size());
            if (NaMaContext.isCurentTaskMarkedForKill())
                throw new NaMaFailureResultException("Marked for kill");
            try {
                TransactionProvider.get().doInNewTransaction({
                    Result inner = Result.createAccumulatingResult();
                    BaseEntity object = Persister.findByID(EntityTypeDF.fromString(ObjectChecker.toStringOrEmpty(row[0])),
                            UniqueIDDF.fromObject(row[1]));
                    boolean foundFlow = false;
                    for (final def flow in flows) {
                        def notSameEntity = ObjectChecker.areNotEqual(flow.getTargetType(), object.getEntityType())
                        def notSameEntityTypeList = flow.getEntityTypeList() == null || flow.getEntityTypeList().notContainsType(object.getEntityType());
                        if (notSameEntity && notSameEntityTypeList)
                            continue;
                        if (!object.checkIfFlowApplicable(flow))
                            continue;
                        object.runManualEntityFlow(flow, inner);
                        if (inner.failed())
                            throw new NaMaFailureResultException(inner);
                        foundFlow = true;
                    }
                    if (!foundFlow)
                        throw new NaMaFailureResultException("Could not find a flow for entity {0}", object);
                    return inner;
                }).addToAccumulatingResult(result);
            }
            catch (Exception e) {
                NaMaLogger.error(e);
                if (e instanceof NaMaFailureResultException)
                    result.accumulate(((NaMaFailureResultException) e).getReason());
                else
                    result.accumulate(Result.createTranslatedFailureResult(e.getMessage(), e.getMessage()));
            }
        }
        return result;
    }

    @Override
    public String describe() {
        return "Runs entity flow with code specified in parameter 2, the entity flow must be manual. The flow runs on records specified in parameter 3";
    }

    @Override
    public List<String> columnNames() {
        return Arrays.asList("Ignore", "Entity Flow Codes (csv)", "Query, eg: select entityType,id from SalesInvoice where dueDate = getdate()");
    }
}
