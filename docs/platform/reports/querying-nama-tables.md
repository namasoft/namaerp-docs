# Querying Nama Tables with SQL

This page collects the rules every SQL query against a Nama ERP database has to follow — whether it feeds a report, a BI widget, a Virtual Entity, an approval condition or a quick check during a support call. Nama runs on Microsoft SQL Server, so everything here is T-SQL.

Each rule below exists because skipping it gives a query that runs without error and returns the wrong number. That is the worst kind of mistake, because nobody notices.

## The conventions

| Rule | What it means in practice |
|---|---|
| **Table name = entity name** | The table for Sales Invoice is `SalesInvoice`, its lines are `SalesInvoiceLine`, the item master is `InvItem`. [dm.namasoft.com](https://dm.namasoft.com) lists every table with its columns. |
| **Count only `commitedBefore = 1`** | A document is in its table from the moment it is first saved, including as a draft. Drafts carry `commitedBefore = 0`, and cancelling a document sets it back to 0. Put `h.commitedBefore = 1` on every document header you read (the column keeps that spelling, with one *t*). |
| **Lines carry no status** | `SalesInvoiceLine` has no `commitedBefore` column. To keep draft and cancelled lines out, join the line to its header and filter the header. |
| **Lines already carry the header's key fields** | A line holds copies of its document's date and parties: `SalesInvoiceLine` has `valueDate`, `customer_id`, `branch_id`, `legalEntity_id` and `warehouse_id`. Group and filter on the line itself; you need the header only for its status. |
| **Ids are binary, references end in `_id`** | Every table's key is `id` (16-byte binary). A reference field is stored as `<field>_id`, so the join is always `c.id = l.customer_id`. A line points back at its document through a column named after the document: `SalesInvoiceLine.salesInvoice_id`, `StockIssueLine.stockIssue_id`. |
| **A reference that can point at several types takes two columns** | One holds the id, the other the entity type: `fromDoc_id` and `fromDoc_type` on a document, `subsidiaryId` and `subsidiaryEntityType` on a ledger line. Filter on the type as well as the id. |
| **`name1` is Arabic, `name2` is English** | Customers, items, warehouses, branches and every other master file have both. Pick the column that matches the report's language. |
| **Posted amounts live in `LedgerTransLine`** | When a document is processed, its accounting effect is written to `LedgerTransLine`: `debitLocalAmount` and `creditLocalAmount` in the company's currency, `account_id`, the subsidiary pair, and `originType` / `originId` pointing back at the document. Balances come from here, not from document totals. |
| **Quantities live in `QtyTransLine`** | Every stock movement is a row with `item_id`, `warehouse_id`, `netQty` in the item's main unit, and `qtyTransType` set to `In` or `Out`. `netQty` is never negative, so the direction comes from `qtyTransType`. For the quantity on hand right now, `ItemDimensionsQty.net` holds the running balance and matches the sum of the movements. |

`netValue` on a sales line is the value after its discounts, with tax included.

## Three worked queries

Sales per customer per month, counting only real invoices:

```sql
SELECT c.code, c.name2 AS customerName,
       YEAR(l.valueDate) AS yr, MONTH(l.valueDate) AS mon,
       SUM(l.netValue) AS netSales
FROM SalesInvoiceLine l
JOIN SalesInvoice h ON h.id = l.salesInvoice_id
JOIN Customer c ON c.id = l.customer_id
WHERE h.commitedBefore = 1
GROUP BY c.code, c.name2, YEAR(l.valueDate), MONTH(l.valueDate)
ORDER BY c.code, yr, mon
```

Sales returns are a separate document (`SalesReturn` / `SalesReturnLine`). Subtract them if the figure has to be net of returns.

Each customer's balance, from the ledger:

```sql
SELECT c.code, c.name1, c.name2,
       SUM(t.debitLocalAmount - t.creditLocalAmount) AS balance
FROM LedgerTransLine t
JOIN Customer c ON c.id = t.subsidiaryId
WHERE t.subsidiaryEntityType = 'Customer'
GROUP BY c.code, c.name1, c.name2
HAVING SUM(t.debitLocalAmount - t.creditLocalAmount) <> 0
```

Quantity on hand per item and warehouse, from the movements (add `AND q.valueDate <= @date` for the position on a past date):

```sql
SELECT i.code, i.name2 AS itemName, w.name2 AS warehouse,
       SUM(CASE WHEN q.qtyTransType = 'In' THEN q.netQty ELSE -q.netQty END) AS onHand
FROM QtyTransLine q
JOIN InvItem i ON i.id = q.item_id
JOIN Warehouse w ON w.id = q.warehouse_id
GROUP BY i.code, i.name2, w.name2
```

## From a query to a report

A working SELECT is not yet something a user can open from a menu. There are four routes, and the right one depends on how much layout control you need:

1. **Virtual Entity** (*Administration → Reports → Virtual Entity*). Save the SELECT once and it becomes a table you can pick in the Report Wizard and in the dashboard widget wizard, with its reference columns joined automatically. This is the usual route. See the [Virtual Entity guide](/platform/automation-and-rules/virtual-entity-guide).
2. **Report Wizard** (*Administration → Reports → Report Wizard*). When a real table (or a Virtual Entity) is enough, the wizard builds the report from it with no SQL at all. See the [Report Wizard guide](/platform/reports/report-wizard-guide).
3. **A BI widget in SQL mode.** The query goes into the widget as-is, plus the `/*AND-FILTERS*/` placeholder that cross-filters fill in. See [Data Source Query (SQL)](/platform/bi/bi-module-technical-reference#2-Data-Source-Query-SQL).
4. **A Jasper design written as text.** A Report Definition can be created from pasted design text with no file uploaded; the first save builds the file. See [Editing a design in place](/platform/reports/reports-guide#Editing-a-design-in-place).

The same rules apply to the small queries inside the product. An approval's **Apply When Query** reads the record being approved through `{fieldId}` placeholders (see [Conditional Approvals](/platform/approvals/approvals-system#Conditional-Approvals)). Any table it joins still needs the `commitedBefore` filter and the header join described above.
