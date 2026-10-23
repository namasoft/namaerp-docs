---
description: "The Service Queue app (Waiting Area Manager): installing it on the reception tablets, wall screen and advisor desks, signing in, choosing each device's mode, and what the Ticket Creator, Display Screen, Service Provider and Customer modes show."
---
# The Service Queue App

The Service Queue app is the program that runs on every device of a Service Center reception: the tablet that prints tickets, the screen on the waiting-room wall and the advisors' desks. It is the front end of the [Service Queues](/modules/servicecenter/service-queues/servicecenter-queue-overview.md) feature — everything it shows comes from the Queue Service Configurations and Queue Service Branch records on the ERP server, and nothing is kept on the device except its own settings.

Namasoft provides the app for **Android** tablets and for **Windows** PCs. On an Android device it installs under the name **Waiting Area Manager**. One installation can play any of the four roles, so a branch installs the same app everywhere and decides at first start what each device is for.

::: info Licence
The server answers the app only when the installation carries the `srvcenter-service-queues` licence. Without it no device gets past signing in.
:::

## Before you install

Set up the ERP side first; the app has nothing to show until it exists:

1. A [Queue Service Configuration](/modules/servicecenter/service-queues/servicecenter-queue-configuration.md) with its queues, the advisors allowed to serve them, the ticket design, the screen title and the banner.
2. A [Queue Service Branch](/modules/servicecenter/service-queues/servicecenter-queue-branches.md) pointing at that configuration. The branch is what every device is attached to.
3. An ERP user for each device. Advisors sign in with their own user; the ticket tablet and the wall screen can share one user created for the reception.
4. If tickets are printed: a Windows PC near the counter printer running the **Nama Printing Server**, and its address in **Printer URL** on the configuration — for example `http://192.168.1.20:9494`.

Every device must reach the ERP server over the network. The wall screen and the advisors' desks also keep a live connection open to the server so that they update the moment a ticket moves; if your server sits behind a proxy, it has to let that connection through.

## First start: mode, sign-in, branch

The first time the app opens, it asks three questions in this order. It remembers the answers, so a device that restarts goes straight back to work.

### 1. Select Mode — what this device is for

| Mode (English / Arabic) | On screen | Use it for |
|---|---|---|
| Ticket Creator (منُشي تذاكر) | Issue & print tickets | The reception tablet. The receptionist picks a service, a customer and a plate number, and the ticket prints. |
| Display Screen (شاشة عرض) | Waiting-room display wall | The TV in the waiting area. Shows the tickets being served and at which desk, and the advert. |
| Service Provider (مقدم خدمة) | Serve & manage the queue | Each advisor's desk. Calls the next customer and finishes the visit. |
| Customer (عميل) | Self check-in & live status | A tablet facing the customers, where they type their phone number to check in. |

### 2. Login

| Field (English / Arabic) | What to type |
|---|---|
| Server URL (عنوان الخادم) | The ERP's address as users open it in the browser, for example `https://erp.example.com/erp`. |
| User Name (اسم المستخدم) | The ERP user name. |
| Password (كلمة المرور) | The ERP password. |

The app checks the user name and password against the server before moving on. **No Connection Available** means the device has no network at all; *Error, Could not connect to nama server, try again later!* means the network is there but the server did not answer — check the address.

### 3. Select Branch

The app lists the Queue Service Branch records the user can see; **Read Branches** reloads the list. Pick the branch, fill what the mode asks for, and press **Save**:

- **Service Provider** also asks for the engineer number — **Engineer 1** to **Engineer 12** (مهندس رقم 1 … 12). This is the desk number the wall screen announces, so give each desk its own number and keep it.
- **Ticket Creator** shows a printing server address. Leave it as it is: when the tickets screen opens, the app takes the **Printer URL** from the configuration and uses that.

## What each mode shows

### Ticket Creator

The screen lists the queues of the branch's configuration as cards — one per service. To issue a ticket, the receptionist taps **Issue Ticket** on a card. A small dialog asks for:

- **Select Customer** (إختر العميل) — a search over the ERP's customers by code or name. Type part of the name, then pick the customer.
- **Plate Number** (رقم اللوحة).

Both are required. **Submit** creates the ticket on the server and sends the slip to the printer at the configuration's Printer URL; the slip is rendered from the configuration's **Ticket Design**. If the ticket was created but the slip did not print, the app says so — *Ticket created, but printing failed. Please check the printer connection.* — but the ticket was created and is waiting in its queue, so do not issue a second one; fix the printer before the next customer. *Ticket created, but no printer is configured.* means the configuration's Printer URL is empty.

### Display Screen

Meant for a large screen in landscape. One half lists the tickets currently being served, each with the desk that called it (**Engineer 3** / **مهندس رقم 3**); the other half shows the configuration's first active banner with its description. The heading is the configuration's **Screen Title**, and the size of the ticket codes follows its **Ticket Information Font Size**.

Each time a new ticket appears, the screen plays a bell and announces the ticket and the desk. Connect speakers to the device and turn its volume up; the announcement plays once per ticket.

The display updates by itself when an advisor calls or finishes a ticket. When no ticket is being served it shows **No Tickets Yet** (لا توجد طلبات).

### Service Provider

The advisor's screen shows the desk number and two buttons:

- **Next Ticket** (الطلب التالي) calls the next customer, following the order described in [the life of a ticket](/modules/servicecenter/service-queues/servicecenter-queue-overview.md). The ticket code appears under **Now Serving** with the customer's name and plate number, and at the same moment on the wall screen. **No Tickets Found** means nobody this desk may serve is waiting.
- **Finish Ticket** (إنهاء الطلب) ends the visit and frees the desk for the next customer.

**Next Ticket** stays disabled while a ticket is open, so an advisor serves one customer at a time. A ticket also closes without pressing anything when the advisor commits the job order linked to it — the app notices and goes back to waiting.

An engineer number can be signed in on one device at a time. When an advisor picks a number already taken by another user, **Save** shows *Engineer number 3 is in use with user EMP-104*, with the number and the user code filled in (English on both interfaces). Ask that user to sign out, or pick another desk number. A device that was switched off or lost its network releases its number by itself about a minute later.

### Customer

The customer types their phone number and presses **Continue** (متابعة). The server runs the configuration's [automatic ticketing](/modules/servicecenter/service-queues/servicecenter-queue-configuration.md) steps — it recognises the customer by phone number and puts them in the right queue, or refuses them — and the app shows the message those steps return, in the device's language.

## Settings, sign-out and changing a device's role

The menu (☰) holds three entries:

| Entry (English / Arabic) | What it does |
|---|---|
| Settings (إعدادات) | Change the branch, the language (Arabic or English) and, for an advisor, the engineer number. Press **Save**. |
| User Logout (تسجيل خروج مستخدم) | Signs the user out and returns to the login screen; the device keeps its mode. An advisor's open ticket is closed and their engineer number released. |
| Change Mode (تغيير وظيفة الجهاز) | Clears everything — mode, server address, user and branch — and starts again from **Select Mode**. Use it to move a tablet from the counter to the waiting room. |
