---
description: "How to fix a failed business request: reading the failed row on the Business Requests screen, the error messages behind almost every failure (a missing account on a warehouse, item or party; an account and party that do not match; a generated document that failed), and whether to Reprocess or Recommit afterwards."
menu: Administration → Settings → Business Requests
---
# Fixing a Failed Business Request

A saved document writes its ledger entry and moves its stock in the background, as a
[business request](/platform/background-processing/business-requests). When that background work is
refused, the document stays saved and correct, but its effect is missing. The request sits on the
**Business Requests** screen as **Processing Failed** or **Failed By Exception** until somebody fixes
the cause and runs it again. This page is about that second half: what the message on the failed row
means, which screen holds the fix, and which button runs the request again.

Users usually find out in one of three ways:

- The document's own screen shows the request status in its header, where the document status
  normally sits. A chip reading **Processing Failed** on a saved document means one of its effects
  failed.
- The critical errors shown at login include
  *There are {0} failed requests, please contact our support team and provide them the following message: SYSFRQS is {1}*
  — see [Critical Errors at Login](/admin/troubleshooting/critical-errors).
- A [notification definition](/platform/notifications/notifications-system) with **Use With
  Processing Failure** tells the administrator as soon as a request of that document type fails.

::: tip A clean list is the normal state
Across Nama installations, most companies never have a failed request at all; about 1 in 10 ever
see one, and those that do usually have only a handful. Nearly all failures are stock effects of
stock documents, and more than half of them come from one cause: an account that the document term
asks for is missing on a warehouse, an item or a party. The sections below are in the order a
company is most likely to meet them.
:::

## Read the row first

Open **Administration → Settings → Business Requests**, filter **Processing Status** to the two
failed values, and look at three columns:

- **Request Name** says which request failed: `InvTransReq` is the inventory request (quantities,
  cost and the stock entry), `LedgerTransReq` is the accounting request. The difference decides how
  you re-run it later.
- **Document #** is the document that raised the request. A sales or purchase invoice moves its stock
  through a Stock Issue or Stock Receipt it generates, so a failed stock effect of an invoice shows
  the **generated Stock Issue or Stock Receipt** as its origin, not the invoice. The invoice's own
  header does not show that failure; open the generated document to see it.
- **Error Message** holds the reason in one line. **Error Description** holds the full technical
  text.

A **Failed By Exception** row can have an **empty Error Message**. That happens when the work broke on
something other than a business rule: a record that was expected and not found, or a database lock
while two requests touched the same rows. The reason is then only in **Error Description** (and in
the server log). Read it:

1. If it mentions a deadlock, a lock or a timeout, nothing is wrong with the data. **Reprocess**
   the row; it normally goes through.
2. If it shows that a ledger line had no account, it is the same problem as the next section, met
   by a different route. Find the warehouse, item or party involved and fill its account.
3. Otherwise, send the Error Description text to Namasoft support.

## The account the term asks for is missing

This is the failure most companies meet, and almost always on a Stock Transfer, Stock Issue, Stock
Receipt or Cost Revaluation. The message is:

*Error while creating account of {0} side for subsidiary {1}  - source type {2} - entity type {3} - account type {4} {5} {6}*

«خطأ أثناء إنشاء التأثير المحاسبي للجانب {0} للذمة {1} - نوع المصدر {2} - نوع المرجع {3} - الحافظة (الحساب) {4} {5} {6}»

### Why it happens

A stock document's [document term](/modules/supplychain/document-terms/doc-term-accounting-effects)
says, for its debit side and its credit side, where the account comes from. It rarely names an
account directly. It says "take the **Main Account** of the warehouse", or "take **Account 05** of
the party in the document's **Subsidiary** field". When the entry is built, the system opens that
record and reads that slot of its **Subsidiary Accounts** block. If the slot is empty, or the field
that should name the record is empty, there is no account to write to, and the whole inventory
request fails.

The entry of a stock document is built only after the cost is known, which is why this error shows
on the **inventory** request and not on an accounting one.

Take a Stock Transfer from the main store to a new branch store. The transfer term debits the
**Main Account** of the **To Warehouse** and credits the **Main Account** of the from-warehouse.
Nobody filled the accounts on the new store when it was created, so the inventory request fails
with **Debit** side, the new store as the record, **Warehouse** as the entity type, **MainAccount** as
the slot, and `toWarehouse` as the field the term reads. Every transfer into that store fails the
same way until its Main Account is filled.

### Reading the message

| Part | What you will see | What it tells you |
|---|---|---|
| side `{0}` | Debit or Credit | Which side of the document term failed. |
| subsidiary `{1}` | the warehouse, item or party that was opened — or `null` | The record whose slot is empty. `null` means the field that should name a record is itself empty. |
| source type `{2}` | how the side finds its account | Rarely needed. |
| entity type `{3}` | `Warehouse`, `InvItem` (an item), `DocumentSubsidiary` (the document's Subsidiary field), `LineSubsidiary` (the line's subsidiary), `HeaderField`, `LineField`, `Customer`, `Supplier` | Where the record came from. |
| account type `{4}` | `MainAccount`, `Account1` … `Account20`, `FromBag`, `FromBagWithCurrency` | The slot that is empty: Main Account, Account 01 … Account 20, From Bag, From Bag Considering Currency. |
| `{5}` `{6}` | an accounts-bag account code, or a field id such as `toWarehouse` | The bag line the side asks for, or the document field the side reads the record from. |

### What to fix

- **A record was opened and its slot is empty.** Open that warehouse, item, customer or supplier and
  fill the slot named in the message in its **Subsidiary Accounts** block.
  - If the party uses an [Accounts Bag](/modules/accounting/ledger-setup/accounts-bags-safes-and-partners)
    with **Ignore Subsidiary Accounts And Use Bag Accounts** ticked, the party's own slots are not
    read at all: fill the slot on the bag.
  - If the party names a **Parent Party (Accounting Alternative)**, the accounts are read from that
    parent: fill the slot there.
- **The record is `null`.** Fill the empty field on the document: usually the Stock Issue or Stock
  Receipt header's **Subsidiary**, or the line's subsidiary or reference field that the term reads.
  When that Subsidiary field holds an account instead of a party, the account is used directly.
- **The term reads the wrong place.** Change the side on the document term's **Effect** tab; see
  [Accounting Effects Configuration](/modules/supplychain/document-terms/doc-term-accounting-effects).

::: info A line with no cost still needs its account
Stock lines go through the account lookup even when their value is zero. An item received at no
cost still fails if its warehouse has no account. Cost Revaluation is the only exception.
:::

## The account and the party do not match

These three are refusals of an **accounting** request and show as **Processing Failed**. They are
met on payment vouchers, journal entries and fixed-asset purchases, and on the entry of a stock
issue once its cost is known. They come from the account's **Type** and **Subsidiary Types**, which
are explained on [Accounts](/modules/accounting/ledger-setup/accounts).

*The account {0} must have a subsidiary*

«يجب تحديد ذمة للحساب {0}»

A line landed on an account whose type is **Subsidiary**, but the line names no party. It is usually
a payment voucher, journal entry or fixed-asset purchase line with an empty subsidiary, or a term
side that points at a fixed subsidiary-type account. Fill the party on the line, or point the term
side at a source that supplies one. Only if the account should really accept entries that the
system builds without a party, tick **Allow System Transactions without Subsidiary and Vice Versa**
on the account; it works only together with **Enable Allow System Transactions without Subsidiary
and Vice Versa in Accounts** in [Accounting Configuration](/modules/accounting/support/accounting-configuration).

*The account {0} must be used with types {2}{3}{4}{5}{6}{7}{8}{9}{10}, you are using it with {1}*

«الحساب {0} يجب أن يستخدم مع الأنواع {2}{3}{4}{5}{6}{7}{8}{9}{10}، بينما يتم استخدامه الآن مع {1}»

The account is restricted to up to five **Subsidiary Types**, and the line's party is of another
type — for example a stock issue whose account comes from the warehouse while its subsidiary is a
customer. Add the party's type in an empty **Subsidiary Type 2** … **Subsidiary Type 5** on the
account (those can be filled even after the account has been used), or use an account meant for that
party type.

*The account {0} can not be used with subsidiary {1} because it is a detail account*

«الحساب {0} لا يمكن أن يستعمل مع الذمة {1} لأنه حساب فرعي»

The mirror of the first: the account's type is **Detail** (فرعي), but the line carries a party —
typically a voucher line where a party was chosen against a detail account, or a party slot pointing
at a detail account. Clear the party, or choose the subsidiary-type account meant for that party.

## A document generated after costing failed

*Error while generating entity {0}: {1} from entity {2}:{3}:-*

«خطأ أثناء إنشاء {0}: {1} من السجل {2}: {3}:-»

Some documents create a second document only once the first one is costed. A
[Processing Document](/modules/supplychain/assembly-and-packaging/processing-documents-and-machines)
is the usual case: when its raw-materials Stock Issue is costed, the system spreads that cost onto
the outputs' Stock Receipt and saves the receipt. If the receipt is refused, the **Stock Issue's**
inventory request fails with this message. When the second document is recommitted rather than
generated, the same failure reads *Error while recommitting entity {0}* — «خطأ أثناء إعادة حفظ السجل {0}».

The real reason is after the `:-`. Read the whole text in **Error Description**, fix that on the
receipt (often a missing warehouse account, as above, or a closed period), then **Reprocess** the
Stock Issue's inventory request.

## Less common messages

*Line without amount* — «سطر بدون مبالغ»

A salary document's entry came out with a line that has neither a debit nor a credit. Each line of
that entry comes from the account lines of a salary component, so check the component lines of the
document and the **Percentage** on the account lines of the components involved, correct them, and
Recommit the document. See [Salary Documents](/modules/hr/payroll/salary-documents).

*For serial {0} of item {1} in document {2}, warehouse must be {3} and locator must be {4}*

«المسلسل {0} للصنف {1} في المستند {2} , يجب أن يكون المخزن {3} و الموقع {4}»

A serial is being issued or transferred out of a warehouse or locator other than the one its last
movement put it in; the message names where the serial actually is. When only the warehouse differs,
the message stops after the warehouse:
*For serial {0} of item {1} in document {2}, warehouse must be {3}* — «المسلسل {0} للصنف {1} في المستند {2} , يجب أن يكون المخزن {3}».
Correct the warehouse, locator or serial on document `{2}` — or the earlier receipt, if that is the
one that was wrong — and Recommit.

## Running the request again

There are two buttons in the **More** menu of the Business Requests screen, and the right one depends
on what you changed.

- **Reprocess** puts the stored request back in the queue exactly as it is.
  - An **accounting request** already holds its lines with the accounts chosen at save time.
  - An **inventory request** holds the term's account sides as they were at save time, and reads
    the warehouse, item and party accounts again when it runs.
- **Recommit** saves the origin document again, which raises fresh requests from the document, its
  term and the master data as they are now. For an invoice's stock effect, the document recommitted
  is the generated Stock Issue or Stock Receipt.

| What did you change? | Failed inventory request | Failed accounting request |
|---|---|---|
| An account slot on a warehouse, item, party or accounts bag | **Reprocess** | **Recommit** |
| The Account record itself (its type, subsidiary types or the "without subsidiary" option), or the Accounting Configuration switch | Reprocess | **Reprocess** |
| The document term's account sides | **Recommit** | **Recommit** |
| The document | Recommit | Recommit |
| Nothing on the document: a period was reopened, a lock cleared | Reprocess | Reprocess |

::: warning Who can press them
Both buttons need the **Edit After Commit** level on the **Configuration Group** screen in the user's
[security profile](/platform/security/security-profiles). Recommit also needs **Allow Record
Recommitting**, a switch that is on by default but
[hidden from the security profile screen](/platform/security/security-profiles#Fields-Hidden-on-Purpose).
Without it the button is still there, and pressing it is refused with
*Current User {0} Cannot Recommit Records, Please Review Security Profile Options* — «المستخدم الحالي {0} لا يستطيع إعادة حفظ الملفات برجاء مراجعة اختيارات ملف الصلاحيات».
:::

Nothing retries a failed request on its own. Once the row is **Processed**, the critical error count
updates itself.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Error while creating account of {0} side for subsidiary {1}  - source type {2} - entity type {3} - account type {4} {5} {6}* — «خطأ أثناء إنشاء التأثير المحاسبي للجانب {0} للذمة {1} - نوع المصدر {2} - نوع المرجع {3} - الحافظة (الحساب) {4} {5} {6}» | The record the term reads (warehouse, item, party, the document's Subsidiary) is empty, or its account slot is. | Fill the slot in the record's **Subsidiary Accounts** (or on its accounts bag), or fill the empty document field; then Reprocess. See [above](#The-account-the-term-asks-for-is-missing). |
| *The account {0} must have a subsidiary* — «يجب تحديد ذمة للحساب {0}» | A subsidiary-type account on a line with no party. | Fill the party and Recommit, or allow system entries without a party on the account and Reprocess. |
| *The account {0} must be used with types {2}{3}{4}{5}{6}{7}{8}{9}{10}, you are using it with {1}* — «الحساب {0} يجب أن يستخدم مع الأنواع {2}{3}{4}{5}{6}{7}{8}{9}{10}، بينما يتم استخدامه الآن مع {1}» | The party's type is not one of the account's Subsidiary Types. | Add the type on the account and Reprocess, or use the right account and Recommit. |
| *The account {0} can not be used with subsidiary {1} because it is a detail account* — «الحساب {0} لا يمكن أن يستعمل مع الذمة {1} لأنه حساب فرعي» | A detail account was given a party. | Clear the party or use the subsidiary account, then Recommit. |
| *Error while generating entity {0}: {1} from entity {2}:{3}:-* — «خطأ أثناء إنشاء {0}: {1} من السجل {2}: {3}:-» | A document generated after costing (usually a Processing Document's output receipt) was refused. | Read the reason after `:-` in Error Description, fix it, Reprocess the issue's inventory request. |
| *Line without amount* — «سطر بدون مبالغ» | A salary entry line has neither debit nor credit. | Correct the component lines or the account-line percentages, then Recommit. |
| *For serial {0} of item {1} in document {2}, warehouse must be {3} and locator must be {4}* — «المسلسل {0} للصنف {1} في المستند {2} , يجب أن يكون المخزن {3} و الموقع {4}» | The serial is not in the warehouse or locator it is issued from. | Correct the warehouse, locator or serial, then Recommit. |
| *There are {0} failed requests, please contact our support team and provide them the following message: SYSFRQS is {1}* — «يوجد {0} مستندات فشلت معالجتها. يرجى التواصل مع الدعم الفني و إبلاغهم بالخطأ التالي: SYSFRQS is {1}» | The critical error at login that counts failed requests. | Work through the failed rows with this page. |

## See also

- [Business Requests](/platform/background-processing/business-requests) — the screen, its statuses
  and the two kinds of request
- [Accounting Effects Configuration](/modules/supplychain/document-terms/doc-term-accounting-effects)
  — where a term's account sides are set
- [When a Document Has No Accounting Effect](/modules/accounting/support/accounting-request-processing)
  — a processed request that wrote nothing
- [Fiscal Period Control](/platform/governance/fiscal-period-control-guide) — closed periods, the other
  common reason an accounting request is refused
