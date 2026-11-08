---
entities: [HMSRoom, HMSRoomClassification, HMSBed, HMSSection, HMSBuilding, HMSFloor, HMSClinic, HMSRoomDegree]
menu: Hospital Management System → Hospital Structure → HMS Room
---
# Hospital Structure & Rooms

Before you admit your first patient, you need to map your building inside the system: which buildings you have, their floors and sections, which rooms and beds they hold, and which clinics operate. You'll find all of this under **Hospital Management System → Hospital Structure**, built once and then reused across every admission and accommodation document.

None of these screens has buttons of its own; they are plain files.

| Screen | Menu | Its own buttons |
|---|---|---|
| **HMS Building** | Hospital Management System → Hospital Structure → HMS Building | None |
| **Hospital Section** | Hospital Management System → Hospital Structure → Hospital Section | None |
| **HMS Floor** | Hospital Management System → Hospital Structure → HMS Floor | None |
| **Room Classification** | Hospital Management System → Hospital Structure → Room Classification | None |
| **Room Degree** | Hospital Management System → Hospital Structure → Room Degree | None |
| **HMS Room** | Hospital Management System → Hospital Structure → HMS Room | None |
| **Bed** | Hospital Management System → Hospital Structure → Bed | None |
| **Clinic** | Hospital Management System → Hospital Structure → Clinic | None |

## The hierarchy: building → floor → section → room → bed

A hospital is organized in five nested levels:

- **HMS Building** — the top physical level. You may have several buildings (main building, outpatient building, maternity wing…). Everything below belongs to a building.
- **HMS Floor** — a level inside a building, so rooms and beds can be located precisely. A floor records its **Building** and, optionally, its **Hospital Section**.
- **Hospital Section** — an operational/medical department (Surgery, Internal Medicine, ICU, Pediatrics…) that groups rooms, beds and clinics by clinical area. A section records the **Building** it is in.
- **HMS Room** — the most detailed unit (see below).
- **Bed** — an individual bed within a room, enabling admission and reservation at bed level (not just room level) in multi-bed rooms.

Filling the links pays off twice. While you enter the structure, the pickers narrow for you: on a room, bed or clinic, once the **Building** is chosen the **Floor** and **Section** lists show only that building's floors and sections, and on a floor the **Section** list shows only the building's sections. Later, on the admission and accommodation documents, choosing a floor fills its section and building, and choosing a section fills its building.

## The room: the heart of accommodation

The room is the richest of the structure files, because it controls bed booking, accommodation and billing. Besides its location (building/section/floor), a room carries:

| Field | What it does |
|---|---|
| **Room Classification** | The price class of the room. The accommodation, attendant and medical-supervision prices of a stay are looked up in the price lists by the room's classification (and, if a price line names it, by the room itself). |
| **Room Type** | What the room is used for: Accommodation, Short Accommodation, Does Not Need Accommodation, Nurseries, Intensive Care, Heart Care, Laboratory, Reception Room, Outpatient Clinic, Inpatient Clinic, Radiology, Surgery, Newborn or Other. It is a descriptive classifier for searching and reports. |
| **Room Degree** | A further classifier (first, second, economy…), also for searching and reports. |
| **Have a Bed** and **Beds Count** | Whether the room holds bed records, and how many. Untick *Have a Bed* and the system empties *Beds Count* and locks it. *Beds Count* is the ceiling for the beds you can define in the room (see the bed below). |
| **Room Status** | Read-only. The system keeps it up to date from the stays — see [Room and bed occupancy](#Room-and-bed-occupancy). |
| **Tax Plan** | The tax plan of this room's accommodation. When it is empty the room classification's tax plan is used, and when that is empty too, the tax plan of the document's term. |
| **Difference In Time Between Reservations Of The Same Room** | The cleaning and preparation time a theatre needs between two operations. A [Surgery Reservation](/modules/hms/hms-surgery-lifecycle#2-Booking-the-theatre-the-surgery-reservation) whose term asks to respect it refuses a booking that falls within this time of another booking of the same room. |
| **Do Not Create Room Supervision Invoice** | When an accommodation invoice creates the supervision invoice of the stay automatically, the days spent in this room are left out. |
| **Always Available** | Keeps the room on offer in the room picker of the admission and accommodation documents even when it is completely busy — useful for an emergency room or a recovery area that never turns patients away. |

![HMS room](../../ar/modules/hms/images/facility/room-en.png)

The bed is a simpler file: its location (building/section/floor/room), the **Reserved** flag the system maintains, and its own **Always Available** tick. The **Room** is required. The room picker on a bed lists only rooms ticked *Have a Bed* (and, once you pick a floor, only that floor's rooms). Each room accepts at most its *Beds Count* beds; one more is refused with:

*Beds count in room {0} equal {1}, There is no place for extra bed* — «عدد الأسرة في الغرفة {0} يساوي {1}، لا يوجد مكان لسرير إضافي»

Raise the room's *Beds Count* first if the room really gained a bed.

![Bed](../../ar/modules/hms/images/facility/bed-en.png)

## Room and bed occupancy

You never tick a bed as reserved or set a room's status by hand. Every time an **Accommodation**, **Accommodation Transfer** or **Accommodation Exit** is saved or cancelled, the system re-reads the stay history of every bed and room it touched:

1. A bed whose latest stay is still open (the patient is in it) is marked **Reserved**; a bed whose latest stay has ended is cleared.
2. The room's **Room Status** then follows its beds: **Empty** when none of its beds is reserved, **Partially Busy** when some are, and **Completely Busy** when all are.
3. The patient's current location, and the current location on the admission, are updated in the same pass.

That status is what the pickers use. On the admission and accommodation documents the **Bed** list hides reserved beds and the **Room** list hides completely busy rooms — unless the bed or room is ticked **Always Available**, in which case it stays on offer whatever its occupancy. Because the status is rebuilt from the stay history, correcting or cancelling a transfer or an exit puts the bed back in the right state on its own.

## Room classification: where accommodation pricing lives

A **room classification** (private, shared, VIP, ICU…) is the key the price lists use to price a stay. The accommodation tab of a [Medical Sales Price List](/modules/hms/hms-pricing#The-medical-sales-price-list) holds lines per room classification (optionally narrowed to one room), and the same key prices the attendant and medical-supervision tabs. The classification also carries a **Tax Plan**, used for any room of the class that has no tax plan of its own.

Rather than opening each price list, you can maintain a class's accommodation prices from the classification itself, in its **Room Class Price in Lists** grid. Each row names the price list to write to (**Add To Sales Price List**, required), optionally a single **Room** of the class, the matching keys — **Insurance Class**, **Medical Insurance Company**, **Patient Classification**, **Valid from** / **Valid to**, **Price Classifier 1** and **2** — the **Price**, and a **Priority** (required). When several price lines match a stay, the one with the lowest priority number wins. Saving the classification writes these rows into the accommodation tab of each named price list; the grid works exactly like the one on the service types, described in [How the Price in Lists grid writes to price lists](/modules/hms/hms-service-catalog#How-the-Price-in-Lists-grid-writes-to-price-lists).

![Room classification](../../ar/modules/hms/images/facility/room-classification-en.png)

::: info Room classification vs. degree
**Room Degree** is a simple extra classifier (first, second, economy…) used alongside classification and type. It plays no part in price matching — pricing comes from the **room classification**.
:::

## Clinics

A **Clinic** is the consultation point for outpatients — a place tied to a location (building/section/floor/room) and to a **medical specialty**. It's used later in scheduling and outpatient reservations to route the patient to the right specialty and place: the [outpatient schedule, the outpatient reservation and the check invoice](/modules/hms/hms-patients#Outpatient-clinics) all carry a **Clinic**.

![Clinic](../../ar/modules/hms/images/facility/clinic-en.png)

::: tip Start with what you actually need
You don't have to enter every room and bed at once. Start with room classifications and their prices, then the sections and rooms where you'll first receive patients, and add the rest gradually.
:::
