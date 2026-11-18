---
title: Link Sales Return Lines to the Invoices They Came From
module: supplychain
entities: [EntityFlow, SalesReturn]
groovy: recommended
description: A Groovy script that finds the sales invoice lines behind each line of a sales return by query, splits a line across several invoices when needed, and copies each invoice line's price.
---

<div class='entity-flows'>

# Link Sales Return Lines to the Invoices They Came From

This Groovy script links every line of a sales return to the sales invoice lines it is returning, using an SQL query you write. When one return line holds more quantity than a single invoice line can take back, the script splits the line and spreads the quantity over several invoices.

::: tip Recommended pattern
This script is not tied to any customer's setup. You can paste it as it is and control it entirely through its parameters.
:::

| | |
|---|---|
| **Class name** | `EACollectInvoicesInReturn` |
| **Script** | [EACollectInvoicesInReturn.groovy](/groovy-examples/EACollectInvoicesInReturn.groovy) |
| **Runs on** | Sales Return, on **Pre Update Calculated Fields**. |
| **Uses** | Parameter 2 (required) and Parameter 3 (optional). Leave Parameter 1 empty. |
| **Shipped as** | Source to paste. It is not built into the system. |

## When to use it

A customer brings back goods without the invoice number. Perhaps they bought the same air conditioner three times over the summer, and now they return three units in one go. The return term is set to a **Return Type** of **Partially**, so every line must name the invoice it comes from in its **Invoice** column, and that column is required. Finding the right invoices by hand for every line is slow and error-prone.

This script does it for you. You describe, in SQL, which invoice lines a return line may come from. The script takes them in the order the query returns them, oldest first for example, and uses up the quantity that is still returnable on each one.

Take that example. The customer returns 3 units. The query finds two earlier invoices with 2 units each and nothing returned yet. The script keeps the first line at 2 units against the first invoice and adds a second line of 1 unit against the second invoice. Each line takes the **Unit Price** of its own invoice line, so the customer is credited exactly what they paid each time.

## How it works

1. **It skips lines that are already linked.** A line whose **Invoice** column is filled is left as it is, so saving the return again does not redo the work.
2. **It runs your query once per line.** Inside the query, `{currentLine.…}` refers to the return line being handled and plain fields such as `{customer.id}` refer to the return's header. The query must return the invoice id in its first column and the invoice line id in its second.
3. **It works out what is still returnable** on each invoice line it gets back: the line's quantity minus its **Return Qty**. An invoice line with nothing left is skipped.
4. **It links the line.** When the returnable quantity covers the whole line, the line is linked to that invoice line and the script moves on to the next return line.
5. **It splits the line when it has to.** When the return line holds more than the invoice line can take, the line is cut down to the returnable quantity and linked, and a copy holding the rest is inserted right after it. That copy is then matched against the next invoice line from the query.
6. **Each linked line takes its invoice line's details:** the **Invoice**, the **Copied From Doc** and the **Source Line Id**, the whole price block (so the **Unit Price** and the discounts), and the **Free Item** flag. The quantity used is remembered, so two return lines of the same item never take back the same units twice in one save.
7. **It copies extra fields, if you ask it to.** When Parameter 3 holds a field map, it is applied from the invoice to the return for every line that gets linked.

::: warning A line the query cannot cover stays unlinked
If the query runs out of invoice lines before a return line's quantity is used up, the rest stays on a line with an empty **Invoice** column. On a return whose type is **Partially**, the save is then refused because that column is required. Widen the query, or lower the quantity.
:::

## Setting it up

1. Open **Administration → Display Customization → Entity Flow** and create a flow with **Target Type** set to Sales Return. Use **Criteria** or the book and term fields if only some returns should be handled.
2. In the **Details** grid, add a line with the action **Pre Update Calculated Fields**, and paste the whole script from the file above into **Groovy Script**. Leave **Class Name** empty: it is filled in when you save.
3. Fill in the parameters:

| Parameter | Title shown after saving | What to enter |
|---|---|---|
| Parameter 1 | Not used - leave empty | Nothing. |
| Parameter 2 | Query to find invoices per line, example: … | A query returning the invoice id and the invoice line id, in that order and best first. See the example below. |
| Parameter 3 | Extra fields map, example: currentLine.n1=currentLine.n2 | Optional. A field map applied from the invoice (source) to the return (target) for each linked line, one `target=source` pair per line. See [Field Values Calculator](/entity-flows/core/ai-generated-field-maps-documentation). |

4. Save the flow. **Class Name** now shows `com.namasoft.modules.supplychain.domain.utils.plugnplay.groovy.EACollectInvoicesInReturn`, and each parameter shows its title.

## Example

This is the query the script itself suggests as Parameter 2. It returns the committed invoices of the same customer that still hold returnable units of the same item and lot, oldest first:

```sql
select top 15 s.id invoiceId, l.id lineId
from SalesInvoiceLine l inner join SalesInvoice s on s.id = l.salesInvoice_id
where s.commitedBefore = 1
  and l.quantityBaseValue - coalesce(l.returnedQty, 0) > 0
  and l.item_id = {currentLine.item.item}
  and l.lotid = {currentLine.specificDimensions.lotId}
  and l.customer_id = {customer.id}
order by s.valueDate, s.creationDate
```

On a return of 3 units of one item, where the customer's two oldest invoices each hold 2 units of it, the saved return has two lines: 2 units linked to the first invoice at its price, and 1 unit linked to the second invoice at its price. The **Return Qty** of both invoice lines goes up accordingly.

To keep a value from the invoice line on the return line as well, for example the invoice line's **Number 2** in the return line's **Number 1**, put this in Parameter 3:

```fieldmap
currentLine.n1=currentLine.n2
```

## The script

<<< @/public/groovy-examples/EACollectInvoicesInReturn.groovy{groovy}

## Related

- [EAGroovyAction](/entity-flows/core/EAGroovyAction): how Groovy scripts are attached to entity flows and task schedules.
- [Introduction to Entity Flows](/platform/entity-flows/introduction-to-entity-flows): what each action, such as **Pre Update Calculated Fields**, means.
- [Link Free Item Lines of a Sales Return to the Invoice](/entity-flows/groovy/EASetSourceLineIDForFreeItemInSalesReturn): fills the source line of free lines.

</div>
