---
entities: [WizardFile]
menu: Basic → Documents → Wizard File
---

# Wizard File (the Setup Wizard's Record)

A new installation is usually set up through the **setup wizard**: a step-by-step questionnaire that
asks how the company works — its currency, branches, which documents it uses, whether fixed assets are
created from purchases, and so on — and then creates the matching document books, terms, groups and
settings in one go. A **Wizard File** is the record that holds one run of that questionnaire: every
answer is saved on it, so the wizard can be closed, reopened, changed and applied again later.

Most installations have a single Wizard File. In the demo database it is the one with the code `demo`.

## The screen

| Field | What it is |
|---|---|
| Code, names | As on any master file. |
| *(answers)* | A large text field holding the saved answers. It is filled by the wizard — do not edit it by hand. |
| **Accounts** grid | Lines of **Account** and **Wizard Classification**. Each line tags an account with the role the wizard should use it for. |

Saving the record stamps each account's **Wizard Classification** on the account itself; removing a
line clears it from that account. An account can appear only once in the grid.

![A Wizard File record](../ar/admin/images/administration/wizard-file-screen-en.png)

## Running the wizard

Save the record, then press **Go To Wizard**. The wizard opens in a new tab with one step per area —
**Basics**, **Accounting**, **Items And Items Configurations**, **Inventory**, **Purchases**,
**Sales**, **Assets**, **Human Resources**, **Manufacturing**, **POS** and the rest. Only the areas
your licence covers are shown.

- **Next** / **Previous** move between steps.
- **Save** stores the answers on the Wizard File without creating anything.
- **Apply Wizard** goes through every step in order, checks its answers, and creates what they
  describe. It stops at the first step that fails and shows the error.
- **Selective Apply** does the same but skips every step where **Do not run** (in that step's
  **Selective Run** group) is ticked. Use it to re-run one area — for example after adding a module —
  without touching the others. **Do not run** has no effect on a plain **Apply Wizard**.

New questions added in later versions appear the next time the Wizard File is saved; answers already
given are kept.

## Related pages

- Terms the wizard creates can leave the journal lines empty — check them before the first document is saved, as [Freight document terms](/modules/freight/freight-document-terms) explains for the freight module.
- Groups it creates for every master type: [Master Groups](/platform/documents-and-records/master-groups).
- The fixed-assets question it asks: [Fixed assets — getting started](/modules/fixedassets/fixedassets-getting-started).
