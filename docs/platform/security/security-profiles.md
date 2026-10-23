---
description: "The Security Profile screen tab by tab: full authority, standard security lines for viewing, editing, printing and revision, menu, field, page, list view, action and custom capability security, extra filters, deliberately hidden fields, assigned users and the messages you may see."
entities: [SecurityProfile]
menu: Administration → Security → Security Profile
---
# Security Profile

The Security Profile is where most of your permission settings live. You create one profile per job role, fill in its tables once, and then assign it to every user who performs that role. This page walks through the Security Profile screen tab by tab.

**Path**: Administration > Security > Security Profile

![Security Profile — Main Screen](../../ar/platform/security/images/security-profile-main-en.png)

## Full Authority

The most powerful flag in the entire system. When **Full Authority** is enabled, the profile grants *everything*: all types, all permissions, all fields, all pages, all list views. The rest of the permission tables are ignored entirely.

You will not find a **Full Authority** checkbox on the Security Profile screen. It is hidden on purpose, so that nobody grants it by ticking the wrong box. The built-in **default** profile already carries it. If another profile really needs it, first show the field with a Screen Modifier, as described in [Fields hidden on purpose](#Fields-Hidden-on-Purpose).

A few rules the system enforces around this:

- The built-in **default** security profile must always have Full Authority enabled — it is the `admin` user's profile.
- A profile *without* Full Authority must contain at least one standard security line, otherwise it grants nothing and the system rejects it on save.
- A Full Authority profile cannot contain list-view security lines — the two are contradictory.

::: tip
Even with a full-authority profile, record visibility can still be narrowed through Dimensions on the user record and login dimensions — see [Record-Level Security](/platform/security/record-level-security.md).
:::

## Standard Security Lines

This table on the main page is the heart of the Security Profile: one line per entity type (or group of types) describing what the role can do with it.

### Defining the Line's Scope

Every line starts with the question "which types does this line govern?":

- **Type** — a single entity type, such as a sales invoice.
- **Type List** — an *EntityType List* record that groups several types together.
- **Both empty** — a Wildcard line that matches any type not covered by a more specific line.

When checking a permission, a line that names the type explicitly always takes priority over a type-list line, which in turn takes priority over the wildcard. Duplicate lines covering the same scope are rejected on save.

You do not have to add lines one by one: the **Copy Entities From Menu** and **Copy Entities From Group** fields in the screen header, together with the **Add From Menu Definition** buttons, generate lines for every type that appears in a menu or menu group — a fast way to seed a role from the menu the user will actually use.

### View Permissions

| Column | Meaning |
|---|---|
| **Full** | Grants all permissions for the types in this line — "full authority" at the line level. |
| **Record View** | Open a record and read its details. |
| **List View** | See list screens for the type. |
| **Search View** | The type's records appear in reference-field search results. Granting List View includes Search View. |
| **Min Search Query Length** | The user must type at least this many characters before the search returns results — useful for large files like items and customers. |
| **View Only Created Records** | The user sees only records they themselves created. See [Record-Level Security](/platform/security/record-level-security.md). |
| **Allow View Other Records At Search** | Softens the above flag: other users' records still appear in reference search results even though their screens are blocked. |

### Add, Edit, and Delete

| Column | Meaning |
|---|---|
| **Can Edit** | A level, not just a flag: **Disabled** (no writing at all) ← **Save Draft** (drafts only) ← **Commit** (create and save, but the saved record is then locked) ← **Edit After Commit** (full editing even after saving). |
| **Edit Only Created Records** | The user can only edit records they created. Requires *Edit After Commit* level. |
| **Can Delete** | Delete records. |
| **Delete Only Created Records** | The user can only delete records they created. Requires the Delete permission. |
| **Draft Deletion Capability** | Independent control over draft deletion: **Yes**, **No**, or **Same As Delete** (mirrors the Delete permission). |
| **Delete Only Created Drafts** | The user can only delete drafts they created. |
| **Prevent Save Draft** | Disables the draft mechanism entirely for this type. |
| **Prevent Edit After Print** | Once a record has been printed, it can no longer be edited. |
| **Prevent Delete After Print** | Once a record has been printed, it can no longer be deleted. |
| **Prevent Edit After Approval** | Once the record's approval is complete, it can no longer be edited. |
| **Prevent Delete After Approval** | Once the record's approval is complete, it can no longer be deleted. |

The four are separate: ticking a *Prevent Edit…* column does not stop deletes, so tick the matching *Prevent Delete…* column as well when the record should be fully locked. On the User screen's own lines only the two *Prevent Edit…* columns appear.
| **Prevent Modify While Under Approval** | Prevents editing while an approval is in progress (see [Approvals System](/platform/approvals/approvals-system.md)). |

### Printing

| Column | Meaning |
|---|---|
| **Can Print** | **Disabled**, **One** (print once), or **More Than One**. |
| **Max Print Count** | A numeric cap on how many times the same record can be printed. |
| **Do Not Allow Print Drafts** | Drafts cannot be printed. |

Combining these columns with *Prevent Edit After Print* and *Prevent Delete After Print* gives you a tight "printing = final" policy for documents such as official invoices.

### Revision

Documents in Nama can be *revised* — stamped as reviewed at one of five levels (L1–L5):

| Column | Meaning |
|---|---|
| **Can Revise** | The user can stamp documents as revised. |
| **Revise Levels** | The levels the user is allowed to stamp, written as a comma-separated list — `1,2`. Leave it empty to allow every level. |
| **Can UnRevise / UnRevise Levels** | The same pair for removing a revision stamp. |

::: warning A dash is a separator, not a range
`1-3` does **not** mean levels 1 through 3 — it is read as the two levels **1 and 3**, and a sign-off at level 2 is refused. Write out every level you want to allow: `1,2,3`. [Revise and Unrevise](/platform/governance/revise-and-unrevise) covers the levels themselves.
:::

### Data Transfer and Miscellaneous

| Column | Meaning |
|---|---|
| **Can Duplicate** | Create a copy of an existing record (enabled by default). |
| **Copy From / Copy To** | Allow the type to be a source / target for the "copy from another entity" feature. |
| **Can Import / Can Export** | Import and export records of this type via Excel. |
| **Can View With From Doc** | Open a record from a "from document" reference on other screens. |
| **Prevent View System Transaction** | Hide the system effects of the record (journal entries, stock movements). |
| **Prevent View More Menu** | Hide the "More" menu on the type's screens. |
| **Can Change Capability** | Allow assigning/changing a capability at the individual record level (see [Record-Level Security](/platform/security/record-level-security.md)). |
| **Display Prevent-Usage Records** | Whether records flagged "prevent usage" are visible to this role: **Display**, **Hide**, or **Same As Config** (follows Global Configuration). |
| **Can Edit/Delete Docs In Closed Shifts** | POS-specific: allow interacting with documents that belong to a closed cash shift. |

## Menu Allow/Block

Also on the main page, the **Menu Allow/Block** table controls which menu items the role sees. Each line targets either a type / type list, **or** a menu item code / group code — not both at once. This is the cleanest way to trim the navigation menu per role without redefining the menus themselves — the codes it works off are the ones described in [how the menu is put together](/platform/menus/menu-structure), and [changing the menu](/platform/menus/menu-update) covers the alternative when the shape itself should differ.

What these lines do is decide what **appears** in the menu. They are not permissions: somebody who still has permission to open a screen can reach it by other routes even when its menu entry is hidden. To stop a person using a screen at all, remove the permission itself.

## Field Settings Page

Hide specific fields or prevent editing them per type. Documented in full detail in [Field, Page, and List-View Security](/platform/security/field-page-listview-security.md).

![Security Profile — Field Settings](../../ar/platform/security/images/security-profile-field-settings-en.png)

## Page Security Page

Hide entire pages from the type's screen or make them read-only.

![Security Profile — Page Security](../../ar/platform/security/images/security-profile-page-security-en.png)

## List View Security Page

Allow or block specific list views — including the blocks that [Custom List Views](/platform/list-views/custom-list-views) add to other screens. The rules are in [Field, Page, and List View Security](/platform/security/field-page-listview-security.md).

![Security Profile — List View Security](../../ar/platform/security/images/security-profile-listview-security-en.png)

## Custom Capabilities Page

Some checks in the system are not standard operations (add/edit/delete) — they are named permissions specific to certain features, defined as **Capability Type** records under **Administration > Security > Capability Types**.

![Security Profile — Custom Capabilities](../../ar/platform/security/images/security-profile-custom-lines-en.png)

How it works:

1. Define a **Capability Type** record (for example "View System Reports", or a capability used to tag sensitive records).
2. In the Custom Capabilities section on the security profile (or user), add a line granting that capability, optionally scoped to a type or type list.
3. Wherever the system — or any customization — checks for that capability, only users who hold it pass through. Unlike standard security lines, there is no wildcard-line logic here: either you hold the capability or you don't.

Custom capability lines also carry optional inputs (two references, two dates, two text fields) that specific features can interpret — for example a reference to a cost center to which the capability applies.

::: info System Reports
The **View System Reports** flag grants one built-in capability, *System Reports* (code `SYSTEMREPORTS`). That covers far less than its name suggests. The reports Namasoft ships are filed under groups such as *System Reports - Accounting*, and each one carries its group's own capability as its view capability. So to let a user without full authority run the shipped accounting reports, add a Custom Capabilities line for *System Reports - Accounting*, and likewise for every other group they need. The flag on its own only opens the few system reports filed without a group. It is not on the screen by default — see [Fields hidden on purpose](#Fields-Hidden-on-Purpose).

Who may run a particular report — its own security grid, its security equivalent, and the capability each shipped report carries — is explained in [Who may run a report](/platform/reports/reports-guide#Who-may-run-a-report).
:::

![Capability Type Screen](../../ar/platform/security/images/security-capability-en.png)

## Extra Filters Page

Row-level filters that restrict *which records* the role sees for each type — by matching a field against something related to the user, or via a free-form criteria expression. Because this is a record-visibility topic it is documented in [Record-Level Security](/platform/security/record-level-security.md).

The same page carries a second grid, **Search Extra Filters (Cancels Normal Extra Filters If Applicable)**, which sets a different filter for the lookup inside particular reference fields and replaces the normal Extra Filter there — see [Search Extra Filters](/platform/security/record-level-security#Search-Extra-Filters).

![Security Profile — Extra Filters](../../ar/platform/security/images/security-profile-extra-filters-en.png)

## Action Security Page

Type screens carry actions beyond the standard operations — generation buttons, recalculation tools, entity flows. Each line here targets a type (or type list, or a wildcard) together with an **Action ID** and a **Control Type** of either *enabled* or *disabled*.

![Security Profile — Action Security](../../ar/platform/security/images/security-profile-action-lines-en.png)

The resolution logic here is the inverse of standard security lines:

- **No matching line → the action is allowed.** Actions are open by default.
- A matching line allows the action only if its control type is *enabled* — a *disabled* line is how you remove an action from a role.
- Action ID `*` acts as a wildcard for all actions on the targeted type, and a line that names the action explicitly takes priority over `*`.

The common pattern therefore is: a line with action `*` and *disabled* for a type (locking everything down), plus explicit *enabled* lines for the few actions the role actually needs.

## Header Options on the Main Page

Alongside the tables, the security profile header carries defaults and switches that apply to every user assigned this profile (most are also present on the user record, where the user's value takes priority):

- **Sessions and Login**: maximum number of concurrent login sessions with an option to auto-logout the oldest session, *Allow Login Through Applications Only*, and *Do Not Use LDAP For Login*.
- **Reports and Printing**: maximum number of reports a user can run simultaneously, *Prevent the user from running the same report twice at the same time*, and *Allow PDF Printing Only* for reports and/or screen forms.
- **Prevent-Usage Records**: allow their use in data entry/editing, and show or hide them in search and list views.
- **Default Settings**: default menu, default list-view ID, dashboard, the email used with the send-as-email window, maximum records per list page.
- **Miscellaneous**: do not show system help messages, do not display critical errors, prevent access to sales threads not assigned to the employee, auto-load user shift, access to AI capabilities, prevent access to instant messaging, and notification sounds.

## Fields Hidden on Purpose

Six fields of a security profile are kept off the screen, so that nobody changes them by ticking the wrong box. They still work. The built-in **default** profile holds Full Authority, and the four reprocessing switches are on in every new profile.

| Field | Field id | On a new profile | What it controls |
|---|---|---|---|
| **Full Authority** | `fullAuthority` | Off (on in the **default** profile) | Grants everything — see [Full Authority](#Full-Authority). |
| **View System Reports** | `viewSystemReports` | Off | The general *System Reports* capability — see [System Reports](#Custom-Capabilities-Page). |
| **Allow Record Recommiting** | `allowRecommitRecord` | On | Recommitting a saved record. |
| **Allow ReGenerate Accounting Effects** | `allowReGenAccountingEffects` | On | Regenerating a record's accounting effects. |
| **Allow ReGenerate Inventory Effects** | `allowReGenInventoryEffects` | On | Regenerating a record's stock effects. |
| **Allow ReReplicate Record** | `allowReReplicateRecord` | On | Sending a record to the other sites again (Replication). |

A profile with Full Authority passes the four reprocessing checks whatever their value.

When a role does need one of them changed — for example, taking recommitting away from ordinary users — show the field first:

1. Open **Administration → Display Customization → Screen Modifier** and create a modifier with **Applicable For** = *Entity Type* and **For Type** = *Security Profile*.
2. Add the field ids you need to a header group, through **Modified Group Fields** or a new group in **Add Groups** — see [Groups of header fields](/platform/screen-modifier/screen-modifier-edit-screen#Groups-of-header-fields).
3. Tick **Activate**, save, and run **Regenerate GUI For Applicable Types Only** ([Making your changes take effect](/platform/screen-modifier/screen-modifier-overview#Making-your-changes-take-effect)).
4. Reopen the security profile, set the field and save.

Users pick up the change at their next login.

## Users Page

The last page is view-only: a list of all users currently assigned this profile, so you can immediately see the scope of any change before saving it.

::: warning Changes Take Effect at Next Login
Permission data is loaded with the session. Users typically pick up security profile changes at their next login — keep this in mind during testing.
:::

## Messages you may see

A permission refusal always names the thing it checked, and that tells you which table to open.

| Message | Which setting refused it | What to do |
|---|---|---|
| *You do not have the authority {1} on entity {0}* — «لا توجد لديك الصلاحية {1} على النوع {0}» | **Standard Security Lines**. `{1}` is the authority itself — Insert, Update, Delete, View, Commit, Revise and the rest — and `{0}` is the entity type. | Find the row covering that entity type and tick that authority. If several rows could match, the most specific one wins, which is the trap explained in [the permissions FAQ](/admin/troubleshooting/general-faq#How-Can-Permissions-Be-Assigned-to-All-Record-Types-in-Nama-ERP-in-a-Flexible-and-Fast-Way-Without-Adding-a-Row-for-Each-Type). |
| *The user {0} does not have the capability {1} on the type {2}* — «المستخدم {0} ليس لديه الصلاحية {1} للنوع {2}» | **Custom Capabilities**, not the standard grid. The named capability is one of the per-screen actions, so ticking Update will not help. | Add the capability for that type on the Custom Capabilities page. |
| *The user {0} level ({1}) does not include the entity type {2}* — «السمتخدم {0} يتبع المستوي {1} و هو غير مسموح له بحفظ السجلات من النوع {2}» | Neither grid — this is the **User Level**, which comes from the licence and is checked before any profile row. A profile cannot grant past it. | See [Users and Login](/platform/security/users-and-login#User-Level). Moving the user to a level that covers the type is the only route, and the levels available are the ones your licence defines. |
| *Current User {0} Cannot Recommit Records, Please Review Security Profile Options* — «المستخدم الحالي لا يستطيع إعادة حفظ الملفات برجاء مراجعة إختيارات ملف الصلاحيات» | The **Allow Record Recommiting** switch — one of the four reprocessing switches that are on by default but [hidden from the screen](#Fields-Hidden-on-Purpose). It has been turned off for this role. | Have someone whose profile keeps it do the recommit, or show the field again and tick it. |
| *Current User {0} Cannot Rereplicate Records, Please Review Security Profile Options* — «المستخدم الحالي لا يستطيع إعادة مزامنة الملفات برجاء مراجعة إختيارات ملف الصلاحيات» | The **Allow ReReplicate Record** switch, hidden in the same way. | As above. |
| *{0} can not be deleted because current user dos not have the authority for deleting drafts* — «لا يمكن حذف {0} لأن المستخدم الحالى لا يملك صلاحية حذف المسودات» | Deleting a draft is its **own** authority, separate from Delete. Granting Delete does not grant it. | Tick the draft-delete authority on the row for that entity type. |
| *{0} can not be deleted because current user is not the creator of this draft* — «لا يمكن حذف {0} لأن المستخدم الحالى ليس هو منشئ المستند» · *You can not delete the record {0} because you did not create it* — «لا يمكنك حذف السجل {0} حيث أنك لست منشئ السجل» · *You can not edit the record {0} because you did not create it* — «لا يمكنك تعديل السجل {0} حيث أنك لست منشئ السجل» | The authority is granted, but only for the user's **own** records — see [Record-Level Security](/platform/security/record-level-security). | Widen the row beyond own-records, or add the user to *Treat Users as Creator* for the real creator. |

Remember that a profile change is picked up at the **next login**, so a user who has just been granted
an authority will keep seeing the same refusal until they sign in again.
