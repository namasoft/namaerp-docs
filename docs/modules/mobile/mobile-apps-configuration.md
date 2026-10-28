---
description: "Option-by-option reference for the Mobile Apps Configurations screen, tab by tab: general app options, the per-document grid, NAMA ESS attendance rules, stock taking, receipts, NAMA SCM, the KAS shopping app with its Shopping Mobile Application Configuration records, NAMA ORDERS and Mobile Delivery."
entities: [ConfigEntry, ShoppingMobAppConfig, MobileAppAction]
menu: Basic → Mobile Apps → Mobile Apps Configurations
---

# Mobile Apps Configurations — Option Reference

This page explains every option on the **Mobile Apps Configurations** screen, the settings record that controls how Nama's mobile apps behave. The phone itself holds little more than the server address and the printer. Which book a document is saved in, whether a receipt can be typed in the browser, how far from the customer a rep may issue an invoice, and how a delivery driver's documents are numbered are all decided here, once, for the whole database.

Open it from **Basic → Mobile Apps → Mobile Apps Configurations**, the last item of that menu folder. The screen has eight tabs. The first holds what every app shares. Each of the others belongs to one app: NAMA ESS, the Stock Taking app, the Receipts app, NAMA SCM, the KAS shopping app, NAMA ORDERS and the Mobile Delivery app. The sections below follow the tabs in the order they appear on screen. Each table gives the option's label, its field id (the name to search for in a support ticket or an import file), and what it changes.

::: info Several apps, one screen
**Nama Mobile** is the main app today (see the [overview](./mobile-application-guide.md)). The other tabs serve older or specialised apps that are still installed at some customers: the NAMA ESS employee app, the Android Stock Taking, Receipts and Orders apps, NAMA SCM, the KAS shopping app and the Mobile Delivery app. Where an option is read by only one of them, the table says so. An option that only an app you don't use reads can be left alone.
:::

## When a change reaches the phone

Most options on the first two tabs are sent to Nama Mobile **when the user logs in**, and the app works from that copy. After you change one, the user sees it after logging in again or pressing **Reload app data** in the app's settings. If **Use Web Sockets** is ticked, the app is told about the change and logs in again by itself.

The rest are applied by the server **while it handles a request**: the books a document is saved in, the criteria that decide which records are sent, and every refusal. Those take effect on the user's next save or list.

## Aggregated Mobile Application Configuration

The first tab (إعدادات التطبيق المُجمع) holds the options every app shares, then a set of grids that tune individual screens.

### General options

| Option (Arabic / English) | Field id | What it does |
|---|---|---|
| عدم إظهار المستندات المرسلة لنما / **Do Not Show Documents Sent To Nama** | `value.doNotShowDocsSentToNama` | Hides from the app's on-phone lists of saved documents those already sent to the server, so only the unsent ones remain. |
| **copyScheduleLinesWithFromDocToReceiptDoc** (no label) | `value.copyScheduleLinesWithFromDocToReceiptDoc` | For an electronic receipt in Nama Mobile that copies from a document with instalments. Ticked: the instalments land in the receipt's instalment-payment lines. Unticked: they land in its schedule lines. The screen shows the raw field id because the option has no translation. |
| مطالعة نموذج الطباعة قبل طباعة المستند فى التطبيق / **Preview Printing Form Before Printing Document** | `value.reviewPrintingFormBeforePrintingDocument` | Shows a preview of the printed form before it goes to the printer. |
| طباعة المستندات مع الحفظ دائما / **Print Documents On Save** | `value.printDocumentsOnSave` | Prints the document as soon as it is saved in the app, instead of just closing the screen. Applies to electronic receipts, stock issues and receipts, stock transfers and sales returns. |
| عدم زيادة كمية السطر الموجود عند اختيار الصنف من الهيدر / **Do Not Increment Quantity With Header Item** | `value.doNotIncrementQtyWithHeaderItem` | Normally, scanning an item that is already on the document adds to that line's quantity. Ticked, every scan makes a new line. |
| السماح بتعديل السطور المجانية / **Allow Editing Free Lines** | `value.allowEditFreeLines` | On sales lines in the app, lines marked as free are read-only unless this is ticked. Ticked, the user can edit them and change the free tick. |
| تحديد سطور مردود المبيعات فى التطبيق / **Custom Sales Return Lines In Mobile App** | `value.customSalesReturnLines` | Changes the app's sales return screen. Copying from an invoice no longer brings in all its lines. They become a pick list, and the user adds only the items actually returned. An item that is not on the source document is refused. |
| عدم تحديث أسعار وخصومات الأصناف المنسوخة من بناءا على فى مردود المبيعات / **Do Not Update Prices And Discounts Copied From Doc In Sales Return** | `value.doNotUpdatePricesAndDiscountsCopiedFromDocInSalesReturn` | For a sales return copied from a document. Ticked: each line keeps the source document's price and discounts. Unticked: the app fetches the item's current selling price. |
| نوع طابعة الموبايل / **Mobile Printer Type** | `value.mobilePrinterType` | Forces the printer the app prints with. Empty leaves the printer chosen in the app's own printer settings. Only **Old SDK**, **New SDK**, **Bluetooth** and **External Bluetooth** are applied as chosen. Any other choice prints as a normal printer, so for the other printers leave this empty and pick the printer on the phone. |
| إظهار رقم الشحنة وتاريخ الصلاحية فى سطور التطبيق / **Show LotId And Expire Date In Mobile App Lines** | `value.showLotIdAndExpireDateInMobileAppLines` | Shows the lot number and expiry date on sales lines and on electronic stock taking lines. |
| عدد خانات الكسر فى أسعار التطبيق / **Fraction Decimal Places In Mobile App** | `value.fractionDecimalPlacesInMobileApp` | How many decimal places a sales line's total is rounded to in the app. Empty or 0 means 3. |
| اقصى مسافة مسموحة للفاتورة بالنسبة لموقع العميل / **Allowance Distance For Customer Invoice** | `value.allowanceDistanceForCustomerInvoice` | The furthest, in metres, the user may be from the customer's map location when saving a sales or stock document. Further away, the save is blocked and a map shows both points. Empty or 0 switches the check off. Customers without a map location are never checked. |
| طريقة الدفع الافتراضية / **Default Payment Method** | `value.defaultPaymentMethod` | The payment method the app proposes on sales documents. Once a customer is chosen, the app adds a payment line for the whole total with this method. |
| **Default Payment Method Expression** | `value.defaultPaymentMethodExpression` | Picks the payment method from the document instead, for example from a field on the customer. When it gives a method, that method wins over **Default Payment Method**. |
| دفتر سند تعريف هاتف مستخدم / **User Mobile Identifier Document Book** | `value.mobileIdentifierDocumentBook` | The book used when a user registers their phone from the app. A book on a matching line of the documents grid below takes priority. See [Binding users to their phones](./mobile-device-binding.md). |
| تأكيد الحضور والانصراف الإلكترونى بالبصمة / **Use Biometrics Authorization For Electronic Attendance** | `value.useBiometricsAuthorizationForElecAttendance` | Asks for a fingerprint or face scan (or the phone's PIN when it has neither) before each check-in or check-out. A phone with no lock at all cannot check in. |
| إظهار زر الحفظ كمسودة فى التطبيق / **Show Save As Draft Button In Mobile** | `value.showSaveAsDraftInMobile` | Shows a **Save as draft** button on the app's sales and stock documents, and keeps those drafts editable. It also switches on the per-document **Auto Save Doc As Draft** timer in the grid below. In the current app it also decides whether the "could not find any record" box appears when a typed or scanned code matches nothing. |
| إظهار المستندات المحفوظة كمسودة فى التطبيق / **Show Draft Documents In Mobile** | `value.showDraftDocsInMobile` | Lists the app downloads normally hold saved records only. Ticked, drafts are included too. Lookups inside a field are not affected. |
| منع إنشاء سند زيارة جديد فى حالة وجود سند غير مغلق / **Prevent Create New Visit If There are One Open** | `value.preventNewCRMVisitIfThereAreOpenOne` | A sales rep with visits still open cannot start a new one. The app tells them how many visits are open. |
| خيارات الحضور و الإنصراف / **Attendance Options** | `value.attendanceOptions` | Which actions the attendance screen offers: **Attending Only** (check-out is recorded as forgotten), **Leaving Only** (check-in is recorded as forgotten) or **Attending And Leaving**. Empty means Attending And Leaving. |
| **Use Web Sockets** | `value.useWebSockets` | Keeps a live connection between the app and the server. When this configuration changes, the app logs in again by itself and picks up the new settings. |
| رمز إعدادات الموبايل / **Mobile Settings Pin** | `value.mobileSettingsPin` | When filled, the app's Settings screen asks for this PIN before it opens. The app checks it with the server each time, so with no connection Settings does not open. Empty leaves Settings open to everyone. |
| تعطيل تسجيل الدخول بالبصمة في الموبايل / **Disable Biometric Login In Mobile** | `value.disableBiometricLoginInMobile` | By default, reopening the app with a saved login asks for a fingerprint or face scan. Ticking this skips that step. |
| **Mobile Request Timeout In Seconds** | `value.mobileRequestTimeOutInSeconds` | How long the app waits for the server on each request before giving up. Empty or 0 means 60 seconds. Raise it for slow connections or heavy lists. |
| الحد الأقصى لعدد أسطر التفاصيل في الموبايل / **Mobile Details Max Length** | `value.mobileDetailsMaxLength` | The most lines one document may have in the app. Adding one more shows *Lines limit reached (N) You must create a new document.* Empty or 0 means 500. |
| ملحوظة سند التوصيل الافتراضية / **Default Delivery Note** | `value.defaultDeliveryNote` | Text put in the remarks of a new delivery document in the app, unless the document already has remarks. |

### Documents Or Files Creation Configurations

The **Documents Or Files Creation Configurations** grid (إعدادات إنشاء مستندات وملفات من التطبيقات, `value.docOrFileConfigList`) is the heart of the screen. It has one line per app screen, and more when a screen should behave differently for some devices, users or dimensions. A line says which ERP record the screen creates, with which book and term, and carries that screen's options.

How a line is chosen depends on the request. Saving an attendance, a vacation, a permission or an electronic receipt takes the first line, top to bottom, whose **Mobile Entity Type** matches, whose **Device Code** is empty or equals the device code set in the app, and whose **For Type** is empty or equals the receipt type chosen. Other screens (saving, lists, prices) match on **Mobile Entity Type**, the user's login **dimensions**, **Apply To** and **Apply To Matched User Profile**, and take the first line that fits. They do not look at **Device Code** or **For Type**. When no line fits, the screen saves its own record type with no book or term.

| Column (Arabic / English) | Field id | What it does |
|---|---|---|
| نوع السجل في التطبيق / **Mobile Entity Type** | `value.docOrFileConfigList.mobileEntityType` | Required. The app screen the line is for: sales invoice, attendance, electronic receipt and so on. |
| النوع / **Entity Type** | `value.docOrFileConfigList.entityType` | The ERP record the screen creates, lists and edits, for example sales invoices from the sales order screen. It must be one of the types allowed for that screen. |
| الدفتر / **Book** | `value.docOrFileConfigList.book` | The book of records saved from the app. A new document also takes the book's legal entity and its branch, sector, department and analysis set. |
| توجيه المستند / **Term** | `value.docOrFileConfigList.term` | The توجيه of records saved from the app. Its tax plan is also used when the app asks for item prices. |
| للنوع / **For Type** | `value.docOrFileConfigList.forType` | Electronic receipt lines only. Picks the line by the receipt type the collector chooses, so cash and cheques can go to different books. It must be one of the **Receipt Types** on the Receipts tab. |
| مجموعة / **Master Group** | `value.docOrFileConfigList.masterGroup` | For master files created in the app, such as a customer: the group given to a record that has none. |
| السماح بالتعديل من التطبيق / **Allow Edit From Mobile** | `value.docOrFileConfigList.allowEditFromMobile` | Lets users open and change a record that was already sent from the app. Without it, sent records open read-only. |
| الحفظ كمسودة / **Save As Draft** | `value.docOrFileConfigList.saveAsDraft` | Records from this screen always reach the ERP as drafts, even when the user presses a normal save. |
| إضافة سطر جديد تلقائيا وجعل الكمية واحد / **Auto Add New Line And Set Quantity To One** | `value.docOrFileConfigList.autoAddNewLineAndSetQtyToOne` | A scanned or chosen item is added straight to the document with quantity 1, instead of opening the line screen. |
| التأكد من معرف الجهاز قبل الحفظ / **Check Mobile Identifier Document Before Save** | `value.docOrFileConfigList.checkMobileIdentifierBeforeSave` | Refuses a save from a phone that has no accepted User Mobile Identifier Document for the user. See [Binding users to their phones](./mobile-device-binding.md). |
| طباعة السجلات كتقرير / **Print Record As Report** | `value.docOrFileConfigList.printRecordAsReport` | The app prints this screen's records through an ERP report run on the server, instead of the HTML formula. |
| حفظ المستند كمسودة كل (بالثانية) / **Auto Save Doc As Draft Every (In Seconds)** | `value.docOrFileConfigList.autoSaveDocAsDraftInSeconds` | While an unsaved document is open, the app saves it as a draft every so many seconds if it changed. Needs **Show Save As Draft Button In Mobile**. Empty or 0 switches it off. |
| تعريف التقرير / **Report Definition** | `value.docOrFileConfigList.reportDefinition` | The report used by **Print Record As Report** when no printer-specific form below suits the phone's printer. |
| نسخ التفاصيل من بناءا علي / **Copy Details From Doc** | `value.docOrFileConfigList.copyDetailsFromDoc` | On stock issue, receipt, transfer, transfer request and purchase invoice screens: picking a source document copies its lines straight in. Unticked, the user scans or searches the lines, with the source document as a reference. |
| **Old SDK Printer Form** | `value.docOrFileConfigList.oldSdkFormDefinition` | The report used for **Print Record As Report** on phones set to the old SDK printer. |
| **New SDK Printer Form** | `value.docOrFileConfigList.newSdkFormDefinition` | The same for the new SDK printer. |
| **Bluetooth Printer Form** | `value.docOrFileConfigList.bluetoothSdkFormDefinition` | The same for Bluetooth and the other printers. |
| تطبق علي / **Apply To** | `value.docOrFileConfigList.applyTo` | Narrows the line to one employee, user, employee group, security profile, master group, or the employees or users matching a criteria. |
| تطبق عند توافق ملف المستخدم مع الاستعلام / **Apply To Matched User Profile** | `value.docOrFileConfigList.applyToMatchedUserProfile` | A query on the user record. The line applies only to users it matches. Ignored when **Apply To** is filled. |
| الشركة / **Legal Entity**, الفرع / **Branch**, القطاع / **Sector**, الإدارة / **Department**, المجموعة التحليلية / **Analysis set** | `value.docOrFileConfigList.dimensions.legalEntity`, `.branch`, `.sector`, `.department`, `.analysisSet` | Narrow the line to users logged in with these dimensions. Empty means any. |
| **Object HTML Print Formula** | `value.docOrFileConfigList.objectHTMLFormula` | The HTML template one record of this screen is printed with on the phone's printer. |
| **List HTML Print Formula** | `value.docOrFileConfigList.listHTMLFormula` | The template for printing a list of records from the list screen. |
| السماح بالحفظ بدون إنترنت / **Allow Save Offline** | `value.docOrFileConfigList.allowSaveOffline` | If sending a record fails because the server turns down the app's login, the app keeps the record on the phone as unsent and sends it later. Other failures are not kept. |
| كود الجهاز / **Device Code** | `value.docOrFileConfigList.deviceCode` | Narrows the line to phones whose app settings carry this device code. Empty means any phone. |

::: warning Some options are per screen, not per line
**Allow Edit From Mobile**, **Copy Details From Doc**, **Auto Add New Line**, **Allow Save Offline** and **Print Record As Report** reach the app per screen. When any line of a screen has one ticked, it is on for every user and device on that screen. The two HTML formulas come from the **last** line of the screen, even when that line leaves them empty. Keep these options the same on every line of a screen.
:::

### Online Read For Savable Types In Mobile

The app keeps a copy of some master files on the phone, such as customers, items and warehouses, and its pick lists search that copy. For a type listed in the **Online Read For Savable Types In Mobile** grid (الأنواع المقروءة من النظام مباشرة, `value.onlineReadForSavableTypesInMobile`), the pick lists search the server live instead. Use it when the list is too large to keep on the phone or changes too often. Its one column, **Entity Type** (`value.onlineReadForSavableTypesInMobile.entityType`), offers customer, currency, unit, warehouse, locator, sales price list, item, vacation type, loan type, leave reason, machine, maintenance notice and order, and CRM lead, project and potential.

### Allowed values for fields in the app's screens

Two grids narrow what the user can enter in a field.

**Allowed Values For Reference Fields In Mobile Screens** (القيم المسموح بها لحقول المراجع فى شاشات تطبيق الموبايل, `value.allowedFieldsInMobileScreens`) concerns fields that can point to several kinds of record, such as *Related To* or *From Doc*. It decides which kinds the user may pick.

| Column (Arabic / English) | Field id | What it does |
|---|---|---|
| النوع / **Entity Type** | `value.allowedFieldsInMobileScreens.entityType` | The ERP screen the field is on, for example CRM visit or sales return. |
| الحقل / **On Field** | `value.allowedFieldsInMobileScreens.fieldId` | The field. When two lines name the same screen and field, the first wins. |
| القيمة المسموح بها 1 … 10 / **Allowed Value 1** … **10** | `value.allowedFieldsInMobileScreens.allowedValue1` … `allowedValue10` | The kinds of record offered. The first is selected by default. With none filled, the app's own default applies. |

**Allowed Values For Text Fields In Mobile Screens** (القيم المسموح بها للحقول النصية فى شاشات تطبيق الموبايل, `value.allowedValuesForTextFields`) turns a free-text field into a drop-down of fixed values, or into a link.

| Column (Arabic / English) | Field id | What it does |
|---|---|---|
| النوع / **Entity Type** | `value.allowedValuesForTextFields.entityType` | The **app** screen the field is on (not the ERP screen, unlike the grid above). |
| الحقل / **On Field** | `value.allowedValuesForTextFields.fieldId` | The text field. Write `details.` before the name for a field on the lines, for example `details.text1`. |
| رابط / **Is Link** | `value.allowedValuesForTextFields.isLink` | Shows the field read-only with a button that opens its value, a web address, in the browser. The allowed values are then ignored. |
| القيمة المسموح بها 1 … 10 / **Allowed Value 1** … **10** | `value.allowedValuesForTextFields.allowedValue1` … `allowedValue10` | The choices of the drop-down, in this order. With none filled, the field stays free text. |

### Mobile Sort Configuration

By default the app lists the most recently changed records first. The **Mobile Sort Configuration** grid (إعدادات الترتيب بالتطبيق, `value.mobileSortConfigLines`) changes the order of a screen's list or of a field's pick list. The first matching line wins.

| Column (Arabic / English) | Field id | What it does |
|---|---|---|
| نوع السجل في التطبيق / **Mobile Entity Type** | `value.mobileSortConfigLines.mobileEntityType` | The app screen. Required for a list line. On a field line, empty applies the line to that field on every screen. |
| يطبق على / **Apply On** | `value.mobileSortConfigLines.sortApplyOn` | Required. **List View** sorts the screen's own list. **Field** sorts the pick list opened from a field. |
| الحقل / **On Field** | `value.mobileSortConfigLines.fieldId` | The field whose pick list is sorted. Required for **Field** lines, and must be empty on **List View** lines. |
| ترتيب حسب / **Sort By Field** | `value.mobileSortConfigLines.sortByField` | Required. The field to sort by. |
| ترتيب تصاعدي / **Sort Ascending** | `value.mobileSortConfigLines.sortAsc` | Ticked sorts ascending. Unticked, the default, sorts descending. |

### Mobile App Error Log

Below the sort grid, the tab lists the **Mobile App Error Log**: the saves from the app that the server refused, with the error. When a user reports that a document "would not send", look here first.

### Mobile Report Configurations

The **Mobile Report Configurations** grid (إعدادات تقارير التطبيقات, `value.mobileReportLines`) lists the reports on Nama Mobile's Reports screen. The user fills the report's parameters in the app, and the file is produced on the server.

| Column (Arabic / English) | Field id | What it does |
|---|---|---|
| تعريف التقرير / **Report Definition** | `value.mobileReportLines.reportDefinition` | The report that runs. Every line needs one: a line without it breaks the whole Reports screen. |
| عنوان التقرير عربى / **Report Arabic Title** | `value.mobileReportLines.reportArabicTitle` | The title shown when the app is in Arabic. |
| عنوان التقرير إنجليزى / **Report English Title** | `value.mobileReportLines.reportEnglishTitle` | The title shown in English. |
| **URL Prefix** | `value.mobileReportLines.urlPrefix` | A short key that identifies the report, also used as the downloaded file's name. Fill it on every line, keep it unique and without spaces, and do not reuse a prefix from the KAS **Reports** grid, which would win. |
| الصيغة / **Output Format** | `value.mobileReportLines.outputFormat` | The file format. Empty means PDF. |

### Extra Fields Filter Lines

The **Extra Fields Filter Lines** grid (فلترة الحقول الإضافية, `value.extraFieldsFilterLines`) adds a criteria to the pick list of one field on one app screen. When several lines match, the records must meet all of them. It does not filter the screen's own list. The **Mobile App Fields Extra Filter** screen does a similar job; see [Shaping the app's screens](./mobile-screen-customisation.md).

| Column (Arabic / English) | Field id | What it does |
|---|---|---|
| نوع السجل في التطبيق / **Mobile Entity Type** | `value.extraFieldsFilterLines.mobileEntityType` | Required. The app screen the field is on. |
| معرف الحقل في الهاتف / **Mobile Field ID** | `value.extraFieldsFilterLines.mobileFieldID` | Required. The field whose pick list is filtered, for example `fromDoc`. |
| المعايير / **Criteria** | `value.extraFieldsFilterLines.criteriaDefinition` | Required. The criteria the offered records must meet. |

### App bar items

The **Mobile AppBar Items Config** group (إعدادات عرض عناصر شريط الشاشة الرئيسية للتطبيق) appears on this tab and again on the NAMA ESS tab. Both show the same four fields.

| Option (Arabic / English) | Field id | What it does |
|---|---|---|
| العنصر الأول / **AppBar Item 1** | `value.appBarItem1` | The first tab of the NAMA ESS app's bottom bar. Default: Attendance. |
| العنصر الثاني / **AppBar Item 2** | `value.appBarItem2` | The second tab. Default: Vacation. |
| العنصر الثالث / **AppBar Item 3** | `value.appBarItem3` | The third tab. Empty by default. |
| العنصر الرابع / **AppBar Item 4** | `value.appBarItem4` | The fourth tab. Empty by default. |

Fill either two items or four. Saving with one or three is refused with *Only two or four items can be displayed!* The NAMA ESS app understands only **Attendance**, **Vacation**, **Dashboard** and **Permission**, and leaves out any other choice. Nama Mobile's bottom bar is fixed (Home, Menu, Approvals, Chats, More), so these fields do not change it. Its home page and menu are set with a [menu definition](./mobile-application-guide.md#Customizing-the-home-screen-and-the-menu) instead.

## NAMA ESS App Configurations

The second tab (إعدادات تطبيق NAMA ESS) holds the rules for employee self-service: electronic attendance, vacation requests and permission requests. Nama Mobile and the older NAMA ESS app both read it. Where only the NAMA ESS app reads an option, the table says so. The app side is described in [Employee Self-Service](./mobile-hr-self-service.md).

### Electronic Attendance Configurations

| Option (Arabic / English) | Field id | What it does |
|---|---|---|
| عدم السماح بإنشاء سند حضور/إنصراف إلكنروني إلا من خلال التطبيق / **Only Allow Creation Of Electronic Attendance Through Application** | `value.onlyAllowCreationOfElecAttendanceThroughApp` | Ticked by default. An electronic attendance can be saved only from the mobile app. A save from the browser is refused. Administrators, replication and saves made by an approval are never refused. |
| السماح بتعديل مستند "حضور الإلكتروني" لمن له الصلاحية / **Only Allow Update Of Electronic Attendance For Authorized** | `value.onlyAllowUpdateOfElecAttendanceForAuthorized` | Matters only while the box above is ticked. Ticked, an attendance that was already saved once can be edited from the browser by any user with the normal edit right on the screen. New attendance must still come from the app. |
| عدد الساعات المسموح بها قبل منع تسجيل الانصراف من خلال التطبيق / **Number Of Hours Allowed Before Preventing CheckOut** | `value.numberOfHoursAllowedBeforePreventingCheckOut` | The most hours allowed between check-in and check-out. Default 24, and empty or 0 also means 24. An older check-in is no longer offered for check-out in the app, and saving an attendance longer than this is refused. A non-zero value on the employee's attendance shift overrides this field. |
| تنبيه رمز التحقق / **Verification Code Notification** | `value.verificationCodeNotification` | A notification definition used for a second login step. On every app login the server makes a one-time code and sends it to the user with this notification. Only the NAMA ESS app asks for the code. Empty means no code step. |
| استخدام مناطق الحضور الإلكتروني / **Use Electronic Attendance Zone** | `value.useAttendanceZones` | Switches on location zones. Each check-in and check-out records the nearest allowed zone and the distance from it. One with no allowed zone for the employee is refused. The zones themselves are defined on the attendance zone screens, and saving an allowed zone is refused while this box is off. |
| منع حفظ الحضور الإلكتروني إذا كان الحضور أو الانصراف خارج النطاق / **Prevent Save If Attendance Out Of Zone** | `value.preventSaveIfAttendanceOutOfZone` | Needs zones switched on. Refuses a check-in or check-out made further from the nearest zone than that zone allows. Unticked, it saves and is only flagged as out of zone. |
| يجب أن تكون منطقة الحضور نفس منطقة الإنصراف / **Check Out Zone Must Be Same As Check In Zone** | `value.checkOutZoneMustBeSameAsCheckIn` | Needs zones switched on. Refuses a check-out made in a different zone from the check-in. |
| السماح بحفظ سند حضور وانصراف الكتروني على تطبيق الهاتف بدون اتصال بالإنترنت / **Allow Save Electronic Attendance On Mobile Without Connection** | `value.allowSaveElectronicAttendanceOnMobileWithoutConnection` | NAMA ESS app only. If sending an attendance fails because the server turns down the app's login, the app keeps it on the phone and sends it later. In Nama Mobile, offline saving is set per document with **Allow Save Offline** in the documents grid. |
| التأكد من معرف الجهاز قبل الحفظ / **Check Mobile Identifier Document Before Save** | `value.checkMobileIdentifierBeforeSave` | The general phone check for attendance, vacations and permissions saved from the NAMA ESS app. A line for the document in the documents grid overrides it. See [Binding users to their phones](./mobile-device-binding.md#Switching-the-check-on). |
| إخفاء لوحة معلومات الحضور بالتطبيق / **Hide Mobile Attendance Dashboard** | `value.hideMobileAttendanceDashboard` | Hides the monthly attendance summary card on Nama Mobile's home page. |
| معايير عرض عملاء المهام في تطبيق NAMA ESS / **List Attendance Customers Criteria For ESS App** | `value.listAttendanceCustomersCriteria` | NAMA ESS app only. Limits the customers the app downloads, so an attendance can be linked to one of them. Empty sends every customer the user can see. |
| منع إرسال عملاء المهام في تطبيق NAMA ESS / **Prevent Send Attendance Customers For ESS App** | `value.preventListAttendanceCustomers` | NAMA ESS app only. Sends no customers at all. The criteria above are then ignored. |
| معايير عرض خيط بيع المهام في تطبيق NAMA ESS / **List Attendance Leads Criteria For ESS App** | `value.listAttendanceLeadsCriteria` | The same for CRM leads. |
| منع إرسال خيط بيع المهام في تطبيق NAMA ESS / **Prevent Send Attendance Leads For ESS App** | `value.preventListAttendanceLeads` | Sends no leads. |
| معايير عرض فرص المهام في تطبيق NAMA ESS / **List Attendance Potentials Criteria For ESS App** | `value.listAttendancePotentialsCriteria` | The same for CRM potentials. |
| منع إرسال فرص المهام في تطبيق NAMA ESS / **Prevent Send Attendance Potentials For ESS App** | `value.preventListAttendancePotentials` | Sends no potentials. |
| معايير عرض مشاريع المهام في تطبيق NAMA ESS / **List Attendance Projects Criteria For ESS App** | `value.listAttendanceProjectsCriteria` | The same for CRM projects. |
| منع إرسال مشاريع المهام في تطبيق NAMA ESS / **Prevent Send Attendance Projects For ESS App** | `value.preventListAttendanceProjects` | Sends no projects. |

### Mobile Attendance Summary Configuration

The attendance summary card on Nama Mobile's home page always shows ten figures for the month. Each is normally calculated from the employee's daily attendance. The **Mobile Attendance Summary Configuration** grid (`value.attendanceSummaryConfigLines`) lets you replace that calculation for one figure, for the employees you choose.

| Column (Arabic / English) | Field id | What it does |
|---|---|---|
| المؤشر / **Indicator** | `value.attendanceSummaryConfigLines.indictor` | The figure this line replaces: Overtime, Late Time, Holiday, Absence, Vacation, Mission, Weekend, Worked Hours, Required Hours or Permission. Required. |
| معيار ملف الموظف / **Employee Criteria Definition** | `value.attendanceSummaryConfigLines.empCriteriaDefinition` | The employees the line applies to. Others keep the normal figure. Empty means every employee. |
| الاستعلام / **Query** | `value.attendanceSummaryConfigLines.query` | An SQL query that returns one number, shown as the figure. It can use the employee and the period: `{employeeId}`, `{fromDate}` and `{toDate}`. Empty keeps the normal calculation. |

### Vacation and permission requests

| Option (Arabic / English) | Field id | What it does |
|---|---|---|
| عدم السماح بإنشاء طلب اجازة إلا من خلال التطبيق / **Only Allow Creation Of Vacation Request Through Application** | `value.onlyAllowCreationOfElecVacationReqThroughApp` | A vacation request can be saved only from the app, with the same exceptions as attendance. A vacation document is not covered. |
| السماح بتعديل مستند "طلب اجازة الإلكتروني" لمن له الصلاحية / **Only Allow Update Of Electronic Vacation Request For Authorized** | `value.onlyAllowUpdateOfElecVacationReqForAuthorized` | Lets a vacation request that was already saved be edited from the browser by users with the normal edit right. |
| عدم السماح بإنشاء طلب إذن إلا من خلال التطبيق / **Only Allow Creation Of Permission Request Through Application** | `value.onlyAllowCreationOfElecPermissionReqThroughApp` | A leave permission request can be saved only from the app. The leave permission document itself is not covered. |
| السماح بتعديل مستند "طلب إذن الإلكتروني" لمن له الصلاحية / **Only Allow Update Of Electronic permission request For Authorized** | `value.onlyAllowUpdateOfElecPermissionReqForAuthorized` | Lets a permission request that was already saved be edited from the browser by users with the normal edit right. |

The **Mobile AppBar Items Config** group repeats here. See [App bar items](#App-bar-items) above.

## Stock Taking App Configurations

The third tab (إعدادات تطبيق الجرد المخزني) controls electronic stock taking. Part of it is read by the older Android Stock Taking app and part by Nama Mobile, as the table says. The counting itself is described in [Sales, Inventory & Item Inquiry](./mobile-sales-inventory.md).

| Option (Arabic / English) | Field id | What it does |
|---|---|---|
| عدم السماح بإنشاء جرد إلكنروني إلا من خلال التطبيق / **Only Allow Creation Of Electronic Stocktaking Through Application** | `value.onlyAllowCreationOfElecStockTakingThroughApp` | Ticked by default. An electronic stock taking can be saved only from the app. Administrators, replication and saves made by an approval are exempt. |
| السماح بتعديل مستند "جرد الإلكتروني" لمن له الصلاحية / **Only Allow Update Of Electronic Stock Taking For Authorized** | `value.onlyAllowUpdateOfElecStockTakingForAuthorized` | Matters only while the box above is ticked. Ticked, a stock taking that was already saved can be edited from the browser by users with the normal edit right. |
| ماسك كود الصنف / **Item Regular Expression** | `value.itemRegEx` | A pattern every scanned or typed item code must match. Empty means no check. Nama Mobile accepts a code when the pattern matches any part of it, so write `^…$` to require the whole code to match. |
| رسالة خطأ كود الصنف / **Item Regular Expression Error MSG** | `value.itemRegExErrorMSG` | The message shown under the item code when it does not match the pattern. |
| عدم السماح بتكرار الصنف / **Do Not Allow Item Repetition** | `value.doNotAllowItemRepetition` | Android Stock Taking app only. The same item cannot be added twice to one count. |
| عدم السماح بعرض الكمية / **Do Not Show Quantity** | `value.doNotShowQty` | Android Stock Taking app only. Hides the quantity, so each scan adds a line with quantity 1. |
| منع تعديل لون ومقاس الصنف في الجرد الإلكتروني / **Prevent Editing Item Color And Size In Electronic Taking** | `value.preventEditingItemColorAndSizeInElectronicTaking` | Nama Mobile. On a stock taking line, colour, size and the three text fields become read-only. They still come from the scanned item or barcode. |
| منع تغيير وحدة الصنف في الجرد عند استخدام البار كود / **Prevent Change Item Unit In Stock Taking When Using Barcode** | `value.preventChangeItemUnitInStockTakingWhenUsingBarcode` | Nama Mobile. A line added by scanning a barcode keeps the barcode's unit. Lines entered by item code can still change unit. |
| أنواع الجرد المسموح بها / **Taking Type Allowed Values** | `value.takingTypeAllowedValues` | The taking types, one per line, for example *Annual* and *Spot*. The Android app offers them as a list, and every **Taking Document Type** in the grid below must be one of them. |

### Electronic StockTaking Books Configurations

The **Electronic StockTaking Books Configurations** grid (`value.elecStockTakingBooks`) is used by the Android Stock Taking app. It decides which book and term a count is saved with, and what kind of document it becomes. The server takes the first line whose taking type is empty or equals the count's. When none matches, it takes the first line whose device is empty or equals the phone's. With no lines at all, the count is saved as an electronic stock taking with no book.

| Column (Arabic / English) | Field id | What it does |
|---|---|---|
| الدفتر / **Book** | `value.elecStockTakingBooks.book` | The book of the document made. It must belong to the generated document type, and it gives the document its dimensions. |
| توجيه المستند / **Term** | `value.elecStockTakingBooks.term` | The توجيه of the document made. It must be of the same document type. |
| كود/اسم جهاز الجرد / **Device Code/Name** | `value.elecStockTakingBooks.deviceId` | The device the line belongs to. Empty means any device. It is checked only when no line matched on the taking type. |
| نوع مستند الجرد / **Taking Document Type** | `value.elecStockTakingBooks.takingDocType` | The taking type the line is for. Empty means any. |
| نوع المستندات / **Generated Document Type** | `value.elecStockTakingBooks.generatedDocType` | What the count becomes: sales invoice, purchase invoice, stock transfer, receipt or issue stock transfer, or electronic stock taking (the default when empty). The count's warehouse, items and quantities are copied in, and descriptions 1 to 3 receive the count's code, the device and the taking type. |

## Receipts App Configurations

The fourth tab (إعدادات تطبيق سندات القبض) controls electronic receipt vouchers taken in the field. Nama Mobile reads the logo, the receipt types and the bank list. The other options are read only by the older Android Receipts app.

| Option (Arabic / English) | Field id | What it does |
|---|---|---|
| عدم السماح بإنشاء قبض إلكنروني إلا من خلال التطبيق / **Only Allow Creation Of Electronic Receipt Through Application** | `value.onlyAllowCreationOfElecReceiptThroughApp` | Ticked by default. An electronic receipt voucher can be saved only from the app. Administrators, replication and saves made by an approval are exempt. |
| السماح بتعديل مستند "القبض الإلكتروني" لمن له الصلاحية / **Only Allow Update Of Electronic Receipt For Authorized** | `value.onlyAllowUpdateOfElecReceiptForAuthorized` | Matters only while the box above is ticked. Ticked, a receipt that was already saved can be edited from the browser by users with the normal edit right. |
| معايير عرض العملاء في تطبيق سندات القبض / **List Customers Criteria For Receipts App** | `value.listReceiptsCustomersCriteria` | Android Receipts app only. Limits the customers the app downloads. Empty sends them all. |
| **LegalEntity Logo** | `mobileLegalEntityLogo` | The company logo the apps download. Nama Mobile shows it in the side menu and on receipts, remarks and maintenance visits. The Android Receipts app prints it as `{companyLogo}`. |
| **Html Receipt Formula** | `value.mobileHtmlFormula` | Android Receipts app only. The HTML template one receipt is printed with. It can use `{receipt.code}` and the other receipt fields, `{customer}`, `{currency}`, `{createdAtDate}`, `{createdAtTime}`, `{userName}`, `{collector}`, `{companyLogo}`, `{customerSignature}` and `{salesmanSignature}`. The **Receipt Formula Example** button below the field replaces it with a short sample. |
| **Multi Receipt Html Formula** | `value.multiReceiptHtmlFormula` | Android Receipts app only. The template for printing several receipts as one summary. It can use `{docsCount}`, `{cashCount}`, `{totalCash}`, `{chequeCount}`, `{totalCheque}` and a `{loop(list)}…{endloop}` block that repeats per receipt. The **Multi Receipt Formula Example** button fills a sample. |
| حفظ سندات القبض الالكتروني كمسودة اذا حدث خطأ / **Save Electronic Receipts as Draft When Errors Happen** | `value.saveDocAsDraftIfErrorInReceiptsApp` | Android Receipts app only. A receipt that fails to save, for example on a validation error, is kept as a draft instead of being rejected. |
| عدم حفظ السند اذا لم يتم اختيار النوع / **Do Not Save If No Type Is Selected** | `value.doNotSaveIfNoTypeSelectedInReceiptsApp` | Android Receipts app only. The app will not save a receipt until a receipt type is chosen. |

### Default Login Settings

The **Default Login Settings** group (قيم إعدادات الدخول الافتراضية) fills the setup QR code the web interface shows under **Qr Info** in the user menu. Scanning it on the app's login screen saves typing.

| Option (Arabic / English) | Field id | What it does |
|---|---|---|
| عنوان السيرفر / **Server Url** | `value.serverUrl` | The server address put in the QR code. Empty uses the address the browser has open, which is wrong when users reach the server from outside by another address. |
| الايميل / **Default Email** | `value.defaultEmail` | The email put in the QR code. It fills the Email setting of the app being set up. |
| نسخة sdk الطباعه / **Default Printing Sdk Version** | `value.defaultPrintingSdkVersion` | Android Receipts app only. The printing mode put in the QR code: Old SDK Version, New SDK Version or Normal Print. |
| أنواع مستندات القبض (تكتب نصية بينهم ,) / **Receipt Types(Text Separated by ,)** | `value.receiptTypes` | The receipt types the apps offer, separated by commas, for example `Cash,Cheque,Transfer`. The chosen type is saved on the receipt. It is also the list of allowed **For Type** values for electronic receipt lines in the documents grid. Do not put spaces after the commas, or the types after the first are refused there. This field is not part of the QR code. |

### Electronic Receipt Vouchers Bank Accounts

The **Electronic Receipt Vouchers Bank Accounts** grid (`value.elecReceiptBanks`) lists the banks a collector can pick for a cheque or a transfer.

| Column (Arabic / English) | Field id | What it does |
|---|---|---|
| الاسم المختصر / **Short Name** | `value.elecReceiptBanks.shortName` | The name shown in the app. Keep it unique and without commas. |
| رقم حساب البنك / **Bank account** | `value.elecReceiptBanks.bankAccount` | The bank account recorded on the receipt when that short name is chosen. A receipt whose short name matches no line is saved with no bank account. |

## NAMA SCM App Configurations

The fifth tab (إعدادات تطبيق NAMA SCM) sets up item lookup: what the NAMA SCM app, and Nama Mobile's item details screen, show when a user looks up an item code.

| Option (Arabic / English) | Field id | What it does |
|---|---|---|
| السماح بإستخدام كاميرا الهاتف لمسح كود الصنف / **Allow Using Mobile Camera To Scan Item Code** | `value.allowUsingCameraToScanItemCode` | NAMA SCM app. Shows a camera button for scanning barcodes. Unticked, codes are typed or read by a hardware scanner. |
| استعلام الصنف / **Item Query** | `value.itemQuery` | An optional SQL query run for the looked-up item, for example to bring its price or stock. It can use `{item…}`, `{barcode}`, `{user…}` and `{dimensions…}`. Its columns are available to the templates below. Empty fills the templates from the item record directly. |
| النموذج الإنجليزي / **Item English Template** | `value.itemEnglishTemplate` | The template the lookup result is shown with when the app is in English. Empty uses the Arabic template. |
| النموذج العربي / **Item Arabic Template** | `value.itemArabicTemplate` | The same in Arabic. Empty uses the English template. |

## KAS App Configurations

The sixth tab (إعدادات تطبيق KAS) sets up the **KAS** shopping app, in which customers browse a catalogue by category and place orders. Its catalogue and ordering rules can differ by country.

### KAS Categories Configurations

The group at the top of the tab holds the settings for every country. The **shopping lines** grid under it repeats the same settings for a given country or set of dimensions (see the next section).

| Option (Arabic / English) | Field id | What it does |
|---|---|---|
| المستوي الاول / **Level One** | `value.config.levelOne` | The top level of the catalogue: item section or one of item classes 1 to 10. The app's first screen lists those records. |
| معيار عرض المستوي الاول / **Level One Criteria** | `value.config.levelOneCriteria` | Limits which level-one records are shown. Empty shows them all. |
| المستوي الثاني / **Level Two** | `value.config.levelTwo` | The second level, an item class deeper than level one. Empty goes straight from level one to the items. |
| معيار عرض المستوي الثاني / **Level Two Criteria** | `value.config.levelTwoCriteria` | Limits the level-two records. |
| المستوي الثالث / **Level Three** | `value.config.levelThree` | The third level, deeper than level two. Needs levels one and two. |
| معيار عرض المستوي الثالث / **Level Three Criteria** | `value.config.levelThreeCriteria` | Limits the level-three records. |
| معيار عرض الأصناف / **InvItem Criteria** | `value.config.itemsCriteria` | Limits which items the shop lists. Prices come from the normal sales price lists. |
| نوع طلب المبيعات المنشأ / **Order Entity Type** | `value.config.orderEntityType` | The document an order placed in the app becomes: sales order, sales quotation or sales quotation request. Type, book and term must be filled together. |
| دفتر طلب المبيعات المنشأ / **Order Book** | `value.config.orderBook` | The book of that document, which also gives its dimensions. Without it, placing an order fails with *Please contact administrator to config order book and term*. |
| توجيه طلب المبيعات المنشأ / **Order Term** | `value.config.orderTerm` | The توجيه of that document. The order is saved for the customer linked to the shopper's user. |
| **Mobile Application Action Group** | `value.config.mobileAppActionFileGroup` | The group, and so the code prefix, given to the record the app creates when someone registers or asks to reset their password. |
| دفتر اقتراح / شكوي / **Suggest / Complaint Book** | `value.config.suggestOrComplainBook` | The book of the CRM complaint created from the app's suggestion and complaint screen. |
| اسم المستخدم للمستخدمين الغير مسجلين / **Not Logged In Users User Name** | `value.config.notLoggedInUserName` | The guest account the server uses for everything done before a shopper logs in: browsing, prices, registering and complaints. It must have the Commit right on Mobile App Action. |
| كلمة المرور للمستخدمين الغير مسجلين / **Not Logged In Users Password** | `value.config.notLoggedInPassword` | That guest account's password. It must match the user's real password. |
| رقم التواصل / **Contact Phone** | `value.config.contactPhone` | The number the app's call button dials. |
| ارتفاع نموذج الصنف / **Item Card Height** | `value.config.itemCardHeight` | The height of the item and category cards in the app. Empty or 0 means 300. |
| **IOS Application Link** | `value.iosKASAppLink` | The App Store link the app's "share" and "rate" buttons use on iPhones. |
| **Andriod Application Link** | `value.androidKASAppLink` | The Google Play link for the same buttons on Android. |

### Shopping lines per country

The grid under the group (`value.shoppingLines`) holds one line per country, optionally narrowed by dimensions. On every request the server uses the first line that matches, and the group above only when no line does.

- **Country** (`value.shoppingLines.country`) must equal the country code the app sends, such as `EG` or `SA`. A line with no country matches every country. An unknown code is refused when you save.
- **Legal Entity**, **Branch**, **Department**, **Sector** and **Analysis set** (`value.shoppingLines.dimensions.legalEntity`, `.branch`, `.department`, `.sector`, `.analysisSet`), when filled, must equal the dimensions of the shopper's user, or of the guest account before login.
- The other columns (`value.shoppingLines.config.levelOne` through `value.shoppingLines.config.itemCardHeight`) are the same settings as the group above, with the same meanings.

::: warning A matching line replaces the whole group
The values of the matching line are not merged with the group above. A column left empty on the line stays empty: it does not fall back to the group. Fill every line completely, guest account and order book included. Put a catch-all line, with no country and no dimensions, last, because the lines below it are never reached.
:::

### Reports

The **Reports** grid (`value.reportLines`) lists the reports offered under "My Reports" in the KAS app. The same grid appears on the Mobile Delivery tab and feeds that app too.

| Column (Arabic / English) | Field id | What it does |
|---|---|---|
| تعريف التقرير / **Report Definition** | `value.reportLines.reportDefinition` | The report that runs. Every line needs one. |
| عنوان التقرير عربى / **Report Arabic Title** | `value.reportLines.reportArabicTitle` | The report's name when the app is in Arabic. |
| عنوان التقرير إنجليزى / **Report English Title** | `value.reportLines.reportEnglishTitle` | Its name when the app is in English. |
| **URL Prefix** | `value.reportLines.urlPrefix` | A short key that identifies the report in the link the app opens, also used as the downloaded file's name. It must be unique. Keep it in lower case with no spaces: the Mobile Delivery app lower-cases it before asking. |
| الصيغة / **Output Format** | `value.reportLines.outputFormat` | The file format the report is produced in. Empty means PDF. |
| كود المجموعة / **Group Code** | `value.reportLines.groupCode` | The report group, from the Report Groups grid on the Mobile Delivery tab, that the report is shown under in the Mobile Delivery app. The KAS app does not use it. |

### Branches

The **Branches** grid (`value.branchLines`) fills the app's "Contact us" screen with one card per branch. The app shows only the branches whose **Country** equals its own country code. A branch with no country is never shown.

| Column (Arabic / English) | Field id | What it does |
|---|---|---|
| الدولة / **Country** | `value.branchLines.country` | The country code the branch is shown for. |
| اسم الفرع / **Branch Name** | `value.branchLines.branchName` | The name on the card. |
| عنوان الفرع / **Branch Address** | `value.branchLines.branchAddress` | The address on the card. |
| تليفون الفرع / **Branch Phone** | `value.branchLines.branchPhone` | The phone number on the card. |
| لينك موقع الفرع / **Branch Location Link** | `value.branchLines.branchLocationLink` | The map link the card opens. |
| لينك فيسبوك / **Branch FaceBook Link** | `value.branchLines.branchFaceBookLink` | Adds a Facebook icon to the card. |
| لينك يوتيوب / **Branch Youtube Link** | `value.branchLines.branchYoutubeLink` | Adds a YouTube icon. |
| لينك واتساب / **Branch Whats App Link** | `value.branchLines.branchWhatsAppLink` | Adds a WhatsApp icon. |
| لينك تيليجرام / **Branch Telegram Link** | `value.branchLines.branchTelegramLink` | Adds a Telegram icon. |

### Shopping Mobile Application Configuration records

What the KAS app's home page shows, and which prices it quotes, come from a separate master file: **Shopping Mobile Application Configuration** (ملف إعدادات تطبيق التسوق), under **Administration → DashBoards**. You can keep several, for example one per country or one for wholesale customers.

When the app opens its home page, the server looks at the records whose **Country** equals the app's country code or is empty, lowest **Priority** first, and takes the first one that applies to the shopper's user. If none applies, the home page fails with *Cannot find ShoppingMobAppConfig file for this user*, which has no Arabic text.

| Field (Arabic / English) | Field id | What it does |
|---|---|---|
| الدولة / **Country** | `country` | The country code the record is for, chosen from the suggested list. Empty means every country. |
| **Currency Code** | `currencyCode` | The currency the app shows prices in. |
| الأولوية / **Priority** | `priority` | Required. Records are tried from the lowest priority up. |
| معيار المستخدم / **User Criteria** | `userCriteriaDef` | The record applies only to users matching this criteria. Empty means every user. |
| معيار الذمة المتعلقة للمستخدم / **Related Subsidiary Criteria** | `relatedSubsidCriteriaDef` | The record applies only when the user's related customer matches this criteria. A user with no related customer never matches a record that has it filled. |
| تستخدم لـ / **Used For** | `usedFor` | Narrows the record to one user, one security profile, or one user master group. Empty means everyone. |
| تصنيف الفاتورة / **Invoice Classification** | `invoiceClassification` | Used when pricing the items the app shows, the same way it is used on a sales invoice. |
| محدد سعر 1 to 5 / **Price Classifier 1** to **5** | `priceClassifier1` … `priceClassifier5` | The price classifiers used when pricing the items the app shows, so a record can quote a different price list. |

Three grids fill the home page. Each line has an **Item**, a picture, a **Description** and an **Inactive** tick that hides the line:

| Grid | Field ids | What it fills |
|---|---|---|
| **Banners** | `banners`, `banners.item`, `banners.banner`, `banners.description`, `banners.inActive` | The banners on the home page. |
| **New Arrivals** | `newArrivals`, `newArrivals.item`, `newArrivals.attachment`, `newArrivals.description`, `newArrivals.inActive` | The "new arrivals" strip. |
| **Slider Images** | `sliderImages`, `sliderImages.item`, `sliderImages.sliderImage`, `sliderImages.description`, `sliderImages.inActive` | The sliding pictures at the top. |

Tapping a line opens its item, priced with the record's classifiers.

## NAMA ORDERS Configurations

The seventh tab (إعدادات تطبيق NAMA ORDERS) serves the Android **Nama Orders** app, in which a rep writes orders that are later uploaded as ERP documents.

| Option (Arabic / English) | Field id | What it does |
|---|---|---|
| استيراد كـ / **Import As** | `value.ordersImportAs` | The document an uploaded order becomes: sales order, sales invoice, stock issue, stock receipt, stock transfer, stock transfer request, sales return request or sales return. A device line can override it. |
| الحفظ كمسودة / **Save As Draft** | `value.ordersSaveAsDraft` | Saves uploaded orders as drafts instead of committing them. Ticked here, it applies to every device. Unticked, each device line decides. |
| إنشاء عميل في حال عدم وجوده / **Generate Customer If Not Exist** | `value.ordersGenCustomerIfNotExist` | When an order names a customer that does not exist, creates one, coded by the order's mobile number and named after the order's customer name. Ticked here, it applies to every device. |
| معايير استقبال الأصناف / **Items Sending Criteria** | `value.ordersItemsSendingCriteria` | Limits the items downloaded to the phone. A device line's criteria takes priority. Empty sends them all. |
| معايير استقبال العملاء / **Customers Sending Criteria** | `value.ordersCustomersSendingCriteria` | The same for customers. |
| نسخ اسم الجهاز الي / **Copy Device Id To** | `value.ordersCopyDeviceIdTo` | A text field on the created document, such as a description, that receives the device name. Empty copies nothing. |
| نسخ كود المستند الي / **Copy Document Code To** | `value.ordersCopyDocCodeTo` | A text field that receives the code the app gave the order. |
| إضافة حقل دولة الشحن / **Add Customer Shipping Country** | `value.addCustomerShippingCountry` | Shows a Country box in the app's customer and shipping dialog. The value goes to the document's shipping address, and to a generated customer's. |
| إضافة حقل مدينة الشحن / **Add Customer Shipping City** | `value.addCustomerShippingCity` | The same for the city. |
| إضافة حقل محافظة الشحن / **Add Customer Shipping State** | `value.addCustomerShippingState` | The same for the state. |
| إضافة حقل منطقة الشحن / **Add Customer Shipping Area** | `value.addCustomerShippingArea` | The same for the area. |
| إضافة حقل شارع الشحن / **Add Customer Shipping Street** | `value.addCustomerShippingStreet` | The same for the street. |
| إضافة حقل عنوان الشحن / **Add Customer Shipping Address** | `value.addCustomerShippingAddress` | The same for the first address line. |
| إضافة حقل عنوان 1 الشحن / **Add Customer Shipping Address 1** | `value.addCustomerShippingAddress1` | The same for the second address line. |
| إضافة حقل توقيع العميل لتطبيق أوامر البيع / **Add Customer Signature To Orders App** | `value.addCustomerSignatureToOrdersApp` | Shows a customer signature button. The signature is attached to the document and can be printed as `{customerSignature}`. |
| إضافة حقل توقيع المندوب لتطبيق أوامر البيع / **Add Salesman Signature To Orders App** | `value.addSalesManSignatureToOrdersApp` | The same for the rep's signature, printed as `{salesmanSignature}`. |
| **Orders LegalEntity Logo** | `ordersLegalEntityLogo` | The logo printed as `{companyLogo}` on orders. |
| إضافة حقل وصف 1 / **Add Customer Description 1** | `value.addCustomerDescription1` | Shows a Description 1 box. The value goes to the document's description 1, and a generated customer's. |
| إضافة حقل وصف 2 / **Add Customer Description 2** | `value.addCustomerDescription2` | The same for description 2. |
| القيم المسموح بها لوصف 1 للعميل / **Customer Description 1 Allowed Values** | `value.customerDesc1AllowedValues` | A comma-separated list. When filled, Description 1 becomes a drop-down of these values. |
| القيم المسموح بها لوصف 2 للعميل / **Customer Description 2 Allowed Values** | `value.customerDesc2AllowedValues` | The same for description 2. |
| استعلام الصنف / **Item Query** | `value.ordersItemQuery` | An optional SQL query run when a barcode is scanned. Its columns feed the templates below. |
| النموذج العربي / **Item Arabic Template** | `value.ordersItemArabicTemplate` | The card shown after a scan when the app is in Arabic. Empty uses the English template. |
| النموذج الإنجليزي / **Item English Template** | `value.ordersItemEnglishTemplate` | The same in English. Empty uses the Arabic template. |
| **Html Order Formula** | `value.mobileOrderHtmlFormula` | The HTML template one order is printed with. It can use `{doc}`, `{customer}`, `{warehouse}`, `{locator}`, `{companyLogo}`, the two signatures and a `{loop(lines)}…{endloop}` block with the item code, name, quantity, lot and dates. The **Order Formula Example** button fills a sample. |
| **Html Multi Order Formula** | `value.multiOrderHtmlFormula` | The template for printing several orders at once, with `{docsCount}` and a `{loop(list)}…{endloop}` block. The **Multi Order Formula Example** button fills a sample. |

### Config Lines

The **Config Lines** grid (`value.ordersConfigLines`) holds one line per device. The server uses the first line whose **Device Code/Name** equals the device name typed on the app's login screen, or is empty, so put device lines above a catch-all line. **Book and term exist only here**: without a matching line an upload has no book and fails.

| Column (Arabic / English) | Field id | What it does |
|---|---|---|
| كود/اسم جهاز الجرد / **Device Code/Name** | `value.ordersConfigLines.deviceId` | The device name the line is for. Empty means any device. |
| الدفتر / **Book** | `value.ordersConfigLines.book` | The book of the documents from this device. It also gives their dimensions. |
| توجيه المستند / **Term** | `value.ordersConfigLines.term` | The توجيه of those documents. |
| المخزن الافتراضي / **Default Warehouse** | `value.ordersConfigLines.defaultWarehouse` | The warehouse put on the document, unless one is chosen in the app. Left empty on a matching line, the document gets no warehouse. |
| استيراد كـ / **Import As** | `value.ordersConfigLines.ordersImportAs` | Overrides the header's **Import As** when filled. |
| معايير استقبال العملاء / **Customers Sending Criteria** | `value.ordersConfigLines.ordersCustomersSendingCriteria` | Overrides the header's customers criteria when filled. |
| معايير استقبال الأصناف / **Items Sending Criteria** | `value.ordersConfigLines.ordersItemsSendingCriteria` | Overrides the header's items criteria when filled. |
| الحفظ كمسودة / **Save As Draft** | `value.ordersConfigLines.ordersSaveAsDraft` | Saves this device's orders as drafts. |
| إنشاء عميل في حال عدم وجوده / **Generate Customer If Not Exist** | `value.ordersConfigLines.ordersGenCustomerIfNotExist` | Creates missing customers for this device's orders. |
| الحقول المحسوبه للعميل / **Customers Calculated Fields** | `value.ordersConfigLines.ordersCustomerCalculatedFields` | Field assignments, written like the field values of an entity flow (for example `group = "G1"`), applied to a customer generated from this device's orders. |
| نسخ اسم الجهاز الي / **Copy Device Id To** | `value.ordersConfigLines.ordersCopyDeviceIdTo` | Overrides the header's field when filled. |
| نسخ كود المستند الي / **Copy Document Code To** | `value.ordersConfigLines.ordersCopyDocCodeTo` | Overrides the header's field when filled. |
| استعلام الصنف / **Item Query** | `value.ordersConfigLines.ordersItemQuery` | Overrides the header's scan query when filled. |
| النموذج العربي / **Item Arabic Template** | `value.ordersConfigLines.ordersItemArabicTemplate` | Overrides the header's Arabic template when filled. |
| النموذج الإنجليزي / **Item English Template** | `value.ordersConfigLines.ordersItemEnglishTemplate` | Overrides the header's English template when filled. |

## Mobile Delivery Configurations

The last tab (إعدادات تطبيق Mobile Delivery) serves the **Mobile Delivery** app, used by couriers and by the customers they deliver to. "Device code" below means the code the user types on that app's login screen.

| Option (Arabic / English) | Field id | What it does |
|---|---|---|
| عدد الأيام السابقة للبحث عن مستند حركة / **Previous Days Count To Limit Mob Deliver Document Search Period** | `value.previousDaysCountToLimitMobDeliveryDocSearchPeriod` | The courier's order list shows only delivery lines dated within this many days back. Empty or 0 means 3 days. |
| معايير استقبال الأصناف / **Items Sending Criteria** | `value.deliveryItemsSendingCriteria` | Limits the items the app offers when a customer requests items, places an order or returns expired goods. A matching delivery line's criteria takes priority. Empty offers every item. |
| مجموعة مهمة العمل / **Work Task File Group** | `value.deliveryConfig.workTaskFileGroup` | The group, and so the code prefix, of the work tasks the app creates. When empty, the first delivery line that has one is used. |

### Delivery Lines

| Column (Arabic / English) | Field id | What it does |
|---|---|---|
| كود/اسم جهاز الجرد / **Device Code/Name** | `value.deliveryLines.deviceId` | The device the line's item criteria apply to. Empty means any device. The first line whose device matches, or is empty, is used. |
| معايير استقبال الأصناف / **Items Sending Criteria** | `value.deliveryLines.deliveryItemsSendingCriteria` | The item criteria for that device. Empty falls back to the header's. |
| دفتر اقتراح / شكوي / **Suggest / Complaint Book** | `value.deliveryLines.config.suggestOrComplainBook` | The book of the CRM complaint created from the app's suggestion and complaint screen. The server takes the first line that has both this and the term below, whatever its device. |
| توجيه اقتراح / شكوي / **Suggest / Complaint Term** | `value.deliveryLines.config.suggestOrComplainTerm` | Must be filled for the line's complaint book to be used, but the complaint itself is created without a term. With no line holding both, the app gets *Can not find book and term for suggestion or complain* — «لا يمكن العثور على دفتر و توجيه للاقتراح أو الشكوى». |
| مجموعة مهمة العمل / **Work Task File Group** | `value.deliveryLines.config.workTaskFileGroup` | Used only when the header's **Work Task File Group** is empty. The first line that has one is used, whatever its device. |

### Book grids

Six grids decide the book and the term of each document the app creates. They share four columns:

- **Book** (الدفتر) — the book of the document, which also gives its dimensions and code prefix.
- **Device Code/Name** (كود/اسم جهاز الجرد) — the device the line is for. Empty means any device.
- **For Type** (للنوع) — normally left empty. When filled, it must be the document type the grid creates, exactly as listed below, or the line never matches.
- **Term** (توجيه المستند) — the توجيه of the document.

The server takes the first line whose device is empty or equal to the app's, and whose **For Type** is empty or equal to the document type. Book and term both come from that one line.

| Grid (Arabic / English) | Field ids | Document created | When no line matches |
|---|---|---|---|
| إعدادات دفاتر أوامر الشراء / **Mobile Item Request Configurations** | `value.deliveryItemRequestBooks` (`.book`, `.deviceId`, `.forType`, `.term`) | The item request a customer sends from the order screen. For Type: `ItemRequest`. | Refused: *Can not find book and term for Item Request* — «لا يمكن العثور على دفتر و توجيه لطلب صنف». |
| إعدادات دفاتر أوامر البيع / **Mobile Sales Order Configurations** | `value.deliverySalesOrderBooks` (same four) | The sales order a customer places. For Type: `SalesOrder`. | Refused with the same English *Item Request* message, «لا يمكن إيجاد دفتر و توجيه لطلب صنف» in Arabic. |
| إعدادات دفاتر سندات القبض / **Mobile Receipt Voucher Configurations** | `value.deliveryReceiptVoucherBooks` (same four) | The electronic receipt voucher a courier takes. For Type: `ElectronicReceiptVoucher`. | The voucher is left without a term and amount. Always keep a line here. |
| إعدادات دفاتر طلب مردود مبيعات / **Mobile Expired Sales Return Request Configurations** (the label repeats the next grid's) | `value.deliverySalesReturnReqBooks` (same four) | The sales return request a courier raises from an invoice. For Type: `SalesReturnRequest`. | No error. The document is created without the configured book. |
| إعدادات دفاتر طلب مردود أصناف منتهية الصلاحية / **Mobile Expired Sales Return Request Configurations** | `value.deliveryExpSalesReturnReqBooks` (same four) | The return request a customer raises for expired items. For Type: `SalesReturnRequest`. | Refused: *Can not find book and term for Expired Items Sales Return Request* — «لا يمكن العثور على دفتر و توجيه لأمر ارتجاع أصناف مبيعات منتهبة الصلاحية». |
| إعدادات دفاتر مردودات مبيعات / **Mobile Sales Return Configurations** | `value.deliverySalesReturnBooks` (same four) | The sales return a courier creates from an invoice dated within the last seven days. For Type: `SalesReturn`. | No error. The document is created without the configured book. |

Two grids on this tab carry the same English title, **Mobile Expired Sales Return Request Configurations**. The upper one (`value.deliverySalesReturnReqBooks`) is for ordinary sales return requests. Its Arabic title, «إعدادات دفاتر طلب مردود مبيعات», is the correct one. The group between them holds **Delivery Expired Products Sales Return Requests Criteria** (معايير استقبال طلبات مردودات الأصناف المنتهية الصلاحية, `value.deliveryExpProdSalesReturnCriteria`). It filters the customer's list of their own past expired-item return requests. Empty shows them all.

### Report groups and reports

| Grid / column (Arabic / English) | Field id | What it does |
|---|---|---|
| مجموعات تقارير / **Report Groups** | `value.reportGroupLines` | The report groups shown as cards on the customer's home screen in the Mobile Delivery app. |
| كود المجموعة / **Group Code** | `value.reportGroupLines.groupCode` | The code reports point to. Saving a report whose group code is not in this grid is refused. |
| **Arabic Name** | `value.reportGroupLines.arabicName` | The card's title in Arabic. |
| **English Name** | `value.reportGroupLines.englishName` | The card's title in English. |

The **Reports** grid below it is the same `value.reportLines` grid shown on the KAS tab. See [Reports](#Reports) there. In the Mobile Delivery app, give every report a **Group Code**, because a report with none does not appear under any card.

## Messages you may see

| Message | Why | What to do |
|---|---|---|
| *You can only save records of type {0} from the mobile application* — «يمكنك حفظ المستند من نوع {0} من خلال تطبيق الهاتف المحمول فقط» | An electronic attendance, vacation request, permission request, electronic stock taking or electronic receipt was saved from the browser while its **Only Allow Creation … Through Application** box is ticked. | Create it from the app. To let users correct saved ones in the browser, tick the matching **Only Allow Update … For Authorized** box. |
| *Total hours {0} for document {1} exceeded the maximum allowed hours {2}* — «إجمالي الساعات {0} للمستند {1} تجاوز الحد الأقصى المسموح به وهو {2}» | The check-out is further from the check-in than **Number Of Hours Allowed Before Preventing CheckOut**, or the hours set on the employee's shift. | Check whether the employee forgot to check out the day before. Raise the limit only if long shifts are real. |
| *Could not find allowed zone to check in* — «لا يمكن إيجاد مناصق مسموح تسجيل دخول بها» (and the same with *check out*) | Zones are switched on and no allowed zone covers this employee. | Add an allowed zone line for the employee, their department or their group. |
| *You cannot check in from your current location. The distance between your location and the nearest zone ({0}) is {1}* — «لا يمكنك تسجيل دخول من الموقع الحالي, المسافة بين موقعك وأقرب منطقة ({0}) هي {1}» (and the same with *check out*) | **Prevent Save If Attendance Out Of Zone** is ticked and the phone is outside every zone. | Ask the employee to move into the zone, or widen the zone's maximum distance. |
| *Check in zone {0} is not the same as check out zone {1}* | **Check Out Zone Must Be Same As Check In Zone** is ticked. This message has no Arabic text and shows in English on Arabic screens. | Check out from the zone of the check-in, or untick the option. |
| *Only two or four items can be displayed!* | One or three app bar items are filled. | Fill two or four. |
| *The report group code {0} does not exist* — «كود مجموعة التقارير {0} غير موجود» | A report's **Group Code** is not in the Report Groups grid. | Add the group, or correct the code. |
| *Please contact administrator to config order book and term* | The KAS app placed an order with no order book or term in the settings that apply. This message has no Arabic text. | Fill **Order Book** and **Order Term** in the group, or on the matching shopping line. |
| *Can not find book and term for Item Request* — «لا يمكن العثور على دفتر و توجيه لطلب صنف» | The Mobile Delivery app found no line in the item request grid, or in the sales order grid, for the device. A sales order shows the same English text, with «لا يمكن إيجاد دفتر و توجيه لطلب صنف» in Arabic. | Add a line, with an empty device for a catch-all. |
