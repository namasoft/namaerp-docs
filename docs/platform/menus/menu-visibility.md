---
description: "Which menu record a user is given, why an entry is missing (licence, permission, role, personal parts, empty folders), why a menu change has not appeared yet, and the mobile app menu."
entities: [MenuDefinition]
---
# Who Sees Which Menu

Two people sign in to the same system and see different menus. That is normal and intended, but it
makes for a confusing support call, because several unrelated things decide what a person ends up
looking at, and they stack on top of each other.

This page is the order to check them in.

## Which menu record a person gets

A person is not shown "the menu". They are shown one **menu record**, chosen the first time they
sign in, by working down this list until something is found:

1. the menu named on **their user record**;
2. otherwise the menu named on **their security profile**;
3. otherwise the menu named on the **legal entity** they signed in to;
4. otherwise the menu marked **System Default**;
5. otherwise, whichever menu the system finds first.

That last step is a genuine fallback, not a formality. It is what happens on a system where nobody
has assigned anything, and it is why a brand-new installation shows a sensible menu without anyone
configuring one.

::: warning Nothing is marked System Default out of the box
The menu that ships with the system does **not** carry the System Default tick, despite its code
being `default`. On a standard installation it is being served by step 5 — because it is the only
menu there is.

That matters the moment you create a second menu. Tick System Default on your new one and it takes
over for everybody who has no menu of their own, which is usually what you want. Leave it unticked
and which of the two menus wins is decided by whichever the system happens to find first, which is
not something to rely on.

Only one menu may carry the tick; saving a second one with it is refused.
:::

So when one person's menu looks wrong, the first question is not "what is missing from the menu" but
"which menu are they even on" — check their user record, then their security profile, then the legal
entity they signed in to.

![The Menu Definition screen](../../ar/platform/menus/images/menu-definition-screen-en.png)

## Why an entry is missing from a menu that has it

Having the right menu is not enough. Entries are filtered out on the way to the screen, and two
parts of the tree are personal to the reader on top of that.

### The module is not licensed

Folders carry a note of which module and sub-module they belong to, and folders belonging to modules
the licence does not include are removed. Because a folder with nothing left in it is also removed,
a whole branch disappears cleanly rather than leaving an empty shell.

This is why the menu on a customer system is so much shorter than the full list: it is the same
menu record, minus everything the licence does not cover.

### The person does not have permission

An entry that opens a list the person may not see is not shown to them. Permission is checked
per entry, so two people on the same menu record can see different numbers of entries in the same
folder.

### A role explicitly blocks it

A security profile can allow or block individual entries and whole folders by code. This is the
cleanest way to give one department a shorter menu without building a menu for them —
[security profiles](/platform/security/security-profiles) covers how.

::: warning Blocking an entry tidies the menu; it does not lock the door
These allow and block rules decide what appears in the menu. They are not permissions. Somebody who
still has permission to open a screen can reach it another way — from a link, from a saved address,
from a reference on another record — even though its menu entry is hidden from them.

When the point is that a person must not use a screen at all, take away the permission on their
security profile. Use the menu rules to shorten a menu, not to secure one.
:::

::: tip Blocking by code needs the entry to have a code
Blocking works off the entry's code, so an entry with a blank code cannot be blocked individually.
Most entries get a code automatically, but the three that take no target at all — **User
Favourites**, **All Reports** and **Auto Dash Boards** — can end up without one. Those are blocked by removing them from the menu
instead.
:::

### Two parts of the menu are personal by design

Even on the same menu record, two people will not see quite the same tree, and this is intended
rather than a fault.

**Favourites** is a single row in the menu that fills itself in per person. What appears under it is
built from the favourites that apply to that individual, to the group they belong to, and to their
security profile, combined in priority order. Two colleagues on one menu will have different
Favourites folders, and neither is wrong.

**An administrator has one entry nobody else does.** A Utilities entry appears under Settings for
administrators, and it is not part of any menu record — so it is in an administrator's screen-share
and absent from the customer's, with nothing in the menu to explain the difference.

### Empty folders are not drawn

Once the filters above have run, any folder left with nothing in it is dropped, and any top-level
folder left with no sub-folders goes with it.

This is worth knowing because it changes what the symptom looks like. Blocking the last entry in a
folder does not leave an empty folder behind — the folder disappears too, and to the user it looks
as though something larger has gone missing than actually has.

## Why a change to the menu has not appeared

This is the single most common menu question, and the answer is the same every time.

**The menu is worked out at sign-in and then kept for the rest of the page's life.** It arrives with
the sign-in and is held in the browser. Moving between screens does not rebuild it, and neither does
opening and closing the menu itself.

What does refresh it:

| What you do | Do you see the change? |
|---|---|
| Keep working | **No** — indefinitely |
| **Reload the browser page** | **Yes** — this is the answer to give |
| Sign out and back in | Yes |
| Switch legal entity from the toolbar | **No** — reload afterwards |

So tell people to **reload the page**. It is the shortest instruction that works, and it does not
cost them their place the way signing out does.

The last row is the one that catches people. Switching legal entity re-establishes the session but
leaves the menu that was already built in place, so somebody who moves to another company keeps the
previous company's menu until they reload. If a menu looks wrong immediately after a context switch,
reload before investigating anything else.

::: tip Say it when you hand the change over
The person who asked for the menu change will look straight away, see nothing, and report that it
did not work. Telling them to reload first saves the round trip.
:::

## A quick order of checks

When somebody says a menu entry is missing:

1. **Are they on the menu you think they are?** User record, then security profile, then legal
   entity.
2. **Have they reloaded the page since the change?** If not, nothing else matters.
3. **Is the module licensed?** A whole branch missing points here. If it was licensed recently, see [when the licence changes](/getting-started/licensing#When-the-licence-changes); for every other reason a screen can be missing, the [full checklist](/getting-started/licensing#Why-cant-I-see-screen-X).
4. **Do they have permission to open it?** One entry missing for one person points here.
5. **Is a role blocking it?** Check the menu allow/block rules on their security profile.
6. **Is the row still in the menu at all?** A group or entry whose parent code was mistyped is
   deleted on save without an error — see
   [how the menu is put together](/platform/menus/menu-structure).

## The mobile app has its own menu

The Nama mobile app does not use any of this. It has a separate menu definition of its own, with its
own screen, and it is assigned separately — on the user record, in the field next to the one that
assigns the menu described here. Changing this menu has no effect on the app. See
[the mobile app documentation](/modules/mobile/) for that side.

## See also

- [How the menu is put together](/platform/menus/menu-structure) — the structure behind the tree
- [Changing the menu](/platform/menus/menu-update) — customising safely
- [Security profiles](/platform/security/security-profiles) — permissions and the menu allow/block
  rules
- [Security overview](/platform/security/security-overview) — where menu visibility sits among the
  other layers
