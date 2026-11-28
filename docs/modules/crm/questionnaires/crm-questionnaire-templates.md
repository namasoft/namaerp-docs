---
description: "Building a CRM survey: the Question library of reusable questions, the Questionnaire Template that orders them into a survey, and the template settings that only affect the public web link."
entities: [CRMQuestionairTemplate, CRMQuestion]
menu: Customer Relationship Management → Questionnaires → Questionnaire Template
---
# Questionnaire Templates and Questions

Two weeks after Al Nokhba services a customer's chillers, somebody rings the customer and asks four
questions: were the technicians on time, was the work explained, how would you rate the service out
of ten, and would you like us to call again. Four questions, asked the same way every time, with the
answers kept where anyone can find them.

Building that survey takes two screens. The **Question** file (سؤال) is a library of individual
questions, written once and reused. The **Questionnaire Template** (قالب استبيان) is the survey
itself: an ordered list of questions plus the settings that control how the survey looks when it is
sent out as a web link. The third screen — the [questionnaire](/modules/crm/questionnaires/crm-questionnaires.md)
itself — is one respondent's answers, and it has its own page.

::: info Required licence
`crm`
:::

| What | Where |
|---|---|
| Question | Customer Relationship Management > Questionnaires > Question |
| Questionnaire Template | Customer Relationship Management > Questionnaires > Questionnaire Template |

## The question library

A question is a small master file. Its **Arabic name** is the question text as the respondent sees
it by default, with the English name alongside, plus the usual code, group, responsible employee and
mediator.

![Question screen](../../../ar/modules/crm/images/questionnaires/crm-question-en.png)

The heart of it is **نوع الإجابة / Response Type**, which is required and offers exactly four
choices:

| Response type | What the respondent gets | Where the answer is stored |
|---|---|---|
| نصي / Text | a free-text box | the text answer column |
| اختيار / Choices | a drop-down of the options you listed | the text answer column |
| رقم / Number | a numeric box | the numeric answer column |
| تاريخ / Date | a date box | the date answer column |

For a Choices question, type the options into the **الإجابات / Answers** box — **one option per
line**. `ممتاز`, `جيد`, `مقبول`, `ضعيف` on four lines becomes a four-option drop-down.

The **النتيجة الافتراضية / Default Result** box holds a value that is copied into the answer column
whenever this question is added to a questionnaire. It is read according to the response type, so a
Number question's default must be a number and a Date question's a date.

::: tip There is no rating scale and no multi-select
This is the expectation to correct first. There is no rating type, no star scale, no slider, no
matrix and no multiple-answer question. A "rate us out of ten" question is a **Number** question, or
a **Choices** question with ten lines — and the drop-down accepts **one** answer only.

There is also no weight or value behind a choice. `ممتاز` is a piece of text, not a 5, so **nothing
in the module can score a questionnaire.** If you want a score, ask for a Number and add the numbers
up yourself outside the system.
:::

The **Question Title Template (HTML)** box is for sites that want to control how a question is drawn
on the web form: fill it and it replaces the rendered question text.

::: info The image and ordering fields are for the mobile questionnaire app
The question screen shows a *صورة السؤال / Question Image*, seven *صورة الخيار / Choice Image* slots
and a *ترتيب عرض السؤال / Question Display Order* box. These serve a separate mobile questionnaire
application. In the ERP and on the web questionnaire, questionnaire lines come out in the order the
template lists them.

The choice images carry a validation: fill **one** choice image on a Choices question and the record
refuses to save until the number of images matches the number of option lines exactly.
:::

## The template — the survey itself

A template is the survey: a code, Arabic and English names, a few settings, and a grid of questions.

![Questionnaire Template screen](../../../ar/modules/crm/images/questionnaires/crm-questionnaire-template-en.png)

**Details grid.** One row per question, in the order you want them asked. The same question may not
appear twice — the screen refuses to save and points at the offending line. Five free-text
description columns on the row hold your own notes about that line.

::: tip The English column header says "Criteria"
On both the template's question grid and the questionnaire's answer grid, the English label of the
question column reads **"Criteria"**. It is the question column, nothing else; the Arabic label
reads السؤال. It is mentioned here so you can find the column, not so you use the word.
:::

**يستعمل مع / Used With** decides where the template can be picked: *الاتصالات فقط / Calls Only*,
*الاستبيانات فقط / Questionnaire Only*, or *أي منهما / Both*. Leaving it empty means both. This
filters the template picker on the [questionnaire](/modules/crm/questionnaires/crm-questionnaires.md)
screen and on the [Call](/modules/crm/activities/crm-calls.md) screen.

Picking a template on either screen builds the answer grid from it: one line per template question,
in template order, with each question's default result filled in. The new lines replace whatever
rows the grid already held.

### Settings that only affect the public web link

The remaining settings matter only when the survey is answered from a web link rather than typed in
by your own staff. That channel, and its one prerequisite, is described on the
[Questionnaires](/modules/crm/questionnaires/crm-questionnaires.md) page.

- **Render Right To Left in URLs** — draws the web page right-to-left and labels its upload boxes in
  Arabic. Tick it for Arabic surveys. (The label itself is English on the Arabic screen, as are the
  four HTML boxes below.)
- **Customer Welcome Message Header Template (HTML)** and **Footer Template (HTML)** — free HTML
  rendered above and below the questions. This is where a logo, a greeting and a thank-you line go.
- **Questionnaire Body Template (HTML)** — if you fill this, it **replaces the whole generated
  page**. Leave it empty and the system builds a clean, standard form for you; that is the right
  choice unless somebody is actively maintaining the HTML.
- **Already Answered Template (HTML)** — used together with a *Questionnaire Body Template*: the
  page shown instead of the form when the link has already been answered and answering more than
  once is not allowed.
- **السماح بالإجابة على نفس الاستبيان أكثر من مرة من الرابط / Allow Answer Multiple Times From URL** —
  when ticked, a respondent who re-opens a link they have already answered gets the questions again,
  and the answers they submit replace the stored ones. The questionnaire keeps the date and time of
  the latest answer from the link.
- **إظهار مرفق N في الاستبيان / Show Attachment N In Questionnaire**, eight ticks. Each ticked slot
  adds a file-upload box to the web form, and the uploaded file lands in the matching attachment slot
  on the questionnaire document. Files are limited to 20 MB each.

::: tip Build the template before the questionnaires that use it
A questionnaire copies the template's questions into its own answer grid at the moment you pick the
template. Adding a question to the template afterwards does **not** reach questionnaires that were
already created — they keep the list they were built with. Finish the template first, then start
sending.
:::

::: info Reporting
Reporting: none. This module ships no system reports, and these screens have no print form.
:::
