---
description: "The HMS Accommodation, Accommodation Transfer, Accommodation Exit and Feeding Issue screens: booking a patient's bed, the stay history, how the stay is billed, room transfers, discharge and meals."
entities: [HMSAccommodation, HMSAccommodationTransfer, HMSAccommodationExit, HMSFeedingIssue]
menu: Hospital Management System → Documents → Accommodation
---
# Accommodation & Feeding

Once admitted, a patient needs a **bed** and **meals**. Accommodation is what books the patient a bed,
starts the daily accommodation and medical-supervision charges, and tracks their moves until discharge.
It is the most stateful part of the module: every accommodation document writes an entry into the
admission's **stay history**, and the beds, the rooms, the patient file and the accommodation invoices
are all rebuilt from that history each time it changes.

| Screen | Menu | Its own buttons |
|---|---|---|
| **Accommodation** | Hospital Management System → Documents → Accommodation | **Re-create Accommodation Invoice** |
| **Accommodation Transfer** | Hospital Management System → Documents → AccommodationTransfer | **Re-create Accommodation Invoice** |
| **Accommodation Exit** | Hospital Management System → Documents → Accommodation Exit | **Re-create Accommodation Invoice** |
| **Feeding Issue** | Hospital Management System → Feeding → Feeding Issue | **Collect Meals** |

The transfer's menu entry really is written as one word, *AccommodationTransfer*.

## The stay history: in, transfer, out

Think of a stay as a row of entries in a ledger of beds:

1. The **Accommodation** writes an *in* entry: this patient, this bed, from this date and time.
2. Each **Accommodation Transfer** closes the current bed and opens a new one — an *out* for the old
   bed and an *in* for the new.
3. The **Accommodation Exit** writes the final *out*.

The entries of one admission must follow each other in time. A transfer dated before the accommodation,
or an accommodation that is not the first entry of its admission, is refused with a message naming the
two documents (see the table at the end). For the same reason, the accommodation cannot be deleted while
a transfer after it exists — delete the transfer first.

Every change to the history updates three things at once:

- the bed's **Reserved** flag — a bed is reserved while its last entry is an *in*;
- the room's **Room Status** — empty, partly occupied or fully occupied, from its beds;
- the patient file's **current accommodation**, and the admission's **Current Accommodation Info** —
  the room and bed the patient is in now, emptied once the patient has left.

Unless the admission's term allows it, a bed cannot hold two overlapping stays (see
[Stay and Operations Document Terms](./document-terms/hms-terms-stay-and-operations.md)). The check works
both ways: a new stay cannot start on a bed whose previous stay is still open, and a back-dated stay
cannot be slipped in before a later stay that already left that bed.

The history is visible on the admission itself: its collapsible **Patient Accommodation moves** list
shows every entry with its document, room, bed, from and to date and time, and **Billable Days** (see
[The patient admission](./hms-patients.md#The-accommodation-the-admission-creates)).

### Choosing the bed

The location lookups help you pick a free bed. The **Bed** lookup offers only beds that are not
reserved, plus beds ticked **Always Available**; the **Room** lookup hides rooms that are completely
occupied, unless they are ticked **Always Available** (see [Hospital Structure & Rooms](./hms-facility.md)).
Picking the bed fills its room, floor, section and building; picking a floor fills its section and
building. On the accommodation, the transfer and the admission, picking the **Room** also prices the
accommodation and medical-supervision blocks for that room, from the
[price list or insurance approval](./hms-pricing.md) that applies to the patient, and adds the two into
**Total Price Info**, which cannot be typed.

## Accommodation

**Accommodation** is the bed booking. It is usually created by the admission — when *Generate
Accommodation Doc* is ticked and the admission's term names an accommodation book and term — and from
then on every save of the admission updates it. It records the in date and time (now, by default), the
bed location (building, section, floor, room, bed), the patient and company endurance percentages, and
three price blocks: the **Accommodation Price Info** (the nightly bed price), the **Medical Supervision
Price Info** (the daily supervision fee), and the **Total Price Info**. Both prices are split between
patient and insurer. A bed is **required** to save.

It can also be entered by hand. Its **Patient Admission** lookup lists only admissions that have no exit
and have *Generate Accommodation Doc* ticked, so a hand-made accommodation fits a hospital whose
admission term leaves the accommodation book and term empty. Picking the admission in **From Document**
copies the admission, patient, in date and time, insurer, current bed, prices and remarks.

Three fields are filled by the system: **Accommodation Exit Doc**, **Out Date** and **Out Time** are
written by the patient's exit and emptied again if the exit is cancelled. The collapsible
**Accommodation Invoices** list on the screen shows every accommodation invoice of the stay, temporary or
final, since they all carry this accommodation as their *From Document*.

Cancelling an accommodation removes its entries and clears the accommodation, prices and the
*Generate Accommodation Doc* flag on the admission.

![Accommodation](../../ar/modules/hms/images/accommodation/accommodation-en.png)

## How the stay is billed

Accommodation is billed by **Accommodation Invoices**, which the system writes for you from the stay
history. Two moments matter:

- **While the patient is in**, an accommodation saved under a term with *Generate Temporary
  Accommodation Invoice On Save* writes **temporary** invoices covering the stay up to today, at the
  configured check-out hour. Each later save rebuilds them, so the bill to date is always on file.
- **When the patient leaves**, the Accommodation Exit writes the **final** invoices up to the exit date
  and time, replacing the temporary ones.

How the stay is cut into invoices — one per day, one at admission, or one at discharge — is the
*Accommodation Invoice Type* on the accommodation's term. How many days each line counts is set by
the check-in and check-out hours in [Hospital Management System Settings](./hms-configuration.md): with
the default 00:00 every calendar day the patient touched is one day, and with a noon-to-noon day a
patient who arrives in the morning is charged from the previous day. Each invoice line is one billing
day in one room — its room, in and out date and time, days count, and the accommodation and medical
prices of the document that put the patient in that room — so a transfer to a dearer room shows up as
new lines at the new price.

The day of a transfer is shared between the two rooms by the hours spent in each. With the default
00:00 hours, a patient moved from a ward to ICU at 14:00 gets a ward line of about 0.58 day (14 of 24
hours) and an ICU line of about 0.42 day for that date, each at its own room's price. The first and last
days of the stay are always whole days.

The **Re-create Accommodation Invoice** button on all three documents rebuilds the admission's invoices
on demand: the final ones if the patient has left, otherwise the temporary ones up to today. Use it
after correcting a price or a date. A line ticked **Do not Allow System To Edit Selected Line** on an
invoice is kept as it is.

For a patient who is still in hospital, the button leaves an admission's invoices untouched when the stay began on or before the date of the last **Closing Entry** of the admission's company — those days belong to a closed year. It says so with a warning naming the admission, the first day of the stay and the closing date, and moves on to the next admission.

To refresh the bill of **every** patient still in hospital without opening each stay — overnight, for
example — schedule the entity-flow action
[EACreateAccommodationInvoice](/entity-flows/hms/EACreateAccommodationInvoice) as an
[Action task](/platform/automation-and-rules/scheduled-tasks#Action). Run from a task, it rebuilds the
temporary invoices of every admission that has no exit and still has a current room, with the same
closed-year rule. Its one parameter chooses where a running stay ends: `true` bills up to the current
time, `false` up to the configured check-out hour.

::: tip Supervision is billed on its own invoice
The accommodation invoice records the bed price. The medical-supervision fee of the same days is billed
by a **Supervision Invoice** that the accommodation invoice creates when its term has *Auto Generate
Supervision Invoice* ticked — one line per day, skipping rooms ticked *Do Not Create Room Supervision
Invoice*. See [Invoice Document Terms](./document-terms/hms-terms-invoices.md).
:::

![An accommodation invoice](../../ar/modules/hms/images/accommodation/hms-accommodation-invoice-en.png)

## Transfers between rooms

**Accommodation Transfer** moves an inpatient from one bed or room to another — from a general ward to
ICU, say. Picking the admission loads the patient, doctor, insurer and the patient's **current** location
into **Accommodation From Info**; you fill **Accommodation To Info**, the **Transfer Date** and
**Transfer Time** (now, by default), and picking the new room prices the accommodation and supervision
blocks for it. The new bed is required.

**Accommodation From Info** cannot be typed. On save it is set to the bed the patient was in just before
the transfer time, so a back-dated transfer moves the patient out of the right bed even if they have
moved since. The transfer's **Accommodation Exit Doc** is filled when the patient leaves.

With *update Invoice Prices After Save* ticked on the transfer's term, saving, cancelling or deleting a
transfer re-prices the stay's invoices.

![Accommodation transfer](../../ar/modules/hms/images/accommodation/accommodation-transfer-en.png)

## Exit

**Accommodation Exit** is the discharge document. It ends the stay, frees the bed, writes the final
accommodation invoices and links itself to the admission, its accommodation and its transfers, and it
fills the accommodation's **Out Date** and **Out Time**. Picking the admission fills the patient, the
insurer, the admission date and time as the in date, the current location and the admission's
accommodation as the "from document". Picking the "from document" yourself — the lookup offers only the
accommodation and transfers of that admission — copies the patient, admission, in dates and location.
The in date and the location cannot be typed; on save the location is set to the bed of the stay's last
entry. The exit date and time default to now.

The patient lookup offers only **patients whose admission has not been closed by an exit**, and an
admission that already has an exit refuses a second one, so a patient cannot be discharged twice. The
exit date cannot be before the in date.

Nothing else has to be closed first. The exit does not check that the closing invoice exists, that the
stay's other invoices are issued or paid, or that lab and radiology orders have results. What changes
once it is saved is that the admission counts as closed: it drops out of the admission lookups of the
other HMS documents (see [After the exit](./hms-patients.md#After-the-exit)), so services billed later
have to be added before the exit, or the exit cancelled first.

Cancelling an exit deletes the stay's accommodation invoices — unless its term has *Do Not Delete
Generated Invoices When Deleting This Document* ticked — and rebuilds the temporary ones from the stay
that is now running again. From the exit, the stay is settled in the
**[Closing Invoice](./hms-invoicing.md#The-closing-invoice)**.

![Accommodation exit](../../ar/modules/hms/images/accommodation/accommodation-exit-en.png)

## Feeding issue

**Feeding Issue** issues meals to inpatients from a warehouse, **choosing each patient's diet from
their diagnosis** — a bridge between patient care and the kitchen store. Its header is that of an
inventory document (warehouse, locator, dimensions), plus the ranges used to collect patients and a
**Receipt Warehouse** and **Receipt Locator** for cooked meals.

The work is done by the **Collect Meals** button: from a range of rooms, floors, buildings and
admissions (each one optional, compared by code), it finds every patient **still in hospital** (admission
not yet closed), reads the **diagnosis diseases** on each one's admission, picks the **most appropriate
[feeding type](./hms-medical-master-files.md)**, and fills both grids:

- **Patient Admission Lines** — one row per patient: admission, patient, feeding type, room and the five
  diagnosis diseases.
- the item lines — the feeding type's components for that patient, each with its item, quantity,
  **Assembly BOM** and dimensions, plus the patient, admission, room and feeding type it is for.

A feeding type matches a patient when every disease it names is among the patient's diagnosis diseases;
a type that names no disease matches everyone. Among the matches the one with the highest order wins. A
patient whose admission has no diagnosis diseases, or whom no feeding type matches, is left out. The room
on each row is the room entered on the admission, so after a transfer it still shows the room of
admission. Pressing the button again replaces both grids — saving the nurse from choosing diets by hand.

On save, the lines are turned into stock movements under the books and terms named on the
[feeding issue's term](./document-terms/hms-terms-stay-and-operations.md):

- each line with an **Assembly BOM** becomes its own **Assembly Document**, which consumes the
  ingredients from the feeding issue's warehouse and locator and receives the cooked meal into the
  **Receipt Warehouse** and **Receipt Locator**;
- the lines without one are issued together on one **Stock Issue** from the feeding issue's warehouse.

Each save rebuilds those documents to match the lines, a term without the matching book and term
creates none, and cancelling or deleting the feeding issue deletes them. The **Related Documents** tab
lists the stock issues.

![Feeding issue](../../ar/modules/hms/images/accommodation/feeding-issue-en.png)

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *Exit Date {0} Could not be before In Date {1}.* — «تاريخ الخروج {0} لا يجب أن يكون قبل تاريخ الدخول {1}» | The exit is dated before the accommodation it closes. | Correct the exit date and time. |
| *The document {0} can not be the first entry for admission document {1}* — «المستند {0} لا يمكن أن يكون أول مستند تسكين لاستمارة الدخول {1}» | A transfer or exit is dated before the admission's accommodation, so it would be the first entry of the stay. | Check the dates; every stay starts with its accommodation. |
| *The document {0} date [{1} , {2}] can not be the next document after document {3} date [{4} , {5}]* — «المستند {0} الذي تاريخه [ {2} , {1}] لا يمكن أن يكون بعد مستند التسكين {3} الذي تاريخه [{4} , {5}]» | The entries of the stay are out of order — for example a second accommodation after one that is still open. | Fix the date of the document named first, or transfer the patient instead of opening a new accommodation. |
| *You can not delete this doc {0} before delete transfer doc {1}* — «لا يمكن حذف هذا السند {0} , حيث هناك سند نقل تسكين {1} بعد هذا السند» | A transfer exists after the document you are deleting. | Delete the transfer named in the message first. |
| *Previous document {0} in date [{1} , {2}] Must Be Out for bed {3}, intersect with same bed* — «السند السابق {0} بتاريخ [{2} , {1}] يجب أن يكون خروج للغرفة {3} , لأنه متقاطع مع نفس الغرفة» | The chosen bed is still occupied by the stay named in the message. | Choose another bed, or move the other patient out first. |
| *Next document {0} in date [{1} , {2}] Must Be In for bed {3}, intersect with same bed* — «السند التالي {0} بتاريخ [{1} , {2}] يجب أن يكون دخول للغرفة {3} , لأنه متقاطع مع نفس الغرفة» | The stay is back-dated onto a bed that another patient left later, so the two stays would overlap. | Choose another bed, or correct the date. |
| *You can not create exit document for the admission document {0} because that document already has an exit document {1}* — «لا يمكن عمل سند خروج لسند الدخول {0} حيث أن له سند خروج بالفعل {1}» | The admission was already discharged by the exit named in the message. | Open that exit instead; cancel it first if the discharge must be redone. |
| *Can not create Accommodation Invoice, please add DocumentBook and DocumentTerm in Accommodation Doc Term.* — «لا يمكن إنشاء فاتورة إقامة، برجاء إضافة دفتر وتوجيه الفاتورة في توجيه مستند تسكين المريض.» | The invoices were to be built but the accommodation's term has no invoice book or term. | Fill *Accommodation Invoice Book* and *Term* on the accommodation's term. |
| *Can not create Accommodation Invoice, please add Accommodation Invoice Type in Accommodation Doc Term.* — «لا يمكن إنشاء فاتورة إقامة، برجاء إضافة تحديد نوع فاتورة الإقامة في توجيه مستند تسكين المريض.» | Same, but the *Accommodation Invoice Type* is empty. | Choose Invoice Every Day, Invoice At In or Invoice At Out on the accommodation's term. |
| *Accommodation invoice of admission {0} was not updated because it starts at {1}, before the closing entry on {2}* | A warning from **Re-create Accommodation Invoice** for a patient still in hospital: the stay began on or before the last closing entry of the company, so its invoices are left as they are. The message has no Arabic translation. | Nothing to fix on the stay. Correct the closed-year invoices by hand if they really need a change. |
