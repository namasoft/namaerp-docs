---
description: "The small HR lists an employee file points to: Employee Department, Job Position, Organizational Position, Employee Work Place, Employee Group, Nationality, Sponsor, Skill, Experience and Social Insurance Policy — what each is for and where Nama reads it."
entities: [EmployeeDepartment, JobPosition, OrganizationPosition, EmpWorkPlace, EmployeeGroup, Nationality, Sponsor, HRSkill, HRExperience, HRInsurancePolicy]
---
# HR Master Files

The employee file is mostly made of pointers: which department the person belongs to, which position
they hold, where they work, what nationality they carry. Each of those pointers is a small master file
of its own, and most of them do more than label the employee — a job position can cap leave
permissions, an organizational position can hand its responsibilities to every new holder, a social
insurance policy can override the company-wide insurance rates. This page lists them, what each one
holds, and where Nama reads it, so that a "why did the employee get this?" question can be traced back
to the right list.

Fill these lists before you create employees. Every one of them is a plain code-and-name master file
with the usual dimensions; the sections below cover only what they add on top.

## Where they sit

| Screen | Arabic | Menu |
|---|---|---|
| Employee Department | إدارة موظف | Payroll > Main > Employee Department |
| Job Position | الموقع الوظيفي | Payroll > Main > Job Position |
| Organizational Position | درجة وظيفية | Payroll > Main > Organizational Position |
| Skill | المهارة | Human Resources > Main > Skill |
| Experience | خبرة | Human Resources > Main > Experience |
| Employee Work Place | مكان عمل | Human Resources > Main > Employee Work Place |
| Social Insurance Policy | سياسة التأمينات الاجتماعية | Human Resources > Health Insurance > Social Insurance Policy |
| Nationality | جنسية | Basic > Master Files > Nationality |
| Employee Group | مجموعة موظفين | Basic > Remarks > Employee Group |
| Sponsor | كفيل | Education > Master Files > Sponsor |

## Employee Department

The **Employee Department** is the HR department an employee belongs to — the **Employee Department**
field on the employee file. It is separate from the *department* dimension: the dimension decides
where the employee's costs land in the accounts, the Employee Department is the organisational unit HR
manages. Most employee ranges and criteria in HR (salary components, attendance plans, leave
permission rules, collect-employees buttons) can filter on either one.

| Field | What it does |
|---|---|
| **Department Manager** (مدير الإدارة) | The employee who heads the department. |
| **Max Permissions Per Month**, **Max Permission Hours Per Month**, **Max Single Permission Hours** | Leave-permission caps for the department's employees — see [How the leave-permission caps are chosen](#How-the-leave-permission-caps-are-chosen). |

Department sections hang off a department: picking a **Department Section** on the employee file
fills its Employee Department, and the section list is narrowed to the department already chosen.

## Job Position and Organizational Position

Both describe the employee's role, and both are trees: each record can name a **Parent**, so
positions can be grouped into families.

- **Job Position** (الموقع الوظيفي) is the job the employee does — *accountant*, *driver*, *sales
  representative*.
- **Organizational Position** (درجة وظيفية) is the slot in the organisation chart — the grade or post
  the employee fills. The employee file also uses it for **Super Position** (the position above) and,
  in Gulf installations, for the **Current position** on the residency.

What each one carries:

| Field | Job Position | Organizational Position | What it does |
|---|---|---|---|
| **Duties And Tasks** (المهام والواجبات) | ✓ | ✓ | Copied into the employee's own Duties And Tasks when you pick the position and that field is still empty. |
| **Max Permissions Per Month** / **Max Permission Hours Per Month** / **Max Single Permission Hours** | ✓ | ✓ | Leave-permission caps for the employees who hold the position. |
| **Finger Print Exception** (الإستثناء من البصمة) | ✓ | ✓ | Fills in missing punches for the holders — see below. |
| **Responsibilities** grid | | ✓ | Copied into the employee's Responsibilities when you pick the position, except lines ticked **Do Not Copy Responsibility To Employee**. |
| **Skills** tab (Skill, Level, Description) | | ✓ | The skills the position calls for. |
| **Minimum / Max Number Of Positions** | | ✓ | The maximum caps vacancies: an HR Vacancy for this position cannot ask for more than this number. |
| **Required Years Of Experience** | | ✓ | Recorded for reference on the position. |

### Finger Print Exception

Some staff are not expected to punch both ends of the day — a driver who leaves from home, a manager
exempt from checking out. **Finger Print Exception** tells attendance calculation what to assume:

| Value | Effect on a day |
|---|---|
| **Check In Exception** (الإستثناء من الحضور) | A punch that has only a check-out takes the shift's start time as its check-in. |
| **Check Out Exception** (الإستثناء من الانصراف) | A punch that has only a check-in takes the shift's end time as its check-out. |
| **Check In And Check Out Exception** (الإستثناء من الحضور والانصراف) | A working day with no punches at all is counted as worked for the shift's hours. |

The employee file has the same field. Nama uses the employee's own value first, then the
Organizational Position's, then the Job Position's.

### How the leave-permission caps are chosen

The three caps exist on the employee file, the Job Position, the Organizational Position, the Employee
Department, the Leave Reason, the [Leave Permission Configuration](/modules/hr/attendance/leave-permissions-and-missions#Leave-Permission-Configuration--the-guardrails)
and the [HR Configuration](/modules/hr/setup/hr-configuration). For each cap, a matching Leave
Permission Configuration rule wins; otherwise Nama takes the first non-zero value in this order:
Leave Reason, employee file, Job Position, Organizational Position, Employee Department, HR
Configuration. Leave a level empty or zero to let the next one decide.

## Employee Work Place

**Employee Work Place** (مكان عمل) is the physical site an employee works at — a branch office, a
project site, a warehouse. The employee file shows it as **Current Work Place**, and a
[Work Place Update](/modules/hr/recruitment/employee-relocation#Work-Place-Update) moves an employee to
another site for a period. Holidays can be declared for one work place, and employee ranges on salary,
attendance and insurance documents can filter on it. Its only own field, **Related To**, is a free
link to another record.

## Employee Group

**Employee Group** (مجموعة موظفين) is a hand-picked list of employees — its grid holds **Employee**
and **Remarks**. It exists for the places where a rule has to target people who share no department or
position: attendance plan lines, the electronic-attendance configuration and allowed-zone documents
(see [Time Attendance](/modules/hr/attendance/time-attendance)), and the mobile security
configuration. A rule scoped to a group applies only to the employees listed in it.

## Nationality and Sponsor

**Nationality** (جنسية) is the employee's **Nationality** on the employee file. Many HR rules read it:
salary components and vacation types can be limited to a range of nationalities, holidays can be
declared for one nationality, and health-insurance, visa and residency documents carry it per line.
Other modules (hotel guests, students, real-estate owners) use the same list.

**Sponsor** (كفيل) is the employee's **Sponsor** in Gulf installations — the person or company the
residency is tied to. It is a plain list; the sponsorship transfer documents on
[Social Insurance & Sponsorship](/modules/hr/government-relations/social-insurance-and-sponsorship)
record the new sponsor's name and number as text of their own.

## Skill and Experience

**Skill** (المهارة) is a plain list used wherever HR describes abilities: an Organizational Position's
Skills tab, vacancy types, training plans and course results, and an employee's own skills record.

**Experience** (خبرة) is a named experience profile with a grid of free-text lines. The employee file
points to one in **Experience**, next to the **Previous Experience** and **Current Experience** year
counts.

## Social Insurance Policy

The company-wide social-insurance bands and percentages live on the **Social Insurance** tab of
[HR Configuration](/modules/hr/setup/hr-configuration#Social-Insurance). A **Social Insurance Policy**
(سياسة التأمينات الاجتماعية) is the same dated grid kept as a separate record, for employees who must
be insured on different terms — another scheme, another authority, a contract with special rates.

Each row has **From Date**, **To Date**, an **HR Calendar**, the minimum and maximum fixed and variable
insurance base, and the company's and the employee's fixed and variable percentages. Pick the policy
in **Social Insurance Policy** on the employee file (a Job Offer or an Update Employee Info can set it
too). From then on the salary calculation reads that employee's insurance from the policy, never from
HR Configuration: it uses the row whose dates contain the start of the salary document's HR period and
whose HR Calendar is empty or matches the employee's calendar. If no row matches, the employee's
insurance comes out as zero.

## Related pages

- [Employee HR Information](/modules/hr/setup/employee-hr-information) — the payroll layer on top of the
  employee file.
- [Leave Permissions and Missions](/modules/hr/attendance/leave-permissions-and-missions) — where the
  leave-permission caps bite.
- [Employee Relocation and Updates](/modules/hr/recruitment/employee-relocation) — changing an
  employee's department, position or work place after hiring.
