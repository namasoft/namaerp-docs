---
description: "How a POS register works on its own local database and syncs with the central Nama ERP: unsent versus sent documents, working online or offline, and what to do when a document will not go up to the server."
---
# How POS Data Syncs with the Server

This is the idea that makes Nama POS what it is, so it is worth understanding even if you never touch the technical side. A register works on its **own local database** and syncs with the central Nama ERP in the background. That is why a power cut or a dropped connection does not stop you selling.

## Local-first, then synced

Everything you do at the register — an invoice, a return, a payment, a shift open or close, a stock count — is written to the register's **local database first**. It is saved, it is on screen, it can be printed for the customer. At that point it is **unsent**: it exists here but has not yet reached the server.

In the background the register keeps trying to **send** unsent documents up to the central system. Once a document is sent, it becomes a permanent record in the main system — visible to head office, processed into the accounts, included in company-wide reports.

So every document lives one of two lives:

- **Unsent** — saved locally, not yet at head office.
- **Sent** — safely recorded in the central Nama ERP.

## Online vs offline

**When the register is online**, the gap between the two is tiny: documents go up within moments, and the register also pulls down fresh prices, items and configuration. Customer balances and stock figures are current.

**When the register is offline** — no connection to the server — you carry on selling against the local data. New documents simply queue up as unsent. The prices and stock you see are whatever was last cached, so they may be slightly behind. The moment the connection returns, the queue drains and everything that piled up flows to the server.

The practical promise is simple: **an outage never costs you a shift's sales.** They are all on the register, waiting, and they go up when the line is back.

## When a document will not go up

Usually sync is invisible. Occasionally a document gets stuck, and it helps to know why and what to do.

Each time a document fails to send, the register counts the failure against it. After **25** failed attempts (the default), it stops retrying that document automatically, so a single bad document does not jam the queue forever. Common reasons a document fails:

- **The server is unreachable** — an outage or a network problem. These clear themselves once the connection is back.
- **A validation error on the server** — the document breaks a business rule (a blocked customer, an item that no longer exists, and so on). This needs the underlying issue fixed in the main system first; then the document can go up.
- **An authentication problem** — the register's credentials are not accepted. One for IT.

A document that has hit the retry limit stays unsent and waits for someone to look at it. Once the root cause is resolved, the attempt counter can be reset so the register tries again — the exact steps (and the SQL behind them) are in the [technical points guide](./nama-pos.md#Resetting-the-Send-Attempt-Counter-for-Unsent-Documents).

::: warning Fix the cause first
Resetting the counter only tells the register to try again. If the reason for the failure is still there — the network is still down, the validation still fails — it will just fail again. Sort out the cause, then reset.
:::

## What this means for you

- **Cashiers:** keep selling whether or not you are online; the system catches up on its own.
- **Supervisors:** if documents are not reaching head office, check whether the register is online before anything else — most "missing sales" turn out to be a connection that will resolve itself.
- **IT / support:** persistent failures usually point at the network, a server-side validation rule, or credentials. The transfer errors recorded on the register tell you which document failed and why.
