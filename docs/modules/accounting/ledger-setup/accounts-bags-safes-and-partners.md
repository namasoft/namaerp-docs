---
description: "Reference for three accounting master files under Accounting → Master Files: the Accounts Bag (a reusable set of accounts for parties), the Safe Deposit (a cash safe, including cashier safes for shifts) and the Partner (an owner or partner tracked as a party with its own accounts)."
entities: [AccountsBag, SafeDeposite, Partner]
---

# Accounts Bags, Safes & Partners

Three small master files sit under **Accounting → Master Files** next to the accounts themselves. None of them records a transaction; each one either decides *which accounts* a party books to, or *is* a party that money moves to and from.

## Accounts Bag — one set of accounts for many parties

Every party in Nama — a customer, a supplier, an employee, a safe, a bank account — carries an **Accounts** block: a **Main Account**, numbered accounts (**Account 01**, **Account 02**, …), a currency and an **Accounts Bag**. Typing the same five accounts on two hundred customers is slow and error-prone. An **Accounts Bag** (`Accounting > Master Files > Accounts Bag`) holds that set of accounts once, and every party that names the bag shares it.

The bag's screen has:

- **Subsidiary Type** — the kind of party this bag is for (customer, supplier, employee…). When it is filled, every account in the bag must be a subsidiary-tracking account that accepts that kind of party (see [Accounts](./accounts.md#Subsidiary-types-up-to-five)); the bag will not save otherwise.
- **Ignore Subsidiary Accounts And Use Bag Accounts** — when ticked, documents always take the accounts from the bag and ignore whatever is typed on the party itself. Change the bag and every party that uses it follows on its next document.
- **Do Not Copy Bag Accounts To Subsidiary** — by default, picking a bag that has the option above ticked copies the bag's accounts into the party's own Accounts block, so they are visible on the party's screen. Tick this to leave the party's fields empty.
- The **Accounts** block — main account and accounts 01 to 05, exactly like a party's.
- **Details** grid — extra accounts, each with an **Account Id** (a short code you choose) and remarks. A document term or an [Accounting Side Config](/platform/shared-master-files/accounting-side-config) whose account source is **From Bag** names that Account Id, and the account on the matching line is used.
- **Currency Account Lines** grid — one account per **subsidiary account type** and **currency**. When the side's **Calculate Account Based On Currency From Bag** option is ticked, the account is picked from this grid by the document's currency, so a party trading in several currencies books each one to its own account. The same account, type and currency cannot appear twice.

Without the "ignore" option the bag still counts: the accounts in the bag, its Details and its Currency Account Lines are all treated as the party's own accounts when a journal line names that party, so they are accepted wherever "this account is not one of the subsidiary's accounts" would otherwise be refused.

## Safe Deposit — a cash safe

A **Safe Deposit** (`Accounting > Master Files > Safe Deposit`) is a cash box or treasury. It is a party in its own right with its own **Accounts** block, so a voucher whose cash side is a safe books to that safe's accounts. Its screen has:

- **Custodian** — the employee responsible for the safe, and an **English Code**.
- **Treasury Cashier** — tick it for a safe used by cashiers. Only safes with this option ticked can be picked on an **Open Shift** (see [Cashier Shifts](../money-in-and-out/cashier-shifts.md)).
- **Main Safe Deposit** — available only on a treasury-cashier safe: the safe the shift's cash is handed to. When a **Close Shift** picks the open shift, the main safe is copied from here.
- The **Accounts** block, an **Additional Information** grid (a reference, a description and remarks per line) and the dimensions.

Receipt and payment vouchers whose term sets the account source to **Safe Deposit** take the safe from the term or from the user; see the [voucher terms](../document-terms/acc-terms-vouchers-and-requests.md).

## Partner — an owner tracked as a party

A **Partner** (`Accounting > Master Files > Partner`) is a business owner or partner kept as a party of its own, apart from customers, suppliers and employees. Because it has an **Accounts** block, it can be the party on receipt and payment vouchers and aging allocation, and the subsidiary on a journal line, which keeps each partner's capital and current account traceable. It also carries:

- a **Percentage** field and an **English Code**,
- **Contact Info** (address, phones, email),
- up to four **Bank Info** groups (bank name, branch, account title, country, SWIFT code, IBAN, intermediary bank), with attachments.

The **Percentage** field is informational: the profit split does not read it. Each partner's share of profit comes from the **Partner shares** record, where a partner row can name a Partner record, an employee or a third party. See [Partner Shares & Profit Distribution](../money-in-and-out/partner-shares-and-profit-distribution.md).
