---
description: "The Approvals and Revise tab of System Settings: the approval engine switch and which approver buttons show, the Revise settings, and record version history."
entities: [ConfigEntry]
menu: Administration → Settings → System Settings
---

# Approvals and Revise

Nama has two separate ways of putting a human check between "someone entered this" and "the system acted on it". **Approvals** route a document to the people who must agree to it. **Revise** requires a number of people to mark a record as reviewed. This tab configures both, plus record version history.

![Approvals and Revise tab](../../ar/platform/global-config/images/gc-approvals-en.png)

## Approvals

**Enable Approval** `value.approvalEnabled` *(default on)* — The master switch for the whole approval engine. With it off, approval rules are ignored everywhere.

The options that follow decide which buttons an approver actually sees. Every one you leave on is another choice the approver has to weigh, so a deliberately short list often produces faster, more consistent decisions.

**Use Reject Decision** `value.info.useRejectDecision` *(default on)* — Shows **Reject**, which ends the approval and refuses the document.

**Use Return Decision** `value.info.useReturnDecision` *(default on)* — Shows **Return**, which sends the document back to its author to be fixed and resubmitted, rather than killing it.

**Use Escalate To Supervisor** `value.info.useEscalateToSupervisor` *(default on)* — Shows **Escalate To Supervisor**, passing the decision up the org chart.

**Use Escalate To Direct Supervisor** `value.info.useEscalateToDirectSupervisor` *(default on)* — Shows **Escalate to Direct Supervisor**, which passes the decision to the approver's *direct* supervisor instead. The two escalation decisions read two different fields on the employee record, so where a person's direct supervisor is not the manager approvals escalate to, you can offer both and let the approver pick. If the employee has neither person recorded the decision is refused with a message saying so, which is the usual reason the button looks like it does nothing.

**Use Escalate To Specific Employee** `value.info.useEscalateToSpecificEmployee` *(default on)* — Shows **Escalate To Specific Employee**, letting the approver choose who should decide instead.

**Use Return To Previous Step** `value.info.useReturnToPreviousStep` *(default on)* — Shows **Return to Previous Step**, sending the document back one stage in the approval chain rather than all the way to its author.

**Use Return To Specific Step** `value.info.useReturnToSpecificStep` *(default on)* — Shows **Return to a Specific Step**, which lets the approver choose *which* earlier stage the document goes back to rather than always sending it back exactly one. On a long chain — requester, department head, finance, general manager — that is the difference between bouncing a document back through three people and returning it straight to whoever has to fix it. The decision only appears when the approval actually has earlier steps that can be returned to, so on a one-step approval you never see it however this is set.

**Use Signature In Approval Attachment** `value.info.useSignatureInApprovalAttachment` — Stamps the approver's stored signature image onto the attachment produced by the approval, so the printed record carries a visible signature.

**Prevent Update Document And Related Document In Approval Cycle** `value.info.preventUpdateDocAndRelatedDocInApproval` — Locks the document *and the documents linked to it* while it waits for a decision. Without this, an author can quietly change what the approver is looking at.

**Allow Approvals On Documents Update** `value.info.allowApprovalsOnDocumentsUpdate` — Lets approval definitions with **Use With Update** apply to documents. While it is off, editing a saved document never starts an approval, and a definition for a document type with **Use With Update** ticked is refused when you save it; update approvals then work on master files only. See [An update approval on a document will not save](/platform/approvals/approvals-system#An-update-approval-on-a-document-will-not-save).

**Add Approval Steps To Action History** `value.info.addApprovalStepsToActionHistory` — Writes each approval step into the record's action history, giving a permanent audit trail of who decided what and when. Worth the small storage cost anywhere approvals carry weight.

## Revise

Revise is lighter than approval: no routing, no decisions, just a required number of sign-offs before a record is considered checked.

**Default Revise Level** `value.info.defaultReviseLevel` — How many revise levels apply to entities with no rule of their own. Negative values are rejected.

**Use Revision Document For All Entities** `value.info.useReviseDocumentForAllEntities` — Every entity is revised through the separate Revise Document flow rather than in place on the record itself.

**Revise Levels** `value.info.entitiesReviseLevels` *(table)* — Per-entity rules. Each row names an entity type (or a list of them), the number of revise levels it needs, and whether it uses the Revise Document. This is how you require two sign-offs on journal entries and none on a stock transfer.

## Record versions

**Track Records Versions** `value.trackVersionsEnabled` *(default on)* — Keeps a full version history of records, so you can see what a document looked like before an edit and who changed it.

::: danger Switching it off also loses the audit trail
The version snapshot and the audit-trail line are written together, so with this off you can no longer see who changed a record, not just restore an older version. See [Turning version tracking on and off](/platform/governance/audit-trail#Turning-version-tracking-on-and-off).
:::

## Settings on this tab

Every field on this tab with its exact on-screen label in both languages, so you can find a setting by the name you see. The last column points to the section that explains it.

| Field id | English label | Arabic label | Meaning |
|---|---|---|---|
| `value.approvalEnabled` | Enable Approval | تفعيل الموافقة | [Approvals](#Approvals) |
| `value.info.useRejectDecision` | Use Reject Decision | استعمال قرار الرفض | [Approvals](#Approvals) |
| `value.info.useReturnDecision` | Use Return Decision | استعمال قرار الارجاع | [Approvals](#Approvals) |
| `value.info.useEscalateToSupervisor` | Use Escalate To Supervisor | استخدام قرار تصعيد إلى المدير الأعلي | [Approvals](#Approvals) |
| `value.info.useEscalateToDirectSupervisor` | Use Escalate To Direct Supervisor | استخدام قرار تصعيد إلى المشرف المباشر | [Approvals](#Approvals) |
| `value.info.useEscalateToSpecificEmployee` | Use Escalate To Specific Employee | استخدام قرار تصعيد الي موظف بعينه | [Approvals](#Approvals) |
| `value.info.useReturnToPreviousStep` | Use Return To Previous Step | استخدام قرار إرجاع إلي الخطوة السابقة | [Approvals](#Approvals) |
| `value.info.useReturnToSpecificStep` | Use Return To Specific Step | استخدام قرار الإرجاع لخطوة محددة | [Approvals](#Approvals) |
| `value.info.useSignatureInApprovalAttachment` | Use Signature In Approval Attachment | استخدام التوقيع في مرفق الموافقة | [Approvals](#Approvals) |
| `value.info.preventUpdateDocAndRelatedDocInApproval` | Prevent Update Document And Related Document In Approval Cycle | منع التعديل في مستند مرتبط بمستد أخر بإنتظار الموافقه | [Approvals](#Approvals) |
| `value.info.allowApprovalsOnDocumentsUpdate` | Allow Approvals On Documents Update | السماح بعمل موافقات لتعديل المستندات | [Approvals](#Approvals) |
| `value.info.addApprovalStepsToActionHistory` | Add Approval Steps To Action History | إضافة خطوات الموافقة في سجل التعديل | [Approvals](#Approvals) |
| `value.info.defaultReviseLevel` | Default Revise Level | مستويات المراجعة الافتراضية | [Revise](#Revise) |
| `value.info.useReviseDocumentForAllEntities` | Use Revision Document For All Entities | استخدام مستند المراجعه لكل الأنواع | [Revise](#Revise) |
| `value.info.entitiesReviseLevels` | Revise Levels | مستويات المراجعة | [Revise](#Revise) |
| `value.info.entitiesReviseLevels.entityType` | Entity Type | النوع | [Revise](#Revise) |
| `value.info.entitiesReviseLevels.targetEntities` | Entity Type List | قائمة الأنواع | [Revise](#Revise) |
| `value.info.entitiesReviseLevels.reviseLevels` | Revise Levels | مستويات المراجعة | [Revise](#Revise) |
| `value.info.entitiesReviseLevels.useReviseDocument` | Use Revise Document | استخدام مستند المراجعه | [Revise](#Revise) |
| `value.trackVersionsEnabled` | Track Records Versions | تفعيل تتبع نسخ السجلات | [Record versions](#Record-versions) |
