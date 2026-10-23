---
description: "Overview of the Education module for schools and training centres: the school register (students, guardians, classes, attendance, marks, buses, meals, trips) that records information only, the Course Contract that carries the money, one enrolment followed end to end, licensing and a map of the guide."
---
# Education

Welcome to the Education module of Nama ERP — the module for organisations whose customers are
**students**: a school with stages, classes and a register to call every morning, or a training
centre that sells a twelve-week course and collects it in instalments.

## Who is this module for?

Two quite different businesses use these screens, and the module was built to serve both.

A **school** needs to know who its students are, which stage and class each one belongs to, who the
guardian is and how to reach them, who was present today, what marks were achieved this term, which
bus a child rides and what was served for lunch. Most of that is record-keeping: it has to be
accurate, it has to be searchable years later, and it does not move a single riyal.

A **training centre** sells courses. It publishes a catalogue, opens an intake with a lecturer and a
price, signs up students, and then does the thing every business does — bills the fee, agrees a
payment plan, and chases the instalments.

## The big picture — two halves, and the one that carries the money

The most useful thing to understand before you open a single screen is that this module is
**two halves sharing one menu**.

**The school register** is the students and guardians, the stage / class / rank structure, attendance
and daily monitoring, leave permissions, marks, buses, meals and school trips. Everything here
**records information and nothing else** — no accounting entries, no stock movement, no fee
calculation. That is deliberate: a teacher marking a register or a supervisor logging a bus repair
should never move anyone's accounts.

**The course contract** is the other half, and it is the only place in Education that reaches the
general ledger. A Course Contract carries the students being enrolled, the fee per student, the
payment schedule and the money actually collected. When it is processed it writes ledger entries
directly, with the accounts taken from its document term.

::: info Where the two halves touch
There is exactly one link between them: a **Course** carries a **sales price**, and when you pick
that course on a Course Contract, its sales price becomes the unit price on the student line. Nothing
else crosses over — attendance, marks, buses and meals never feed a fee, an invoice or a balance.
:::

## Following one enrolment through the system

Suppose a training centre runs "Advanced Excel for Accountants" three times a year.

1. The course is described **once** as a **Course Definition** — the catalogue card that says what
   the course is, which level it sits at, how it is taught and how many hours it runs.
2. For the spring intake you create a **Course**: the offering that actually runs, with its lecturer,
   its semester, its planned dates, its cost and — importantly — its **sales price** of 1,800 per
   student.
3. Twelve students sign up. You raise a **Course Contract**, add the twelve students, and pick the
   course on each line so the price comes across: 12 × 1,800 = 21,600.
4. The family will pay 4,000 up front and the rest monthly, so you let the system build the
   **payment schedule** — eight instalments — and record the down payment on the contract's own
   payment lines.
5. Saving the contract creates its ledger entries in the background: the fee owed by the party on one
   side, the training revenue on the other.
6. One student withdraws in week three. A **Course Contract Cancel** copies the contract down, you
   keep only that student's line, and processing it records the mirror-image entry and settles the
   instalments that no longer apply.

A school follows the same money path for its tuition, and runs the register half in parallel —
attendance sheets each morning, marks at the end of term.

::: tip How documents work in Nama ERP
There is no separate step that pushes a document into the accounts. Once a document is saved out of draft, its effects are created
straight away as a **business request** processed in the background — so saving is instant and the
work happens behind you. If an effect fails, you can find and retry it from the **Business Requests**
list view. Later edits to a saved document flow through the same way.
:::

## Licensing

The whole module sits behind a single licence code, **`education`**. There are no sub-licences to buy
screen by screen — if the module is in your licence the full Education menu appears, and if it isn't,
none of it does.

## How this guide is organized

The Education menu has five groups — **Master Files**, **Time Attendance**, **Vehicles**, **Meals**
and **School Trips** — and this guide follows the shape of the work rather than the shape of the menu.

### Setting up

<LandingGrid>
  <LandingCard icon="🎒" title="Students, Guardians and the Academic Structure" link="/modules/education/education-master-files.md" details="The foundation: stage types and educational stages, class rooms and ranks, the student and guardian cards and why both are accounting parties, lecturers and contractors, and the document that updates a student's details." />
  <LandingCard icon="📚" title="Course Definitions and Courses" link="/modules/education/education-courses.md" details="The catalogue card and the intake you actually run, and where the sales price that reaches a contract comes from." />
</LandingGrid>

### The money

<LandingGrid>
  <LandingCard icon="📝" title="Course Contracts" link="/modules/education/education-course-contracts.md" details="The one document in Education that reaches the ledger: who is enrolled, what they owe, and what processing it books." />
  <LandingCard icon="💳" title="Payment Schedules and Collection" link="/modules/education/education-payment-schedules.md" details="Building an instalment plan by hand, from a payment template or with the generate button, and recording what is collected." />
  <LandingCard icon="↩️" title="Cancelling a Course Contract" link="/modules/education/education-contract-cancellation.md" details="Unwinding all or part of a contract, and what happens to the instalments already agreed." />
  <LandingCard icon="⚙️" title="Document Terms" link="/modules/education/education-document-terms.md" details="Where the accounting behaviour of both documents is actually configured." />
</LandingGrid>

### Day to day

<LandingGrid>
  <LandingCard icon="🕘" title="Attendance, Daily Monitoring and Leave" link="/modules/education/education-attendance.md" details="The daily register, the behaviour and follow-up diary, and early-leave permissions." />
  <LandingCard icon="💯" title="Recording Marks" link="/modules/education/education-marks.md" details="The marks sheet for a student on a course, with the subjects and their maximum and pass marks carried across." />
</LandingGrid>

### Around the school

<LandingGrid>
  <LandingCard icon="🚌" title="Buses, Meals and School Trips" link="/modules/education/education-transport-and-meals.md" details="The vehicle register, its incident log, pickup plans and info updates, the meal catalogue and delivery record, and the school trip file." />
</LandingGrid>
