---
description: "How the Nama ERP licence works: where it lives, what it limits (modules, concurrent users, user levels, legal entities, POS machines), how to read it, and every reason a screen or field can be missing, in checking order."
---
# Licensing, and Why a Screen or Field Is Missing

Most "I can't see it" tickets have the same handful of causes: a customer who bought a module but cannot find its screens, a field that was added but never appears, a morning when nobody can log in, a user refused while colleagues work normally. The licence decides some of these outright, and the rest are settings that sit right next to it. This page covers the licence — where it lives, what it limits, how to read it — and then works through every reason a screen or a field can be missing, in the order worth checking them.

## Where the licence lives

The licence is not a record in the database and is not edited from any screen. It is issued by Namasoft's licence servers for your installation — the customer name in [`nama.properties`](/getting-started/nama-properties) identifies you — and the application server keeps a copy of it next to its own files.

A new server gets its licence from the installer: **Request Key** asks Namasoft's servers for a key and waits for it to be approved (see the [installation guide](/getting-started/installation-guide)). After that the server keeps its copy up to date on its own, as long as it can reach the internet.

Restoring the database on another server does not carry the licence with it. The licence belongs to the server, not the data, and a new server requests its own key.

## What the licence controls

| What | What you see when it runs out |
|---|---|
| **Modules and sub-modules** | A module that is not licensed has no menu entries and its screens cannot be opened. Module pages on this site open with a *Required licence* box naming the code — for example [CRM](/modules/crm/crm-overview). |
| **Users signed in at the same time** | The next login is refused until someone logs out. When the licence defines user levels, the count is kept for each level. |
| **User levels** | A user's **User Level (Licene User Group)** field must name a level the licence contains, and a level can be limited to certain kinds of records — see [User Level](/platform/security/users-and-login#User-Level). |
| **Mobile-app users** | When the licence has a mobile-user count, only users with **Allow Login From Apps** ticked may sign in from the apps, and no more users than the count may have it ticked. |
| **Legal entities** | Active legal entities beyond the licensed count are refused. Inactive and composite legal entities do not count. |
| **POS machines** | Active POS **Register** records beyond the licensed count are refused. Captain Order sub-registers have a count of their own. Inactive registers do not count. |
| **Magento sites** | Active Magento sites beyond the licensed count are refused. |

The limit on users signed in at the same time is the licence's. Inside it, you can set tighter limits of your own for groups of users with a **Users Counter** record — see [Users Counter and Capability Types](/admin/users-counter-and-security-capabilities).

## Reading your licence

Open the user menu at the top right and choose **About Nama ERP**. Next to the version and build date it shows:

- **Licence Details** — the summary Namasoft's licence server holds for your installation.
- **Customer Support End Date** — when your support contract ends.

Both are fetched live from Namasoft, so a server with no internet access shows *Could not connect* instead.

## When the licence changes

When Namasoft extends your licence, what you have to do depends on what was added.

**A sub-module of a module you already run, or more users, sites or machines.** The installed release already contains the screens; the server only has to read the new licence. Open **Utilities** and run **Reload Configuration** — or restart the application server, which reads the licence as it starts. Either way the server needs internet access at that moment.

**A new main module.** A release carries only the modules you were licensed for when it was installed, so the new module's screens are not on the server at all yet. Reloading the configuration will not make them appear: [upgrade the installation](/getting-started/installation-guide#Upgrading-Nama-ERP) first.

**If the new screens still do not appear in the menu,** the screens and menu have to be rebuilt. Run **Regenerate UI** from Utilities, or **Regenerate Screens** from any [Screen Modifier](/platform/screen-modifier/screen-modifier-overview#Making-your-changes-take-effect). Then have users reload the browser page.

::: warning Regenerating the screens rebuilds the shipped menu
**Regenerate UI** and **Regenerate Screens** empty the shipped `default` menu and build it again from scratch. Anything edited directly on that menu is lost — see [why you must not edit the shipped menu](/platform/menus/menu-update#Why-you-must-not-edit-the-shipped-menu). A menu kept as a Menu Update survives.
:::

::: tip Opening Utilities
**Utilities** is offered only to the `admin` user and to users with **Treat As Admin** ticked (on the user screen it reads *Allow Access to Admin Restricted Functionality*). Type *Utilities* in the search bar at the top of the screen to open it.
:::

## The server has to reach the internet

The server checks in with Namasoft's licence servers regularly. If it cannot, nothing happens at first. After about two weeks without a successful check, every save shows a warning. After about 25 days, the system stops accepting any request until the server connects again. Opening the firewall to the internet is the whole fix; nothing needs to be reinstalled.

## Licence and support contract are two different dates

The licence decides whether the system runs. The support contract decides whether Namasoft supports it. When the support contract is close to ending, an orange **Support Will Expire On** badge appears in the top bar with the date and the time remaining; once it has passed, a red **Support Expired On** badge replaces it. The system keeps working — but a support request raised from inside Nama is refused. Users with **Do Not Display Critical Errors To This User** ticked do not see either badge.

## Switching screens and features off for a company

A licence says what the installation *may* use. A company often uses less, and a screen full of lot, serial and size-and-colour fields is noise to a business that tracks none of them. Two grids take the unused parts out of sight:

- **Unused Entities** — screens to hide.
- **Unused Features** — features to hide: every field, grid, button and screen that belongs to the feature goes with it.

Both grids appear on the **Legal Entity** screen and on the **Configuration Group** screen (*Administration → Settings → Configuration Group*). A legal entity follows its own grids plus those of the configuration group it names. There is only one configuration group (`default`) and every company names it, so a line there applies to every company at once — see [System Settings and Configuration Group](/admin/system-settings-and-configuration-group).

What gets hidden:

- **A hidden screen** disappears from the menu and from the search bar — and so does **every reference field that points at it**, on every other screen. Hiding the Contracting Project screen, for example, hides every Contracting Project field in the system.
- **A hidden feature** removes the fields, grid columns, buttons, menu groups and screens tagged with it.

Which company counts is the one on the **user record**, not the one picked at sign-in: a user whose legal entity is PUBLIC follows their **Default Legal Entity**. The lists are read at sign-in, so a change reaches a user the next time they sign in.

The features you can switch off:

| Feature | Arabic label | What it hides |
|---|---|---|
| Lot | تواريخ صلاحية | Lot and expiry-date fields on items and stock documents |
| Serial Numbers / Two Serials | أرقام مسلسلة / رقمان مسلسلان | Serial-number fields, and the second serial |
| Size and Color | لون و مقاس | Size and colour fields |
| Revisions | إصدارات | Item revision fields |
| Second Unit | الوحدة الثانية | The second quantity and unit |
| Multi Units | وحدات متعددة | Alternative units of measure |
| Measures / Third Measure / Measures of Shape | أبعاد / بعد ثالث / أبعاد الأشكال | Length, width, height and shape measures |
| Sub Items | الأصناف الفرعية | Sub-item fields |
| Location | موقع مخزني | Warehouse locator fields |
| Packaging | التعبئة | Packaging fields |
| Item Classes | تصنيفات الأصناف | Item class fields |
| Item Autocoding | تكويد آلى للأصناف | Automatic item coding |
| Discount 1 … Discount 8 | خصم 1 … خصم 8 | The additional discount columns, one by one |
| Tax | الضرائب | Sales-tax fields on documents, and the Tax Plan screen |
| Reservation | الحجز | Stock reservation |
| Freights | Freights | Freight fields on supply-chain documents |
| retest Date | تاريخ إعادة الاختبار | Retest dates on lots |
| Active and Inactive Percentage | النسبة الفعالة والغير فعالة | Active and inactive percentage fields |
| Issue Date | تاريخ التحرير | The issue-date field on documents |
| Two / Three / Four Year Budget | موازنة السنتان / الثلاث سنوات / الأربع سنوات | Multi-year budget columns |
| Gulf HR | الموارد البشرية للخليج | Gulf-specific HR screens and fields |
| Detailed RV,PV documents | سندات صرف وقبض تفصيلية | The **Detailed Voucher** option on receipt and payment document terms, and the per-line currency, amount and rate it unlocks on receipt and payment documents |
| Create Assets In Disposal | إنشاء اصول في سندات التخلص | Creating assets from a disposal document |
| cars | سيارات | Car fields on service-centre execution orders |
| Instant Chat | المحادثات اللحظية | The in-app chat |
| Payment Gateway | Payment Gateway | Payment terminals and payment-method groups |

The **Feature** picker lists only the features of the modules installed on your server.

## Why can't I see screen X?

Work down this list; the first match is almost always the answer.

1. **Has the user reloaded the page since the change?** The menu is built at sign-in. Reload before anything else.
2. **Is the module licensed?** A whole branch of the menu missing points here. Check **Licence Details** under **About Nama ERP**.
3. **Is the module installed?** A newly licensed main module needs an upgrade, not a reload — see [When the licence changes](#When-the-licence-changes).
4. **Were the screens regenerated after the licence change or upgrade?** If not, run **Regenerate UI**.
5. **Is the screen in the company's Unused Entities, or does it belong to one of its Unused Features?** Check the legal entity on the user record and its configuration group.
6. **Is the user on a menu that has the entry at all?** A user, a security profile or a legal entity can each name a menu of its own, and a custom menu may simply not contain the screen — see [who sees which menu](/platform/menus/menu-visibility).
7. **May the user open it?** No list-view permission, or a **Menu Allow/Block** line on their [security profile](/platform/security/security-profiles), hides the entry for that person only.

A screen reached but refused on save with *The user {0} level ({1}) does not include the entity type {2}* is a different matter: the screen is visible, and the user's licence level does not cover it.

## Why can't I see field Y?

1. **Has the user reloaded the page?** Screens are cached in the browser too.
2. **Was the screen rebuilt after the change?** A Screen Modifier does nothing until the screens are regenerated — run **Regenerate GUI For Applicable Types Only** on the modifier. After an upgrade that adds fields, run **Regenerate UI**.
3. **Is the modifier active, and aimed at the right screen?** Only activated modifiers apply; a modifier with a higher priority can remove what yours added; and a modifier marked for mobile devices or for the quick creator does not change the desktop screen — see [Screen Modifier](/platform/screen-modifier/screen-modifier-overview).
4. **Does the company have its own layout?** A layout saved as `dbdefault`, or as a company's own `<company code>default`, replaces the standard screen, so a change made to the standard one does not show there.
5. **Does the field belong to an Unused Feature,** or point at a screen in **Unused Entities** or in a module that is not licensed? Then it is hidden on purpose, and **a Screen Modifier cannot bring it back**: the feature is checked before the modifier is applied. Remove the line from **Unused Features** on the user's legal entity or on the Configuration Group, then have the user sign in again — see [above](#Switching-screens-and-features-off-for-a-company). A common case is the **Detailed Voucher** option on receipt and payment terms, which belongs to **Detailed RV,PV documents**. To find the feature a field belongs to, look the field up in the [data model](https://dm.namasoft.com/features.html): each feature-dependent field carries a badge naming its feature. On a cloud server the company's licence can also switch a feature off; that needs a change to the licence.
6. **Is it hidden by security?** The **Field Settings** page of the security profile hides fields, and **Page Security** hides whole tabs — see [field, page and list-view security](/platform/security/field-page-listview-security).
7. **Is it a dimension field?** A dimension switched off in the [Global Configuration](/platform/global-config/global-config-dimensions) is not shown anywhere.

## Messages you may see

Only the support-contract and POS messages have an Arabic translation; the others appear in English in both languages. The concurrent-user and legal-entity messages raised at login are listed under [Licence, users and login](/platform/documents-and-records/messages-and-refusals#Licence-users-and-login).

| Message | Why | What to do |
|---|---|---|
| *Your server needs to be connected to the internet - a lot of time has passed since last licence verification occurred* | A warning on saves: the server has not reached Namasoft's licence servers for about two weeks. | Give the server internet access before the grace period ends. |
| *Invalid Licence - Your server needs to be connected to the internet - too much time has passed since last licence verification occurred* | The grace period has ended; every request is refused. | Give the server internet access. |
| *Invalid Licence - No Licence is defined* | The server has no licence yet — typically a new server whose key was never requested. | Request a key from the installer. |
| *Your licence includes {0} mobile users, but you have defined {1} mobile users* | Saving a user would tick **Allow Login From Apps** on more users than the licence allows. | Untick it on a user who no longer uses the apps, or extend the licence. |
| *The user {0} is not allowed to login from mobile apps, please contact your administrator to change this setting* | The licence counts mobile users and this user does not have **Allow Login From Apps**. | Tick it on the user, within the licensed count. |
| *The legal entity count is {0} in your licence and you have {1} active entities* | Saving a legal entity would make more active legal entities than the licence allows. | Deactivate one you no longer use, or extend the licence. |
| *Cannot save, available count of registers is {0}* — «لا يمكن الحفظ , عدد الماكينات لا يمكن ان يتخطي {0}» | Saving this register would make more active POS registers than the licence allows. | Deactivate a register that is no longer used, or extend the licence. |
| *Cannot save, available count of sub-registers is {0}* — «لا يمكن الحفظ , عدد الماكينات الفرعية الخاصة بكابتن أوردر لا يمكن ان يتخطي {0}» | The same, for Captain Order sub-registers. | The same. |
| *Your licence has {0} magento sites, you are trying to create {1} active sites* | Saving this Magento site would exceed the licensed count. | Deactivate a site, or extend the licence. |
| *Support contract for customer {0} expired on {1}* — «عقد الدعم الفني للعميل {0} انتهي في تاريخ {1}» | A support request was raised after the support contract ended. | Renew the support contract with Namasoft. |
