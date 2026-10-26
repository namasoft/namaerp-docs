---
description: "The utilities catalog page lists the admin utilities a support engineer can open by link, grouped in numbered sections with a description, the parameters each one takes and a button to open it."
---

# The Utilities Catalog

The utilities catalog is a single page that lists the admin utilities support uses most, each with a sentence on what it does, the parameters it takes, and a button that opens it. It exists so that nobody has to remember a utility's long technical name or hunt for the documentation page that holds its link: open the catalog, type a word into the filter, and click **Open**.

## Opening it

On the server's `utils.html` page, the last section, **Utilities Catalog**, has the link **All Utilities With Descriptions**. The same page opens from this launcher:

<UtilityLinkBuilder
className="com.namasoft.infra.domainbase.util.NamaUtilsCatalog"/>

Like every utility link, it works only for the `admin` user or a user with **Allow Access to Admin Restricted Functionality (utils.html, kill tasks, logout users and so on)** — see [Treat As Admin](/platform/security/users-and-login#Treat-As-Admin). Opening the catalog changes nothing.

## What each card shows

Each utility is a card with its name, a description that also says whether opening it changes anything, its parameters when it takes any, an **Open** button, and its link with a **Copy link** button — handy for pasting into a ticket or a chat with the customer's administrator. The filter box at the top hides every card that does not contain all the words typed, in its name, description or parameters.

Most utilities open as a report and change nothing until you choose to apply something on that report. Those that start working as soon as they are opened say so in their description.

## The sections

The cards are grouped into numbered sections:

| Section | Utilities in it | Documented on |
|---|---|---|
| 1- Indexing and Size saving | Reference column narrowing, origin index repair, duplicate index finder | [Database Size and Index Utilities](/admin/reprocessing/database-size-and-index-utilities.md) |
| 2- Dynamic Schema | Job progress, and the tools that find and remove columns the application no longer uses | Beta — listed only on servers running in debug mode |
| 3- Inventory and Costing | Fixing invalid current net quantity and cost, fast average-cost reprocessing from a date, fast reprocessing of stock transfers whose costs disagree, stock ages rebuild, stock ages rebuild of chosen dimensions | [Reprocessing Quantity, Cost, and Stock Ages](/admin/reprocessing/reprocess-qty-and-cost.md) and [Cost and Quantity Problems](/admin/reprocessing/cost-and-qty-problems.md) |
| 4- Rebuild and Recalculate | Rent contract system entries, contracting cost executions and project extract costs | [Rebuilding Module System Entries](/admin/reprocessing/module-entries-rebuild-utilities.md) |
| 5- Approvals | Recalculating approval summaries, clearing pending approvals that have nothing left to approve | [Approval Repair Utilities](/admin/reprocessing/approval-repair-utilities.md) |
| 6- Diagnostics | The list of slow SQL statements | [When the System Is Slow](/admin/troubleshooting/system-is-slow.md) |

**Beta utilities** carry a *Beta* badge and are listed only on a server running in debug mode, so a customer's production server does not offer them. That is why the second section is missing on most servers while the numbering of the others stays the same.

The catalog is not every utility there is. Many older ones — the batch utilities that work from a list file, the module rebuilds and the SQL queries in this folder — are still reached from their own pages; see the [Reprocessing and Utilities](/admin/reprocessing/) landing page.

## Related pages

- [Reprocessing and Utilities](/admin/reprocessing/)
- [Database Size and Index Utilities](/admin/reprocessing/database-size-and-index-utilities.md)
