---
description: "Catalogue of the system-wide refusal and error messages (authority, licence, login, saving and deleting, periods, budgets, configuration), what each one protects and where the fix lives."
entities: [EntityHelp]
menu: Administration → Other → Entity Help
---
# Messages and Refusals

A customer pastes a sentence into a ticket — *"You do not have the authority Delete on entity
SalesInvoice"* — and asks what to do about it. Most of those sentences do not belong to any one
screen. They come from the layer underneath every screen, the part of Nama that saves, deletes,
numbers and secures every record in the product, and they read exactly the same on a sales invoice,
a salary document and a customer file.

This page collects those messages: what each one is protecting, and where the answer lives. Messages
that belong to one screen are documented on that screen's own page, at the end, under the same
heading you will find at the bottom of this one.

## How to read a refusal

When a save is refused, Nama shows the message in a dark panel with a few small buttons that are
worth knowing, because they shorten a diagnosis considerably:

| Button | What it does |
|---|---|
| **1 / N** with arrows | One refusal can produce several messages. Page through all of them before deciding what went wrong — the first message is often a consequence of the last. |
| **Go To Related Field** (اذهب إلى الحقل المرتبط) | Jumps to the field, and the grid row, the message is about. It appears only when the message carries a field. |
| **Show Original Message** (عرض الرساله الأصلية) | Shows the English text with the real values filled in. This is the one to use on an Arabic screen when the translated wording is unclear — and it is the text to paste into a ticket. |
| **Show Help Messages** (عرض رسائل المساعدة) | Shows the explanation your own implementation wrote for this message, if there is one. See below. |
| **Export to Excell** (تصدير إلي اكسيل) | Writes the whole list of messages to a file — the only sane way to handle a batch operation that failed on forty rows. |

Some messages also carry a **link to the setting that caused them**, shown underneath the text. It
opens the record and puts the cursor on the field: a document term option, a global-configuration
option, a module config entry. When you see that link, the answer to "where do I change this?" is
one click away.

::: tip Placeholders
Messages are written with `{0}`, `{1}` placeholders that are replaced by real values on screen. So
the product string *Can not use record {0}-{1}, usage is prevented* reaches the user as *Can not use
record Customer-C-0192, usage is prevented*. This page quotes the strings with their placeholders,
because that is the form that is the same on every system.
:::

::: warning A message in English on an Arabic screen is normal
Not every message has an Arabic translation. Where one is missing, the Arabic user sees the English
sentence — it is not a broken installation, and there is nothing to fix on site. The tables below
show the Arabic text where it exists and only the English where it does not.
:::

## Writing your own explanation for a message

An implementation usually knows more about why a message keeps appearing at a particular customer
than any general documentation can. **Entity Help** is where that knowledge goes.

Open **Administration → Other → Entity Help** and use the **Error Messages Help** grid:

| Column | What to put in it |
|---|---|
| **Error Message** | The message's English text **with its placeholders exactly as they appear in the product** — `Can not use record {0}-{1}, usage is prevented`. Matching is exact, so a paraphrase matches nothing. |
| **Arabic Help** / **English Help** | Your explanation, in each language. |
| **Content Type** | How the text should be rendered. |

From then on, any user who meets that message and presses **Show Help Messages** reads your text.
Nama ships some help of its own the same way, and a user can be opted out of the shipped set with
**Do Not Display System Help Messages** (عدم عرض رسائل المساعدة النظاميه) on their user record or
security profile — which does not affect the help your own implementation wrote.

![An Entity Help record with field explanations](../../ar/platform/images/automation-and-rules/entity-help-screen-en.png)

## Permission and authority

Refusals from the security layer name the permission, not the row that withheld it. The row is
chosen by a fixed priority — a line naming the type, then a line naming a type list that contains
it, then the wildcard line — and a line on the *user* always beats the same line on the *profile*.
[Security Profiles](/platform/security/security-profiles) is the page that explains how to find the
row; these are the messages that send you there.

| Message | Why | What to do |
|---|---|---|
| *You do not have the authority {1} on entity {0}* — «لا توجد لديك الصلاحية {1} على النوع {0}» | The permission named in `{1}` is not granted for that type. | Find the winning row for the type and grant it, or have the work done by a role that has it. |
| *The user {0} does not have the capability {1} on the type {2}* — «المستخدم {0} ليس لديه الصلاحية {1} للنوع {2}» | The same thing, raised where the check knows which user it is about — typically **Edit While Under Approval**. | As above. |
| *The user {0} level ({1}) does not include the entity type {2}* — «السمتخدم {0} يتبع المستوي {1} و هو غير مسموح له بحفظ السجلات من النوع {2}» | This is the **user level** from the licence, not a security profile. The level the user belongs to does not license that entity type at all, so no profile can grant it. | Move the user to a level that covers the type, or extend the licence. See [Users and Login](/platform/security/users-and-login). |
| *Current User {0} Cannot Recommit Records, Please Review Security Profile Options* — «المستخدم الحالي لا يستطيع إعادة حفظ الملفات برجاء مراجعة إختيارات ملف الصلاحيات» | Recommitting a record — reprocessing its effects — is a separate permission from saving it. | The switch, **Allow Record Recommiting**, is on by default but hidden from the Security Profile screen. If the user is meant to run recoveries, show it with a Screen Modifier and tick it — see [Fields hidden on purpose](/platform/security/security-profiles#Fields-Hidden-on-Purpose). |
| *You can not change public records* — «لا يمكنك تعديل السجلات العامة» | The record belongs to no legal entity; the user belongs to one. | Edit it from a user whose legal entity is public. |

## Licence, users and login

These stop everybody, not one user, and they are the ones worth recognising instantly. The licence itself — where it lives, what it limits, and the messages about reaching Namasoft's licence servers — is on [Licensing](/getting-started/licensing).

| Message | Why | What to do |
|---|---|---|
| *Your company licence expired, please contact sales to purchase a new licence* — «لقد انتهيت رخصة شركتكم. فضلا قم بالاتصال بالمبيعات لتجديدها» | The legal entity's licence period has ended. | Renew it. Nothing in the product works around it. |
| *Your company exceeded its maximum number of users, please contact sales to purchase more users* — «لقد تعدت شركتكم عدد المستخدمين المسموح به. فضلا قم بالاتصال بالمبيعات لشراء عدد مستخدمين إضافي» | The licence caps the number of user records for this legal entity and a new one was being added. | Delete or retire unused users, or buy more. |
| *Your company exceeded its maximum capacity, please contact sales to purchase more capacity* — «لقد تعدت شركتكم السعة المسموح بها. فضلا قم بالاتصال بالمبيعات لشراء سعة أكبر» | The licence caps how many records this legal entity may create, and the cap is reached. Every new save is refused. | Buy more capacity. |
| *Max Users Reached for level {x}, please logout from another user* | The concurrent-user limit for that licence level is full. It has no Arabic string, so it appears in English to everybody. | Log somebody out — an administrator can do it from the running-users view. Note that `admin` is never refused: logging in as `admin` when the limit is full logs the previous `admin` session out instead. |
| *The level {0} is not found in your licence, the allowed levels are ({2}). Maybe you should reload configuration if your licence was recently changed* | A user record names a licence level that this licence does not contain. English only. | Use one of the levels the message lists — and if the licence really was just replaced, reload the configuration first, because the level list is cached. |
| *Legal entity count is greater than your licence count* | More legal entities are active than the licence allows; it is checked periodically during saves, so it surfaces as a refused save rather than a refused login. English only. | Deactivate the extra legal entities, or extend the licence. |
| *You are prevented from login* — «تم منع دخولك الي النظام» | The user record has **Prevent Login** ticked. | Untick it; see [Users and Login](/platform/security/users-and-login). |
| *You have exhausted your max failed login attempts, please try again after {0} minutes or contact your system administrator* — «لقد تعديت اقصي عدد لمحاولات الدخول الخطأ. يرجي الانظار {0} دقيقة أو الاتصال بمدير النظام.» | Too many wrong passwords. The lock is on a timer. | Wait it out, or clear it with **Allow Login After Failed Logins** — [Users and Login](/platform/security/users-and-login) has the procedure. |

## Saving, editing and deleting

The whole family has two pages of its own:

- [The Life of a Document](/platform/documents-and-records/document-lifecycle) — draft, commit, approval states, *Can not
  edit a commited document*, *Can not operate on revised record*, and the optimistic-lock message.
- [Why a Record Will Not Save or Delete](/platform/documents-and-records/why-a-record-will-not-save-or-delete) — every
  delete refusal in the order the system checks them, including the used-mark on books, terms,
  dimensions and parties, and the hidden action that clears it.

## Periods, retired records and frozen records

| Message | Why | What to do |
|---|---|---|
| *Can not have transactions on the closed period {0}* — «{0} لا يمكن إجراء معاملات في الفترة المغلقة» | The document's date falls inside a closed fiscal period. | [Fiscal Period Control](/platform/governance/fiscal-period-control-guide) explains the three layers that can close a date and which one wins. |
| *Can not delete transactions on closed periods* — «لا يمكن حذف مستندات في فترة مغلقة» | The same, for a delete. | As above. |
| *Can not use record {0}-{1}, usage is prevented* — «لا يمكن استعمال السجلات التي تم منع استعمالها {0}-{1}» | A field points at a record retired with Prevent Usage. | Choose a live record, or relax the rule — [Prevent Usage](/platform/everyday-tools/prevent-usage) lists all three ways. |
| *The document {0} is prevented from usage as from doc* — «المستند {0} ممنوع من الإستخدام في بناء على» | The document may not be used as the basis of another document. | See [Prevent Usage](/platform/everyday-tools/prevent-usage). |
| *Can not operate on revised record {0}* — «لا يمكن التعامل مع السجل {0} لانه تمت مراجعته» | Revising freezes the record. | Unrevise, change, revise again — [Revise and Unrevise](/platform/governance/revise-and-unrevise). |

## Budgets and account guards

These fire at commit time on accounting documents, and they name things the person entering the
document has often never heard of.

| Message | Why | What to do |
|---|---|---|
| *The account {0} has a budget {1}, and this document will exceed the budget because it will it make the balance {2}* — «موازنة الحساب {0} قيمتها {1} و هذا السند سيتعدي الموازنة حيث أنه سيجعل الرصيد {2}» | The document would push an account past its budget. | Reduce the document, raise the budget, or route it through an approval that is allowed to exceed the budget. |
| *The document {0} exceeded the budget and no appropriate approval definition was found* — «المستند {0} تعدي الموازنة و لم يجد النظام تعريف موافقة مناسب ليتم الموافقة علي تعدي الموازنة» | The system is willing to let an approver authorise the overrun, but no approval definition matches this document. | Create an approval definition that covers the document for the budget-exceeded case. See [Approvals](/platform/approvals/approvals-system). |
| *The document {0} exceeded the budget and should be approved by the approval definition {1}, but it also should be approved using the approval definition {2}. This is a conflict and the system can not decide which to choose* — «المستند {0} تعدي الموازنة و يتطلب الموافقة من خلال تعريف الموافقة {1} و كذلك يتطلب الموافقة من خلال تعريف الموافقة {2}. يوجد تضارب بين الموافقتين و لا يستطيع النظام اتخاذ قرار مناسب» | Two definitions claim the same document — its ordinary cycle and the budget one. | Narrow one of the two definitions so that only one matches. |
| *You must enable the option {0} in accounting configuration to be able to use request approval when budget is exceeded* — «يتوجب عليك تفعيل الأوبشن {0} في إعدادات الحسابات لتتمكن من تفعيل طلب الموافقة عند تخطي الموازنات» | The budget-approval route is configured on the budget but switched off in the accounting configuration. | Enable the named option. |
| *You can not add or edit any transaction on The Account {0} on the date {1} , please review Prevent Accounts Transactions file* — «لا يمكن تعديل أو إضافة أي حركة علي الحساب {0} في تاريخ {1} ، راجع ملف منع الحركات علي الحسابات» | A *Prevent Accounts Transactions* record blocks movements on that account around that date. | Open that file and adjust or remove the row. |

## Configuration mistakes that surface as refusals

The message names a file the user has never opened, because the mistake is in configuration rather
than in what they typed.

| Message | Why | What to do |
|---|---|---|
| *Error while validating required field {0} with condition {1},query {2}, required fields {3}* — «خطأ عند التحقق من الحقل المطلوب {0} للشرط {1} الاستعلام {2} لملف الحقول المطلوبة {3}» | A [Required Fields](/platform/governance/required-fields) line has a **When Query** that cannot run. Until it is fixed, saving is blocked on every screen the line covers. | Open the named Required Fields record and fix or empty that query. |
| *Please assign ledger to the legal entity* — «فضلاً قم بتحديد دفتر حسابات في الشركة» | The legal entity has no ledger, so no document on it can produce an accounting effect. | Fill the ledger on the legal entity. |
| *Legal entity can not be Null in transactions* — «لايمكن حفظ المستند على الشركة عام» | The document was entered on the public legal entity. Transactions must belong to a company. | Choose a legal entity — usually by fixing the user's own dimensions so the field defaults correctly. |
| *You should define max records per page for list view in global configuration* — «لابد من تحديد اقصي عدد من السجلات عند عرض الكل في القوائم فى الاعدادات العامة» | A user's default page size is *All* while the global cap is empty. | Fill **Maximum Records Per Page For List Views when using All** in Global Configuration. |
| *Code {0} exists before for record with id {1}* — «الكود {0} موجود مسبقا للسجل بالمعرف {1}» | The code is taken — possibly by a record this user cannot see. | Let the book or group number the record automatically; the id in the message identifies the record holding the code. |
| *The code {0} contains (:) character, please remove it* — «الكود {0} يحتوي علي الحرف (:). يرجي حذفه» | A colon in a code would break the references that are built from it. | Remove the colon. |

## Messages that belong to no one screen

These are raised from many document classes across several modules, so no screen page owns them and
looking for them beside a particular screen will not help.

| Message | Why | What to do |
|---|---|---|
| *Customer is required* — «يجب عليك أدخال العميل» | The customer field is empty on a document that insists on one. It is raised from a dozen sales, stock, point-of-sale and service-centre documents, each with its own reasons for requiring it. | Fill the customer. If you believe this document should not need one, the requirement is in the document's own rules, not in Required Fields. |
| *Duplicate line* — «سطر مكرر» | Two rows in a grid describe the same thing. What counts as "the same" differs per screen — a price-list row, a loan row, a unit-conversion row, an assembly component. | Find the pair and merge or remove one. The message does not name the rows, so compare the grid's key columns. |
| *From Date should be less than To Date* | A date range runs backwards. Raised from contracting, HR and the delivery-driver configuration. | Correct the dates. Note that the check is strict: equal dates are refused too. |
| *From date must be before to date* — «من تاريخ لابد ان يكون قبل الي تاريخ» | The same complaint from a different check, raised from ten more screens across the product. Two wordings exist for one rule; which one you get depends on the screen. | Correct the dates. |

*From Date should be less than To Date* has no Arabic translation — its entry in the Arabic store is
the English sentence — so it appears in English on Arabic screens.

## Messages that appear at login rather than on a save

A red list of messages at login is a different mechanism entirely: system-wide health checks, not a
refusal of anything you did. They are documented in
[Critical Errors at Login](/admin/troubleshooting/critical-errors).

## See also

- [The Life of a Document](/platform/documents-and-records/document-lifecycle) · [Why a Record Will Not Save or Delete](/platform/documents-and-records/why-a-record-will-not-save-or-delete)
- [Critical Errors at Login](/admin/troubleshooting/critical-errors)
- [Security Profiles](/platform/security/security-profiles) · [Users and Login](/platform/security/users-and-login)
- [Fiscal Period Control](/platform/governance/fiscal-period-control-guide) · [Prevent Usage](/platform/everyday-tools/prevent-usage) · [Required Fields](/platform/governance/required-fields)
- [Business Requests](/platform/background-processing/business-requests) — for failures that happen after the save succeeded
