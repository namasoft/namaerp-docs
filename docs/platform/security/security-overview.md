---
description: "Overview of the security layers a user passes through (login, menus, type permissions, record visibility, fields and pages, actions) and how Security Profile and User records combine in a permission check."
entities: [SecurityProfile, User]
---

# Security System Overview

Every ERP deployment faces the same questions sooner or later: who is allowed to view customer balances? Can the warehouse keeper delete a saved stock issue? And why does a Jeddah branch sales rep see Riyadh branch invoices? Nama answers all of these through a multi-layered security model, and this guide walks you through those layers one by one.

Think of it as a chain of doors the user must pass through:

1. **Authentication** — Can the user enter the system at all? (Login, password, LDAP, two-step verification, session limits)
2. **Menus and Navigation** — Which menu items does the user see in the first place? (See [who sees which menu](/platform/menus/menu-visibility).)
3. **Type-Level Permissions** — For each record or document type (invoices, items, journal entries…) what can the user do? View? Edit? Delete? Print? And how many times?
4. **Record-Level Visibility** — Among all sales invoices in the database, *which ones* can the user see? This is where Dimensions, "only records they created", and Extra Filters come in.
5. **Field, Page, and List-View Permissions** — Inside a record the user can open, which fields are hidden or locked? Which tabs are visible? Which list views are allowed?
6. **Actions and Custom Capabilities** — Can the user trigger a specific button/action on a screen? And does the user hold a custom capability required by a certain feature?

Each layer is configured in one of two places, and understanding the relationship between them is the key to the whole model.

## The Two Cornerstones: Security Profile and User

### Security Profile

A **Security Profile** is a reusable permissions template. Typically you create one profile per job role — "Accountant", "Warehouse Keeper", "Sales Supervisor" — and then assign it to multiple users. The profile contains:

- **Standard Security Lines**: permissions per type (view, edit, delete, print, revise…)
- **Field Settings**: hide specific fields or prevent editing them
- **Page Security**: hide entire pages or make them read-only
- **List View Security**: allow or block specific list views
- **Custom Capabilities**: named permissions that certain features check for
- **Extra Filters**: row-level filters that limit which records the user sees
- **Action Security**: enable or disable specific actions on screens
- **Menu Allow/Block**: control which menu items are visible

See [Security Profile](/platform/security/security-profiles.md) for the full walkthrough.

![The Security Profile screen](../../ar/platform/security/images/security-profile-main-en.png)

### User

The **User** record carries the login identity (user code, password, email), the link to an employee, and the assigned security profile — and, most importantly: **its own local copies of the same permission tables**: standard security lines, custom capabilities, field settings, page security, and extra filters.

This is the heart of the model: *anything you define at the user level overrides the security profile for the matching type*. The profile gives the role its default settings; the user record creates exceptions for one person without touching the rest.

See [Users and Login](/platform/security/users-and-login.md).

## How Is a Permission Check Resolved?

When the system asks "can user X edit a sales invoice?" the answer is calculated in a fixed order:

1. **Full-Authority Short-Circuit**: if the user's security profile has the **Full Authority** flag, the answer is *yes* — no further checks. The built-in `admin` user always uses the default full-authority profile.
2. **User Lines First**: the system checks the standard security lines recorded directly on the user. If a line matches the sales invoice type, that line decides — even if the security profile says otherwise.
3. **Profile Lines Second**: if no user-level line matches, the profile's lines are checked in the same way.
4. **Deny Is the Default**: if no matching line exists on either the user or the profile, the permission is denied.

### How Does a Line "Match" a Type?

Within each set of lines (user or profile) there is also a priority order for matching:

1. A line that names the specific entity type in its **Type** field (e.g., sales invoice) wins first.
2. Then a line whose **Type List** — a record of type *EntityType List* — contains that type.
3. Then the **Wildcard line** where both Type and Type List are left empty, which applies to everything not covered by a more specific line.

This lets you write profiles like: "a permissive wildcard line for all types, a stricter line for financial documents (via a type list), and a very specific line for journal entries alone."

::: tip Type Lists (EntityType List)
EntityType List records (**Administration → Display Customization → EntityType List**) are simple named groups of entity types. They are used across all permission screens, so a single list like "All Sales Documents" can be reused in standard security lines, field settings, page security, and extra filters all at once.
:::

### Delegation Also Plays a Role

If someone has delegated their permissions to this user via a **Security Profile Transfer** document, the user effectively carries the delegators' permissions during the delegation period — a permission is granted if *any one* of the delegators grants it. See [Temporary Extra Permissions](/platform/security/security-delegation.md).

## Where Is Each Question Answered?

| Question | Configuration Point | Guide Page |
|---|---|---|
| Can the user log in? Mobile only? How many sessions? | User settings and Global Configuration | [Users and Login](/platform/security/users-and-login.md) |
| What can the user do with a given type? | Standard security lines (profile or user) | [Security Profile](/platform/security/security-profiles.md) |
| Which records of a given type can the user see? | Dimensions, creator-only records, extra filters, record-level security | [Record-Level Security](/platform/security/record-level-security.md) |
| Which fields / pages / list views? | Field settings, page security, list view security | [Field, Page, and List-View Security](/platform/security/field-page-listview-security.md) |
| Can the user run a specific action on a specific screen? | Action security | [Security Profile](/platform/security/security-profiles.md) |
| Can a colleague cover someone's tasks while they are on leave? | Temporary extra permissions | [Delegation](/platform/security/security-delegation.md) |

::: warning The admin User Is a Special Case
The user whose code/login is `admin` bypasses the entire security model, and the system enforces this explicitly: you cannot block their login, force a password change, restrict them with a dimension, or assign any security profile other than the default full-authority profile. Treat the admin account as an emergency account and give every real person their own dedicated user.
:::
