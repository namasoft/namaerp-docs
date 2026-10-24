---
entities: [ConfigEntry]
menu: Administration → Settings → System Settings
---

# Appearance

How the system looks and how users move around it: what opens at startup, what the login page shows, which fonts and colours are used, and how popups and tooltips behave.

![Appearance tab](../../ar/platform/global-config/images/gc-appearance-en.png)

## Startup and navigation

**Start Always By New Gui** `value.info.startAlwaysByNewGui` *(default on)* — Web sessions open the modern interface rather than the legacy one.

**Always Use New GUI (Prevent Use Old GUI)** `value.info.alwaysUseNewGUI` — The option above only decides where a session *starts*; a user who knows the legacy interface's own address can still open it. Turn this on and that door closes: any attempt to load a legacy screen is redirected to the modern one. This is the setting to reach for once an installation has finished migrating — while both interfaces are reachable, a few users keep working in the old one and report problems that were fixed months ago in the new. Leave it off while any workflow still genuinely needs the legacy screens. The server can also block the old interface on its own through the `disable-old-ui` property, so if the old screens stay unreachable with this option off, look there.

**Start With New GUI on Mobile and Tablet Devices** `value.info.startInMobileByNewGui` *(default on)* — The same decision for mobile browsers.

**Use Detailed Grids In Mobile** `value.info.useDetailedGridsInMobile` *(default on)* — Mobile shows full grids instead of the compact card layout. Detailed grids carry more information; cards are easier to tap. Choose by what your mobile users actually do — reviewing figures wants grids, capturing a few fields wants cards.

**Fix Menu As Side Bar** `value.info.fixMenuAsSideBar` — Pins the main menu open as a sidebar instead of letting it collapse. Good on wide screens where users navigate constantly.

**Master Files Default Menu Item Behavior** `value.info.mfDefaultMenuItemBehavior` — What happens when a user picks a master file from the menu: **List View** opens the list of existing records, **New Record** opens a blank one. List View suits reference data people look things up in; New Record suits files that are mostly created.

**Document Files Default Menu Item Behavior** `value.info.docDefaultMenuItemBehavior` — The same for document menu items. Data-entry heavy installations often set documents to New Record and master files to List View.

Both of those settings are read while the menu is being built, not while it is being used, so changing one has no effect on the menu that already exists — see [how the menu is put together](/platform/menus/menu-structure).

**Go To Screen Where Record Was Created When Opening It** `value.info.shouldRedirectEditView` — When a record has a custom edit view defined, opening it redirects there instead of showing the standard screen.

**Show Old Print Barcode Option in More Menu** `value.info.showOldBarcodeMenu` — Keeps the legacy barcode menu visible. Only needed where an older barcode workflow is still in use.

**Default System Theme** `value.info.defaultSystemTheme` — The built-in theme a user starts on until they pick one of their own: Pink, Navy, Teal, Green and so on. It applies to every user and every new browser, and never overrides a theme someone has chosen. A custom theme marked as the default takes precedence over it. Every option is shown in light and dark mode on [Themes](/platform/everyday-tools/ui-themes).

## Login page and background

**Company Name For Login Page** `value.info.companyNameForLoginPage` — The name shown on the login screen.

**Use Background Image** `value.info.useBackgroundImage` and **Background Image** `backgroundImage` — Whether to show a background picture, and the picture itself.

**First Priority** through **Seventh Priority** `value.info.firstPriority` … `value.info.seventhPriority` — A background image can be defined at seven levels: global configuration, legal entity, sector, branch, department, analysis set, and the individual user. These seven slots put those levels in order, and the system uses the first one that actually has an image. Put **User** first if you want people to personalise their own background but fall back to the company image when they haven't; put **Legal Entity** first in a group of companies where each subsidiary must show its own branding.

## Fonts

**Font Name** / **Font Size** / **Font Color** `value.info.fontInfo.fontName`, `...fontSize`, `...fontColor` — The main interface font.

**Disabled Font Name** / **Disabled Font Size** / **Disabled Font Color** `value.info.fontInfo.disabledFontName`, `...disabledFontSize`, `...disabledFontColor` — How disabled fields are rendered. Worth setting deliberately: users need to tell at a glance that a field is read-only, and a grey that is too light reads as "broken" rather than "locked".

**Menu Font Name** / **Menu Font Size** / **Menu Font Color** `value.info.fontInfo.menuFontName`, `...menuFontSize`, `...menuFontColor` — The menu font.

## Grid colours and styles

Nama uses colour to carry meaning inside grids. These settings decide what each meaning looks like.

**Grid Level 1 Color** / **Grid Level 2 Color** / **Grid Level 3 Color** `value.info.gridLevel1Color`, `...gridLevel2Color`, `...gridLevel3Color` — Row colours for the three nesting levels of a detail grid, so a reader can see at a glance which lines belong to which parent.

**Free Line Color** `value.info.freeLineColor` — Lines carrying free items.

**Slave Line Color** `value.info.slaveLineColor` — Lines generated as children of another line.

**Returned Item Color** `value.info.returnedItemColor` — Lines that have been returned.

**Sent Line Style** / **Invalid Sent Line Style** `value.info.sentLineStyle`, `value.info.inValidSentLineStyle` — Lines already sent to an external system, and those whose send failed validation. Choose two clearly different colours: telling "sent" from "sent but rejected" at a glance is the whole point.

**Allow Text Wrap In Grids** / **Allow Text Wrap In List Views** `value.info.allowTextWrapInGrids`, `value.info.allowTextWrapInListViews` — Lets cell text wrap onto more than one line instead of being cut off. More readable, but fewer rows fit on screen.

**Lines Count In Grids** `value.info.linesCountInGrids` — The default number of rows per grid page.

**Legacy UI Extra Styles** `value.info.legacyUIExtraStyles` — Additional styling applied in the legacy interface, for installations that need a specific look there.

::: tip Colour and icons for one record type or one field
Everything above paints the whole system the same way. When the meaning you want to signal is narrower — an icon on the Sales Invoice menu entry, a colour on the *Customer* field, or a different icon for each value of a status — set it in [Fields and Entities Settings](/platform/fields-and-entities-settings/fields-settings-field-icons), which also lets you give each icon a light-mode and a dark-mode colour so it stays legible in both themes.
:::

## Popups and editors

**Hide Select Column In Selector Popup** `value.info.hideSelectColumnInSelectorPopup` — Removes the selection column from the record-picker popup.

**Hide Count Column In Selector Popup** `value.info.hideCountColumnInSelectorPopup` — Removes the count column from the same popup. Both trim a picker that users find crowded.

**Always Use Text Area In Serial Popup** `value.info.alwaysUseTextAreaInSerialPopup` — Serial entry always uses a multi-line box, which suits pasting a long list of scanned serials.

**Do Not Use Descriptors In Fields** `value.info.doNotUseDescriptorsInFields` — Reference fields show only code and name rather than the longer descriptor text. Turn it on where descriptors are so long they push the useful part of the field off screen.

**Use New Rich Text Editor** `value.info.useKendoRichEditor` — Rich-text fields use the Kendo editor.

**Create DMS Doc In Pop Up Window** `value.info.createDMSDocInPopUpWindow` *(default on)* — The **Create Archive** action opens the new [archived document](/platform/dms/dms-documents.md) in a popup instead of navigating away, so the user does not lose the record they were working on.

## Tooltips

**Tooltip Position** `value.info.tooltipPosition` — Whether quick help appears above or below the field.

**Pin Tool Tip** `value.info.pinToolTip` — Keeps the tooltip open instead of fading, which helps while users are still learning a screen.

## Settings on this tab

Every field on this tab with its exact on-screen label in both languages, so you can find a setting by the name you see. The last column points to the section that explains it.

| Field id | English label | Arabic label | Meaning |
|---|---|---|---|
| `value.info.startAlwaysByNewGui` | Start Always By New Gui | البدء دائما بال GUI الجديد | [Startup and navigation](#Startup-and-navigation) |
| `value.info.alwaysUseNewGUI` | Always Use New GUI (Prevent Use Old GUI) | استخدام الGUI الجديد دائماً (يمنع الوصول إلى الGUI القديم) | [Startup and navigation](#Startup-and-navigation) |
| `value.info.startInMobileByNewGui` | Start With New GUI on Mobile and Tablet Devices | البدء بال GUI الجديد في الأجهزة المحمولة و اللوحية | [Startup and navigation](#Startup-and-navigation) |
| `value.info.useDetailedGridsInMobile` | Use Detailed Grids In Mobile | استعمال الجداول التفصيليه بشكل افتراضي في الموبايل | [Startup and navigation](#Startup-and-navigation) |
| `value.info.fixMenuAsSideBar` | Fix Menu As Side Bar | تثبيت القائمة دائما | [Startup and navigation](#Startup-and-navigation) |
| `value.info.mfDefaultMenuItemBehavior` | Master Files Default Menu Item Behavior | طريقة عرض الملفات عند اختيارها من القائمة | [Startup and navigation](#Startup-and-navigation) |
| `value.info.docDefaultMenuItemBehavior` | Document Files Default Menu Item Behavior | طريقة عرض المستندات عند اختيارها من القائمة | [Startup and navigation](#Startup-and-navigation) |
| `value.info.shouldRedirectEditView` | Go To Screen Where Record Was Created When Opening It | الذهاب الى الشاشة التى تم إنشاء السجل فيها عند فتحة | [Startup and navigation](#Startup-and-navigation) |
| `value.info.showOldBarcodeMenu` | Show Old Print Barcode Option in More Menu | عرض اوبشن طباعة الباركود القديم في قائمة المزيد | [Startup and navigation](#Startup-and-navigation) |
| `value.info.defaultSystemTheme` | Default System Theme | ثيم النظام الافتراضي | [Startup and navigation](#Startup-and-navigation) |
| `value.info.companyNameForLoginPage` | Company Name For Login Page | اسم الشركة (للعرض عند تسجيل الدخول ) | [Login page and background](#Login-page-and-background) |
| `value.info.useBackgroundImage` | Use Background Image | تعين خلفية | [Login page and background](#Login-page-and-background) |
| `backgroundImage` | Background Image | صورة الخلفية | [Login page and background](#Login-page-and-background) |
| `value.info.firstPriority` | First Priority | الاولوية 1 | [Login page and background](#Login-page-and-background) |
| `value.info.secondPriority` | Second Priority | الاولوية 2 | [Login page and background](#Login-page-and-background) |
| `value.info.thirdPriority` | Third Priority | الاولوية 3 | [Login page and background](#Login-page-and-background) |
| `value.info.fourthPriority` | Fourth Priority | الاولوية 4 | [Login page and background](#Login-page-and-background) |
| `value.info.fifthPriority` | Fifth Priority | الاولوية 5 | [Login page and background](#Login-page-and-background) |
| `value.info.sixthPriority` | Sixth Priority | الاولوية 6 | [Login page and background](#Login-page-and-background) |
| `value.info.seventhPriority` | Seventh Priority | الاولوية 7 | [Login page and background](#Login-page-and-background) |
| `value.info.fontInfo.fontName` | Font Name | اسم الخط | [Fonts](#Fonts) |
| `value.info.fontInfo.fontSize` | Font Size | حجم الخط | [Fonts](#Fonts) |
| `value.info.fontInfo.fontColor` | Font Color | لون الخط | [Fonts](#Fonts) |
| `value.info.fontInfo.disabledFontName` | Disabled Font Name | اسم خط الحقل الغير قابل للتعديل | [Fonts](#Fonts) |
| `value.info.fontInfo.disabledFontSize` | Disabled Font Size | حجم خط الحقل الغير قابل للتعديل | [Fonts](#Fonts) |
| `value.info.fontInfo.disabledFontColor` | Disabled Font Color | لون خط الحقل الغير قابل للتعديل | [Fonts](#Fonts) |
| `value.info.fontInfo.menuFontName` | Menu Font Name | اسم خط القوائم | [Fonts](#Fonts) |
| `value.info.fontInfo.menuFontSize` | Menu Font Size | حجم خط القوائم | [Fonts](#Fonts) |
| `value.info.fontInfo.menuFontColor` | Menu Font Color | لون خط القوائم | [Fonts](#Fonts) |
| `value.info.gridLevel1Color` | Grid Level 1 Color | لون المستوي الأول للتفاصيل | [Grid colours and styles](#Grid-colours-and-styles) |
| `value.info.gridLevel2Color` | Grid Level 2 Color | لون المستوي الثاني للتفاصيل | [Grid colours and styles](#Grid-colours-and-styles) |
| `value.info.gridLevel3Color` | Grid Level 3 Color | لون المستوي الثالث للتفاصيل | [Grid colours and styles](#Grid-colours-and-styles) |
| `value.info.freeLineColor` | Free Line Color | لون السطر المجاني | [Grid colours and styles](#Grid-colours-and-styles) |
| `value.info.slaveLineColor` | Slave Line Color | لون السطر التابع | [Grid colours and styles](#Grid-colours-and-styles) |
| `value.info.returnedItemColor` | Returned Item Color | لون الصنف المرتجع | [Grid colours and styles](#Grid-colours-and-styles) |
| `value.info.sentLineStyle` | Sent Line Style | لون السطور المرسلة | [Grid colours and styles](#Grid-colours-and-styles) |
| `value.info.inValidSentLineStyle` | Invalid Sent Line Style | لون السطور المرشلة بشكل غير صحيح | [Grid colours and styles](#Grid-colours-and-styles) |
| `value.info.allowTextWrapInGrids` | Allow Text Wrap In Grids | السماح بالتفاف النص في الجداول | [Grid colours and styles](#Grid-colours-and-styles) |
| `value.info.allowTextWrapInListViews` | Allow Text Wrap In List Views | السماح بالتفاف النص في جداول القوائم | [Grid colours and styles](#Grid-colours-and-styles) |
| `value.info.linesCountInGrids` | Lines Count In Grids | عدد السطور في الجدوال | [Grid colours and styles](#Grid-colours-and-styles) |
| `value.info.legacyUIExtraStyles` | Legacy UI Extra Styles | Legacy UI Extra Styles | [Grid colours and styles](#Grid-colours-and-styles) |
| `value.info.hideSelectColumnInSelectorPopup` | Hide Select Column In Selector Popup | إخفاء عمود اختيار السطر في قوائم الاختيار | [Popups and editors](#Popups-and-editors) |
| `value.info.hideCountColumnInSelectorPopup` | Hide Count Column In Selector Popup | إخفاء عمود عدد مرات الإدارج في قوائم الاختيار | [Popups and editors](#Popups-and-editors) |
| `value.info.alwaysUseTextAreaInSerialPopup` | Always Use Text Area In Serial Popup | Always Use Text Area In Serial Popup | [Popups and editors](#Popups-and-editors) |
| `value.info.doNotUseDescriptorsInFields` | Do Not Use Descriptors In Fields | عدم استعمال الوصف في الحقول | [Popups and editors](#Popups-and-editors) |
| `value.info.useKendoRichEditor` | Use New Rich Text Editor | استعمال محرر النصوص الجديد | [Popups and editors](#Popups-and-editors) |
| `value.info.createDMSDocInPopUpWindow` | Create DMS Doc In Pop Up Window | إنشاء المستند الارشيفي في شاشة منبثقة | [Popups and editors](#Popups-and-editors) |
| `value.info.tooltipPosition` | Tooltip Position | موضع المساعدة السريعة | [Tooltips](#Tooltips) |
| `value.info.pinToolTip` | Pin Tool Tip | تثبيت المساعدة السريعة | [Tooltips](#Tooltips) |
