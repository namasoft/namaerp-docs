---
entities: [ConfigEntry]
menu: Administration → Settings → System Settings
---

# Customers and Sales

A short tab with three unrelated jobs: deciding who counts as the salesman on a document, how customer codes are formed, and whether error messages can be turned into a report your own team follows up.

![Customers and Sales tab](../../ar/platform/global-config/images/gc-sales-en.png)

## Salesman

The salesman on a sales document drives commission, targets and often pricing, so it matters that the right name lands there without anyone having to think about it. These four options describe how the system chooses.

**use Current User As Sales Man** `value.info.useCurrentUserAsSalesMan` *(default on)* — The logged-in user's employee record becomes the document's salesman, provided that employee is flagged as a salesman. This is the natural setting where the person entering the order is the person who sold it — a showroom, a counter, a field sales tablet. It also decides whose discount limits a sales document is checked against: with it on, the logged-in user's employee; with it off, the document's salesman — see [Salesman Discount Limits](/modules/invoicing/salesman-discount-limits).

**Do Not Override Sales Man When Changing Customer In Invoices** `value.info.doNotOverrideSalesManWithCustomer` — Customers can have a default salesman, and selecting the customer normally applies it, overwriting whatever was there. With this on, a salesman already chosen on the document is left alone. Turn it on where the person selling is not always the customer's assigned representative.

**Search for sales man for customer at update sales man document** `value.info.salesManSearch` — The salesman lookup on a sales document goes through a customer-aware service instead of a plain search, so the list offered is the salesmen actually linked to that customer.

**Use Sales Man For Price Lists** `value.info.useSalesManAsEmployeeForPriceLists` — Price lists can be resolved per employee. With this on, the *document's salesman* is the employee used for pricing; with it off, the *logged-in user's* employee is used. The difference matters in a back office where one clerk enters orders on behalf of many salespeople — there, the salesman is almost always the right answer.

## Customer coding

**Use Phone As Code** `value.info.useUserPhoneAsCode` — The customer's phone number becomes the customer code. Retail and delivery businesses like this because the phone number is what the customer knows and what the call centre searches by.

**Code Mask** `value.info.userCodeMask` — A pattern the generated code must match, which is how you enforce a phone-number shape rather than accepting any digits. This is **required** when the option above is on; the system refuses to save otherwise.

## Error reporting

When a user hits an error, the most useful thing they can hand your support team is the exact message and the record it happened on. Typing that into a ticket by hand loses detail, so this setting lets the error message start the report itself.

**Entity Type For Reporting Errors** `value.info.errorReportEntityType` — The screen your team uses to log problems, for example **Trouble Ticket** or a document type of your own. Once it is set, every error message shows a **Report This Error** button, to every user. Pressing it opens a new, unsaved record of that type in a popup window:

- Its **Description** holds the error message, followed by the server log when server-log tracking was on for that user.
- If the error happened on a record that had already been saved, that record is filled in **Reference 1**.
- Everything else starts the way a new record of that type always does — its book, document term and default values apply.

The user completes whatever else the screen requires and saves it like any other record. Leave the field empty and the button does not appear.

## Settings on this tab

Every field on this tab with its exact on-screen label in both languages, so you can find a setting by the name you see. The last column points to the section that explains it.

| Field id | English label | Arabic label | Meaning |
|---|---|---|---|
| `value.info.useCurrentUserAsSalesMan` | use Current User As Sales Man | استخدام الموظف الحالي كبائع آليا | [Salesman](#Salesman) |
| `value.info.doNotOverrideSalesManWithCustomer` | Do Not Override Sales Man When Changing Customer In Invoices | عدم تغيير المندوب في الفواتير ان وجد مع اختيار العميل | [Salesman](#Salesman) |
| `value.info.salesManSearch` | Search for sales man for customer at update sales man document | البحث عن بائع للعميل في سند تحديث مندوب مبيعات | [Salesman](#Salesman) |
| `value.info.useSalesManAsEmployeeForPriceLists` | Use Sales Man For Price Lists | استعمال البائع بدلا من المستخدم للأسعار | [Salesman](#Salesman) |
| `value.info.useUserPhoneAsCode` | Use Phone As Code | أستخدام هاتف المستخدم ككود | [Customer coding](#Customer-coding) |
| `value.info.userCodeMask` | Code Mask | هيئة الكود | [Customer coding](#Customer-coding) |
| `value.info.errorReportEntityType` | Entity Type For Reporting Errors | نوع الكيان المستخدم للإبلاغ عن الأخطاء | [Error reporting](#Error-reporting) |
