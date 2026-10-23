---
description: "Answers to common Notification Definition questions: notifying every customer on a multi-line receipt, sending all invoice lines in a text message, showing who approved the document, and alerting sales supervisors about quotations not converted to sales orders."
entities: [NotificationDefinition]
menu: Administration → Display Customization → Notification Definition
---
# Frequently Asked Questions: Notifications and Messages

## How do I send a notification to each customer when saving a receipt that contains multiple lines for multiple customers?

When saving a receipt that contains multiple lines for multiple customers, you may notice that the notification is sent only to the first customer and not to the remaining customers in the other lines.

### Reason

The reason is that the template being used does not contain a `loop` statement, which allows the message to be repeated for each line individually. As a result, only a single message is generated using the first line, and the remaining lines are ignored.

### Incorrect Template (does not repeat)

```
الشركة المتحدة فارم صيدلية د/ {lines.subsidiary.$toReal.name1} نحيط علمكم بأنة
تم اضافة استلام نقدية لحسابكم رقم الايصال {lines.rpaper} قيمة الأيصال {lines.amount.value.amount} جنية  بتاريخ {valueDate}
```

This template sends only one message using the data from the first line only.

---

### Correct Template for Sending a Message to Each Customer Individually

```
{loop(lines)}
{openmsg}
{sendto}{lines.subsidiary.$toReal.contactInfo.mobile}{endsendto}
الشركة المتحدة فارم صيدلية د/ {lines.subsidiary.$toReal.name1} نحيط علمكم بأنة
تم اضافة استلام نقدية لحسابكم رقم الايصال {lines.rpaper} قيمة الأيصال {lines.amount.value.amount} جنية  بتاريخ {valueDate}
{closemsg}
{endloop}
```

### Template Explanation Line by Line:

1. `{loop(lines)}`
   Begins iterating over each line in the document.

2. `{openmsg}`
   Marks the beginning of a new message.

3. `{sendto}{lines.subsidiary.$toReal.contactInfo.mobile}{endsendto}`
   Specifies the mobile number to which the message will be sent — in this case, the customer's number found in the current line.

4. and 5. The message content itself, using data from the current line such as the customer name, receipt number, amount, and document date.

5. `{closemsg}`
   Ends the message.

6. `{endloop}`
   Ends the loop.

This way, a separate message will be sent to each customer present in each line of the receipt, so that every customer is informed only of information relevant to them.

## Sending All Invoice Details in a Text Notification

When creating a notification linked to an invoice, you may notice that the template used displays only the data from the first line of the invoice, even though it contains multiple items.

In the following example, an SMS template was set up inside a notification:

::: details Previously Used Template

```
الشركة المتحدة فارم نحيط علمكم صيدلية د / {Customer.name1} بأن
تم اضافة فاتورة رقم {code} لحسابكم
_____  

قيمة الفاتورة {money.netValue} جنية
___محتويات الفاتورة ___
صنف    {details.item.item}
كمية {details.quantity.quantity.primeQty.value}
خصم     {details.price.discount2.percentage}
```
:::

--------
The previous template displays only **one line** of invoice details, because the variables used (`{details.item.item}`, `{details.quantity...}`) are not automatically repeated across lines.

### Solution: Using `{loop(details)}`

To retrieve all lines, you must use the `{loop(details)}` instruction so that the content repeats according to the number of invoice lines, closing the loop with `{endloop}`.

::: details Correct Modified Template

```
الشركة المتحدة فارم نحيط علمكم صيدلية د / {Customer.name1} بأن  
تم اضافة فاتورة رقم {code} لحسابكم  
_____  
قيمة الفاتورة {money.netValue} جنية
___محتويات الفاتورة ___
{loop(details)}
صنف    {details.item.item}  
كمية {details.quantity.quantity.primeQty.value}  
خصم     {details.price.discount2.percentage}  
{endloop}
```
:::

This way, all invoice line details will be included in the text message, not just the first line.

## How can I display the name of the person who approved the document inside the notification template in Nama ERP?

**Answer:**
To display the name of the person who approved the document in the notification template, you can use the variable `currentApprovalCase.lastStep.actualResponsible`.

If you want to display the name as a link to the user's profile, use the following syntax:

```
تمت الموافقة على السجل {link($this)} من قبل {link(currentApprovalCase.lastStep.actualResponsible)}
```

If you want to display the name as plain text without a link, use:

```
تمت الموافقة على السجل {code} من قبل {currentApprovalCase.lastStep.actualResponsible.name1}
```

* You can add a condition to verify the existence of an approval step before displaying the name, as follows:

```
{if(currentApprovalCase.lastStep)}
تمت الموافقة على السجل {code} من قبل {currentApprovalCase.lastStep.actualResponsible.name1}
{else}
لم يتم الموافقة بعد على السجل {code}
{endif}
```

## How do I send notifications to sales supervisors when there are quotations that have not been converted to sales orders within a certain period?

The customer wants to send notifications to all sales supervisors when a quotation exists for a salesperson under the supervisor's management that has not been converted to a sales order after more than 9 or 10 days, through a scheduled task.

::: warning Note
The customer wants to send **in-app notifications** and not emails or reports.
:::

- The Query

The following query retrieves quotations that have been pending for 10 days without being converted to sales orders:

```sql
select s.code, c.name1 customername, s.valuedate,
       cast(s.netValue as decimal(20,2)) netValue,
       e.code supervisorCode, e.id supervisorId,
       e.entityType supervisorEntityType
from SalesQuotation s
left join SalesOrder o on o.fromDoc_id = s.id
left join Customer c on c.id = s.customer_id
left join DocumentTerm t on t.id = s.term_id
left join Employee e on e.id = s.salesMan_id
left join Employee esu on esu.id = e.supervisor_id
where datediff(day, s.valuedate, getdate()) + 1 = 10
  and s.commitedBefore = 1
  and o.code is null
ORDER BY esu.code
```

- Notification Template

```
{loop()}
{header(supervisorCode)}
{openmsg}{sendto}{supervisorId}{endsendto}
السادة إدارة المبيعات
برجاء العلم أن عروض الاسعار الاتية لم يتم تحويلها الى عقود منذ 10 ايام
برجاء التواصل مع العميل لمعرفة الاسباب
وكتابة الملاحظات في عرض السعر
{opentable}
{row}{cell} كود عرض السعر {cell}  العميل {cell}  التاريخ   {cell}  بقيمة  {endrow}
{endheader}
{row}{cell}{code}{cell}{customername}{cell}{valuedate}{cell}{netValue}
{endrow}
{footer(supervisorCode)}
{closetable}
{closemsg}
{endfooter}
{endloop}
```

- **Template Explanation**

This template uses the grouping technique (`header`/`footer`) to group quotations by supervisor (`supervisorCode`), so that each supervisor receives a single notification containing a table with all overdue quotations for the salespersons under their management.

- `{loop()}` — begins iteration over query results.
- `{header(supervisorCode)}` — begins grouping lines by supervisor code; the header content is written once per group.
- `{sendto}{supervisorId}{endsendto}` — sends the notification to the relevant supervisor.
- `{opentable}` / `{closetable}` — creates a table containing quotation details.
- `{footer(supervisorCode)}` — closes the group and ends the message.

::: warning Important Note
The query must include `ORDER BY esu.code` to ensure that each supervisor's records appear consecutively in the results. Without ordering, supervisor records may be interleaved and the `header`/`footer` grouping will not work correctly.
:::
