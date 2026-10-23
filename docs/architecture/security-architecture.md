---
description: "Nama ERP security for reviewers: login controls (LDAP, two-factor, lockout, session limits), the layered permission checks deciding what a user can reach, audit trails proving who did what, data protection, and where responsibility sits."
---
# Security Architecture

Security questions arrive in a predictable order. Who can get in? Once in, what can they reach? How do we prove afterwards who did what? And what protects the data while it is in transit and at rest? This page answers those four questions at the level a reviewer needs, and points to the pages where each control is actually configured.

## Getting in

Every user has a **user record** with their own login identity. There are no shared accounts by design, and there is no anonymous access to business data.

Authentication can be handled by Nama itself or delegated to your existing directory through **LDAP**, so that staff use their corporate credentials and joiner–leaver processes stay in one place. Where Nama holds the password, the policy is configurable: minimum length, alphabetic, numeric and special character counts, mixed case, and a rule preventing a "change" that reuses the current password. A user changing their own password in the browser must type the current one first, so a session left open on an unattended desk cannot be used to take over the account.

**Two-factor authentication** is available and can be required at login — either a one-time code delivered to the user by message, or a code checked through the Estidamah gateway. Code length, format, validity period and resend delay are all configurable. See [Two-Factor Authentication](../getting-started/two-factor-authentication.md).

Three further controls harden the login itself:

- **Lockout after repeated failures** — a configurable number of consecutive failed attempts within a configurable window blocks the account, which separates a forgetful user from someone guessing passwords.
- **Session limits** — a maximum number of concurrent sessions per user, with a choice of logging out the oldest session or refusing the new login.
- **Idle timeout** — sessions close automatically after a configurable period of inactivity.

At the server level, logins can additionally be restricted by IP prefix or blocked for named login identifiers — useful for temporarily fencing off an account or restricting access to known networks.

All of these settings live together on the security tab of the global configuration; see [Security and Login settings](../platform/global-config/global-config-security.md).

## What a user can reach

Authorisation is layered, and the layers are checked in a fixed order. A user must pass through all of them:

```text
   1.  Authentication          can this person log in at all?
              │
   2.  Menus                   which menu items are even visible?
              │
   3.  Type permissions        for this kind of record — view? edit?
              │                delete? print?
   4.  Record visibility       which of those records specifically —
              │                by branch, by dimension, by "created by
              │                me", by extra filter
   5.  Field / page / list     inside a record they may open, which
              │                fields are hidden or locked, which tabs
              │                and list views are allowed
   6.  Actions & capabilities  may they trigger this particular button?
```

The two cornerstones are the **security profile** and the **user**. A profile is a reusable permissions template, normally written once per job role — accountant, warehouse keeper, sales supervisor — and assigned to many users. The user record carries its own copy of the same permission tables, and anything defined there overrides the profile for the matching record type. That is how you grant one person a single exception without loosening the role for everybody who shares it.

::: tip Deny is the default
If no matching permission line exists on either the user or the profile, the answer is no. Access has to be granted deliberately; it is never inherited by accident. The one short-circuit is the **Full Authority** flag, which grants everything — treat the profiles carrying it as privileged accounts and keep the list of holders short. The flag is hidden from the Security Profile screen on purpose, so nobody grants it by ticking the wrong box; the built-in default profile carries it, and [Fields hidden on purpose](/platform/security/security-profiles#Fields-Hidden-on-Purpose) shows how to reveal it with a Screen Modifier.
:::

Record-level visibility deserves a specific mention because it is what auditors usually probe. Beyond "can this user see sales invoices", Nama restricts *which* sales invoices: by the dimensions attached to the record (branch, department, cost centre and similar), by whether the user created it, and by free-form extra filters written into the profile. This is applied by the system when reading data, not by hiding rows in the interface. The detail is in [Record-Level Security](../platform/security/record-level-security.md), and the full model in the [Security Overview](../platform/security/security-overview.md).

Where a manager is away, permissions can be **delegated** for a defined period rather than shared by handing over a password — see [Security Delegation](../platform/security/security-delegation.md).

## Proving what happened

Every record carries who created it and who last modified it, with timestamps, and this is preserved as part of the record itself. On top of that baseline, **field-level auditing** can be switched on for named fields — a credit limit, a selling price, a discount percentage, a payment term — and every change to those fields is then written to a detailed trail showing the previous value, the new value, who changed it and when, reachable from the record. Auditing selected fields rather than all of them is deliberate: an audit log nobody can read is not evidence.

For documents, **approval cycles** provide the forward-looking counterpart. A document can be required to pass through named approvers before it takes effect, with the decisions recorded — see the [Approvals System](../platform/approvals/approvals-system.md). Where a processed document has to be pulled back for correction, that too is a recorded action rather than a silent edit.

Because business effects are processed as background requests, there is also a durable record of what the system itself did to each document, and of anything that failed — visible to administrators rather than buried in a log file.

## Protecting the data

**In transit.** Nama ERP should be published over HTTPS. The installer can obtain and install a Let's Encrypt certificate, and renewal is automatic. Any installation reachable from outside the office network should treat this as mandatory rather than optional, and internal-only installations still benefit from it.

**At rest.** The database is a standard Microsoft SQL Server database and inherits whatever protection your database estate provides — file system permissions, transparent data encryption if you use it, and your own key management. Nama connects with a dedicated SQL user granted access to its own database; it does not require server-wide administrative rights for day-to-day operation. By default attachments are stored inside the database and share its protection. If **Externalize Attachments** is switched on in [Attachment settings](/platform/global-config/global-config-attachments), they are kept as files in a folder you nominate instead; their protection is then the file system's, and that folder must be covered by the same access controls and backup regime as the database.

**Backups** are as sensitive as the live database and travel further. If backups are uploaded to cloud storage, that account is now part of your security perimeter — give it its own credentials, restrict who holds them, and keep them out of the general IT password file.

**Network exposure.** Only the application should be reachable from the internet, over HTTPS. The database port belongs on the internal network and administrative access to the server itself belongs behind a VPN. The ports involved are listed in [Infrastructure Architecture](infrastructure-architecture.md).

## Where responsibility sits

It is worth being explicit about the division, because it is the source of most misunderstandings in a security review.

| Nama provides | You own |
|---|---|
| The authentication, permission and audit machinery described above | Who holds which profile, and how many hold Full Authority |
| The ability to require two-factor authentication and enforce a password policy | Whether you switch them on, and how strict you set them |
| An installer that obtains and renews a TLS certificate | Your domain, firewall rules and VPN |
| Backup jobs configured at install time | Verifying the backups run, testing restores, and securing the off-site copy |
| Regular releases including security fixes | Applying them, and keeping Windows, Java and SQL Server patched |

If your review process needs more than this page covers — a completed security questionnaire, details of a specific control, or a signed statement for a procurement file — contact Nama technical support directly.
