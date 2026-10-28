---
# Handcrafted landing — GenNamaDocsIndex skips this file because of the .custom-index
# marker in this folder (see hasHandcraftedHomePage in GenNamaDocsIndex.java)
title: Human Resources
---

# Human Resources

The HR module runs the full employee lifecycle in Nama ERP — from the day someone is hired to the day they leave, and every payslip in between. In the system's own menus it actually shows up as two separate areas, **Payroll** (the salary engine, attendance, vacations, loans and discipline) and **Human Resources** (recruitment, training, government relations and employee services), but both work off the same employee master record, so this guide walks through them as one connected story. New to the module? Start with Core Concepts; otherwise jump straight to the section you need.

## Foundations

The two ideas every other page builds on, and the setup that has to exist first.

<LandingGrid>
  <LandingCard icon="🧩" title="Core Concepts" link="/modules/hr/concepts/" details="Requests vs. documents vs. aggregated documents, and the five-step pipeline behind every salary calculation." />
  <LandingCard icon="⚙️" title="Setup" link="/modules/hr/setup/" details="HR years and periods, the calendar and holidays, and the employee HR information master record." />
  <LandingCard icon="🎛️" title="HR Configuration" link="/modules/hr/setup/hr-configuration.md" details="The module's ~150 settings, grouped by what they change — the month divisor, vacation rules, absence deductions, attendance and overtime." />
  <LandingCard icon="🗂️" title="HR Master Files" link="/modules/hr/setup/hr-master-files.md" details="Employee department, job and organizational position, work place, employee group, nationality, sponsor, skills and the social insurance policy." />
  <LandingCard icon="🧾" title="Document Terms" link="/modules/hr/document-terms/" details="The 46 HR document terms: which accounts each document records its entry on, and which book and term the aggregated documents hand out." />
</LandingGrid>

## Payroll & Time

The salary engine itself, and the attendance, leave, loan and discipline data that feeds it.

<LandingGrid>
  <LandingCard icon="💰" title="Payroll" link="/modules/hr/payroll/" details="Salary components, calculation formulas, structures, salary documents, annual increases and salary blocking." />
  <LandingCard icon="🕐" title="Time & Attendance" link="/modules/hr/attendance/" details="Attendance plans and shifts, recording punches, attendance machines, and short leave permissions and missions." />
  <LandingCard icon="⏱️" title="Overtime and Lateness" link="/modules/hr/attendance/overtime-and-lateness.md" details="How the day's overtime, lateness, early leave and missing punches are measured, and the settings that change each answer." />
  <LandingCard icon="🧮" title="Attendance and Departure Formulas" link="/modules/hr/attendance-machine-formula.md" details="Teaching the system to read one particular fingerprint machine's export file — the token line that describes its columns, date and time formats." />
  <LandingCard icon="🔀" title="Ignoring Overlapping Attendance Lines" link="/modules/hr/ignore-overlapping-attendance.md" details="What to do when a fingerprint file gives an employee readings that overlap or contradict each other, and how to have the system skip them." />
  <LandingCard icon="🏖️" title="Vacations & Leaves" link="/modules/hr/vacations/" details="Vacation types and balances, the request-to-document flow, compensation and transfer, and changing an employee's state." />
  <LandingCard icon="💳" title="Loans & Installments" link="/modules/hr/loans/" details="Loan types, the request-to-disbursement flow with salary-installment recovery, and relief, rescheduling and disabling." />
  <LandingCard icon="🏅" title="Rewards, Penalties & Suspension" link="/modules/hr/discipline/" details="Ad-hoc bonuses and deductions applied to salary, and employee suspension." />
</LandingGrid>

## People

Measuring, hiring and developing the people already in the system.

<LandingGrid>
  <LandingCard icon="📈" title="Performance" link="/modules/hr/performance/" details="Performance indicators that feed salary formulas, and periodic employee evaluations." />
  <LandingCard icon="🧑‍💼" title="Recruitment" link="/modules/hr/recruitment/" details="Vacancies and candidates, job offers and tests, onboarding via work starting, and employee relocation." />
  <LandingCard icon="🎓" title="Training" link="/modules/hr/training/" details="Training courses and plans, enrollment, and post-course evaluation." />
</LandingGrid>

## Separation & Compliance

Winding down an employment relationship, and Gulf-specific government procedures.

<LandingGrid>
  <LandingCard icon="📤" title="Provisions & End of Service" link="/modules/hr/end-of-service/" details="End-of-service provisions, firing and termination, dues liquidation, and departmental evacuation approval." />
  <LandingCard icon="🏛️" title="Government Relations" link="/modules/hr/government-relations/" details="The PRO fee catalog, visas, residence (Iqama) renewal, the company visa pool, GOSI and sponsorship, and government penalties." />
  <LandingCard icon="➕" title="Health Insurance" link="/modules/hr/health-insurance/" details="Adding and removing employees from insurance, offers, claims, upgrades and credence letters." />
</LandingGrid>

## Everyday & Help

Employee-facing perks, and answers to the questions that come up most.

<LandingGrid>
  <LandingCard icon="🚗" title="Employee Services" link="/modules/hr/employee-services.md" details="Company vehicles and their insurance, employee pickup routes, and the meals catalog and delivery plans." />
  <LandingCard icon="❓" title="Payroll & HR FAQ" link="/modules/hr/human-resources-faq.md" details="Answers to the questions that come up most often around payroll and the HR module." />
</LandingGrid>
