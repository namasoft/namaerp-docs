---
entities: [MnMachineUpdate, MnMachineOwnerTransferDoc, MnPreInstallationPreview]
---
# Machine Updates, Transfers and Site Previews

The [machine file](/modules/crm/maintenance-setup/crm-machines.md) is a master file, and you can
edit it directly. So why are there documents that edit it for you? Because a master file keeps no
history: change the room and yesterday's location is gone. These three documents exist to leave a
dated, numbered trail — one for changing a machine's data, one for changing its owner, and one for
recording a site survey before an installation.

The first two change the machine file; the third is a record of the survey.

::: info Required licence
`crm-maintenance`
:::

## The Machine Update Document

A document with a book, a term, an issue date and a value date, whose body is a near-copy of the
machine's own attribute set: item, customer, contact, original customer and contact, machine type,
category, warranty status, remarks, serial number, building, floor and room, the five
classifications, the manufacturing, sale, installation and last-visit dates, warranty contract,
warranty start, warranty period, default warranty period, default warranty start date, warranty end,
the odometer readings and their dates, and the dimensions.

![The Machine Update screen](../../../ar/modules/crm/images/maintenance-cycle/crm-machine-update-en.png)

On 10 June 2026 the air-handling unit `MCH-00318` is moved out of the equipment room into the pump
room `RM-MP01-B3`. The maintenance office types `MUPD-0007` against that machine, changes the room,
and saves. On save the document rewrites the machine, and because the machine's own calculations and
checks run afterwards, its warranty dates are recomputed at the same time.

**Ledger: none. Stock: none.** The document has no term configuration of its own, so its Term
carries only the generic document settings.

::: warning Before you save a Machine Update
**It writes every field on its screen onto the machine.** Picking the machine pre-fills most of the
boxes from the current record. The alternative code, the manufacturing, sale, installation and
last-visit dates, the default warranty start date and the warranty status start empty, and whatever
they hold when you save is written onto the machine. An alternative code left empty is saved as the update's own
number, so the machine takes that number as its alternative code. Treat this document as "retype the machine":
before committing, work down the screen and make sure every box holds the value you want the
machine to end up with.

**Cancelling restores the previous update.** Cancelling a Machine Update restores the values of the
**previous** Machine Update document for that machine. When there is no previous update, the machine
keeps the values the cancelled document wrote — so note the old values down before you commit a
first update.
:::

Two more behaviours worth knowing:

- The document is **refused** if a later Machine Update already exists for the same machine — later
  by value date, then by creation date. You cannot slot a correction in behind history.
- If you re-point a saved update at a **different** machine, the machine it used to point at is
  re-synchronised from its own latest remaining update document.

Finally, some of the machine's data is **not** on this screen and therefore cannot be changed
through it: the second serial number, the task template and the tasks grid, the dependent-machines
grid and the attachments. Those are edited on the machine file itself.

::: tip Last Visit Date and Warranty Status are typed
*Last Visit Date* and *Warranty Status* on the machine are manual fields: you type them on the
machine file or write them with a Machine Update. Read *Warranty End Date* for the warranty answer.
:::

## The Machine Ownership Transfer Document

A hotel sells a chiller with the building; a branch is handed to another company. The transfer
document records that, and keeps the chain.

Five fields carry the meaning:

| Field | Behaviour |
|---|---|
| Machine | Mandatory |
| From Customer | Filled by the system from the machine's current owner |
| To Customer | Mandatory, typed |
| From Contact | Filled by the system from the machine's current contact |
| To Contact | Typed — but see the tip below |
| Description | Free text |

On save, the document gathers **every** committed transfer for that machine, adds itself, sorts them
by value date and then creation date, and rebuilds the chain: the first document's "from" side is
stamped with the machine's **original** customer and contact, each later document's "from" side is
taken from the one before it, and the machine's current customer and contact are set from the last
document in the chain. The machine's *original* customer and contact are frozen by the **first**
transfer, so a machine that has never been transferred has no original owner recorded yet.

Cancelling a transfer rebuilds the chain without it, falling back to the original owner when no
transfers remain.

::: tip Set the new contact on the machine afterwards
Treat ownership transfer as a **customer-level** operation: leave *To Contact* empty, save the
transfer, then set the new contact on the machine file afterwards.
:::

## The Pre-Installation Preview

The site survey before an installation: customer, contact, machine, machine type and category, a
from date and a to date, an attachment, *From document*, the serial number, a maintenance-groups
grid and a discussion checklist. Picking the machine fills the serial, customer and contact.

The preview is a record of the survey: it has no buttons and no document term configuration, and it
creates no machine, order, contract or work plan. To pass the survey's findings to the technician,
put them on the [maintenance order](/modules/crm/maintenance-cycle/crm-maintenance-orders.md).

The document that *does* create machines is *Generate Machine* on the maintenance sales order — see
[Maintenance Sales](/modules/crm/maintenance-cycle/crm-maintenance-sales.md), and note that it
creates shells which must then be completed by hand.

## None of this exists for the services suite

The [service documents](/modules/crm/services-suite/crm-services-suite-overview.md) have no machine
update, no ownership transfer and no pre-installation preview. A serviced site's data is edited on
the site record directly, with no document trail.

**Reporting: none.** This module ships no system reports, and these screens have no print form. The
machine file's own transactions tab is where the ownership chain is read; for update history use the
list view filtered by machine, and its Excel export.
