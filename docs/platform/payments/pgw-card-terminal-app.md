---
description: "Installing and setting up PGW, the Windows program that links Nama on the cashier's PC to a Geidea, Neoleap or InterPay card machine: prerequisites in Nama, COM and TCP/IP connections, testing, upgrading, the transaction log and messages."
---
# PGW: Installing and Setting Up the Card Terminal Program

A card machine on the counter cannot talk to a web page. Nama runs in the cashier's browser, and the Geidea, Neoleap or InterPay machine is connected to the cashier's PC by a cable or sits on the shop network. **PGW** (Namasoft Payment Gateway) connects the two. It is a small Windows program installed on the cashier's PC. On one side it waits for Nama on port `7842` of that PC. On the other side it speaks the card machine's own language. When the cashier presses **Pay Invoice**, the browser hands the amount to PGW. PGW sends it to the machine, waits for the customer's card, and returns the result.

Because the browser always calls PGW on its own PC (`localhost`), every cashier PC that takes card payments needs its own copy of PGW, set up for the machine attached to it. NearPay terminals do not use PGW at all. They are covered in [Payment Methods and Payment Terminals](/platform/payments/payment-methods-and-terminals#NearPay-an-Android-device-on-the-shop-network).

This page covers the PGW program itself. What happens during a payment is described in [How a Card Payment Travels Through PGW](/platform/payments/pgw-card-payment-flow).

## What Nama needs before PGW can be used

PGW works only with records already set up in Nama:

1. A **Payment Terminal** record for the machine, with a **Method Group** that turns the card the customer used into a payment method. Both are described in [Payment Methods and Payment Terminals](/platform/payments/payment-methods-and-terminals#Payment-terminals).
2. The terminal's **Provider** can be anything except **NearPay**. Nama only checks whether a terminal is NearPay. Every other terminal, including one with no provider, is sent to PGW, and PGW decides which make of machine it talks to. There is no Neoleap value in the list, so for a Neoleap machine pick InterPay or Geidea, or leave the field empty. The terminal record's **IP Address** and **Port** are not used with PGW. The machine's address is entered in PGW instead.
3. The document or the POS register names that terminal: the **Payment Terminal** field on the sales invoice, or the terminal on the **Register** in Nama POS.

## Installing PGW

1. On the cashier's PC, download the installer from `https://www.namasoft.com/bin/PGW-setup.msi` and run it. PGW needs the .NET Framework 4.7.2 or later, which current Windows versions already have.
2. Start PGW from the shortcut the installer creates. Its window is titled *Namasoft Payment Gateway*. PGW runs with administrator rights, so Windows may ask for permission when it starts.
3. On its first start PGW adds itself to the Windows startup folder, so it starts with Windows from then on. If it is not running after a restart, start it from the shortcut.

Only one copy can run at a time. Starting it a second time shows *Another instance of Namasoft payment gateway is already running!* and the second copy closes.

::: warning Minimise the window, do not close it
Closing the PGW window with the **X** button stops the program. The next card payment then fails in the browser with *There is no connection on port 7842, please make sure that the PGW server is running.* Minimise the window instead. The PGW icon (*Namasoft PGW*) in the Windows notification area reopens the window when you double-click it. Its right-click menu has **Exit**, which also stops PGW.
:::

## Choosing the connection

The PGW window has one main choice, **Connection Type**, and the fields that go with it. Each choice tells PGW which make of machine is attached and how it is reached:

| Connection Type | What PGW needs | Fixed settings PGW uses |
|---|---|---|
| **Geidea COM Port** | The **COM Port** the machine's cable is plugged into. | 38400 baud |
| **Geidea TCP/IP** | The machine's IP address on the shop network. | Port `6100` on the machine |
| **Neoleap COM Port** | The **COM Port** of the machine. | 9600 baud |
| **Neoleap TCP/IP** | The machine's IP address. | Port `9999` on the machine |
| **Interpay** | InterPay's own **softPOS** application installed and running on the same PC. PGW passes the payment to it. | softPOS on this PC, at the **Interpay Port** (8080 unless changed) |
| **Nami COM Port** / **Nami TCP/IP** | The Nami middleware installed and running on the same PC, plus the COM port or the IP address of the machine. | Middleware on port `9099` of this PC. Machine on port `8888` for TCP/IP, 115200 baud for COM. |

The ports and speeds in the last column are built into PGW and cannot be changed in its window. When the machine itself asks for an ECR (cash register) port or speed, set it to the value in this table.

PGW saves every change as soon as it is made and reloads it the next time it starts. A PC that restarts does not need to be set up again.

### COM port connections

Choosing a COM connection type fills the **COM Port** list with the ports Windows currently sees. If the machine was plugged in after the list was filled, press the refresh button beside the list. Pick the port the machine is on. Windows Device Manager, under *Ports (COM & LPT)*, shows which port that is.

### TCP/IP connections

Type the machine's address into the four **TCP/IP** boxes, one number per box, and **press Enter** in a box once all four are filled. PGW saves the address only when Enter is pressed. If you type the address and click away, PGW keeps using the previous address.

Give the machine a fixed address on the router. If the address changes, PGW keeps calling the old one, and every payment fails until the new address is entered.

### InterPay

With **Interpay**, PGW does not reach the machine itself. It passes the payment to InterPay's softPOS application, which must be installed (in `C:\interpay\softposService`) and running on the same PC. The two meet on the **Interpay Port**, which is 8080 by default.

If something else on the PC already uses port 8080, choose another port:

1. Type a four-digit port into **Interpay Port**.
2. Press the save button beside it (tooltip *Save interpay port to softpos app*). PGW writes the port into softPOS's configuration file and shows *Done, please restart softpos!*
3. Restart softPOS.

### Auto fill

The **Auto fill data** button looks through the COM ports on the PC for a Geidea or Neoleap machine. It checks the device names Windows reports and, if needed, tries each port. When it finds one, it fills in the connection type and port by itself. When it finds none, it shows *There is no payment terminal connected via com port or by ip address*. For a machine on the network, type its address as described above.

## Testing the connection

Press **Test Connection** after any change. PGW checks that the machine (or softPOS, or the Nami middleware) answers, and shows the result in a box. *Success* means the setup is right. Any other answer is listed under [Messages you may see](#Messages-you-may-see).

A successful test does not charge anything. The real check is a small payment from a test invoice.

## Upgrading PGW

The window shows the installed version (*Version: 14*, for example). Each time it starts, PGW checks namasoft.com for a newer version. If there is one, the **Upgrade version** button becomes active.

Pressing it asks *There is new version of PGW, Do you want to install it?* If you answer Yes, PGW downloads the new installer into the Documents folder, runs it, and starts again. Press **Test Connection** afterwards to confirm the machine still answers. If the PC has no internet access, the button stays disabled. Download the installer on another computer and run it on the cashier PC.

## The Last Transactions window and the log file

The **Last Transactions** button on the status bar opens a list of what PGW did recently: the payment requests it received, what it sent to the machine, and the machine's answer, with the date and time of each. The list keeps the most recent entries. Select lines and press `Ctrl+C` to copy them (`Ctrl+A` selects all), for example to send to support. The window hides itself after two minutes.

Everything, including errors, is also written to `pgw.log` in the PGW installation folder. That file is what Namasoft support asks for when a payment went wrong.

The status bar at the bottom of the main window shows the payment that is in progress (*Payment Transaction with value 150 is processing*, *Waiting for response from terminal ...*).

## Messages you may see

PGW has no Arabic interface. All its messages are in English.

| Message | Why | What to do |
|---|---|---|
| *Another instance of Namasoft payment gateway is already running!* | PGW was started while it was already running. | Nothing. Use the copy already running. Double-click its icon in the notification area to see it. |
| *Please select Com port* | **Test Connection** was pressed for a COM connection type without a port. | Pick the port, using the refresh button if the list is empty. |
| *Please enter ip* | **Test Connection** was pressed for a TCP/IP connection type with an empty address box. | Fill all four boxes and press Enter. |
| *Connection failed, Choose another COM Port and Make Sure the machine is correctly connected* | A Geidea machine did not answer on the chosen port. | Check the cable and pick the port Device Manager shows for the machine. |
| *Connection failed, Choose another Ip* | A Geidea machine did not answer at that address. | Check the machine's address and that it is on the same network as the PC. |
| *Failed! please check setup, the connection and cable* | PGW could not load its Neoleap connection. | Check the cable, set the port or the address, then choose the connection type again and test. |
| *1 API_LIBRARY_FAILED*, *2 API_NO_RESPONSE*, *3 API_PORT_OPEN_FAILED*, *4 API_FAILED*, *5 API_TIMEOUT*, *7 API_PAYMENT_NO_RESPONSE* | The Neoleap machine's answer to the test. *3* means the COM port could not be opened. *2* and *5* mean the machine did not answer. | For *3*, close any other program using the port, or pick the right port. For *2* and *5*, check the cable or the address and that the machine is switched on. |
| *Please run softpos application- if already running, edit interpay port and click on save to softpos button then restart softpos application* | PGW could not reach softPOS on the Interpay Port. | Start softPOS. If it is running, save the port again as described under [InterPay](#InterPay) and restart softPOS. |
| *Please run softpos application* | A payment was sent while softPOS was not running. | Start softPOS and try the payment again. |
| *Please insert valid port!* | The Interpay Port is not four digits. | Type a four-digit port. |
| *Done, please restart softpos!* | The port was saved to softPOS. | Restart softPOS. |
| *Error writing port number to interpay configuration file!, port reset to 8080* | PGW could not find or update softPOS's configuration file. | Check that softPOS is installed in `C:\interpay\softposService`. Until then, PGW and softPOS use port 8080. |
| *Nami middleware is not installing or not running! please install and run it* | A Nami connection type is chosen, but the Nami middleware does not answer on this PC. | Install and start the Nami middleware. |
| *There is no payment terminal connected via com port or by ip address* | **Auto fill data** found no Geidea or Neoleap machine. | Choose the connection type and port yourself. |
| *Config file is corrupted. Restore settings to defaults...* | PGW's settings file was damaged, for example by a power cut. | PGW resets its settings. Choose the connection again. |
| *You have already the last version!* | **Upgrade version** was pressed while PGW is up to date. | Nothing. |
| *New version is not installed* | The upgrade could not be downloaded or installed. | Download the installer from the link above and run it yourself. |
