---
title: EAForceUsersToChangePassword
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAForceUsersToChangePassword

## Overview

Flags users to be required to change their password on their next login when their last password change is older than a configurable number of days (default: 45). Ticks **Password Must Be Changed** (`passwordMustBeChanged`) in the settings of every matching user.

## When This Action Runs

**Primarily intended to be wired into a Task Schedule** so the system periodically enforces a password-rotation policy without manual intervention. Configure a recurring task schedule (e.g. nightly) that invokes this action. Manual execution from the user list is also supported for one-off enforcement.

## How It Works

1. **Builds the selection query** - uses the SQL provided in parameter 1, or falls back to the built-in default query
2. **Substitutes the `@days@` placeholder** with parameter 2 (or `45` if not provided)
3. **Executes the query** to collect the IDs of users that should be forced to change their password. The default query selects committed, login-enabled users whose `passwordMustBeChanged` is still `false` and whose `lastPasswordChangeDate` is either null or older than `@days@` days
4. **Processes the matching users in batches of 100**, each batch inside its own transaction, loading every user by ID and ticking **Password Must Be Changed**
5. **Returns a success result** after all batches complete

On the user's next login attempt the system detects the flag and requires the user to set a new password before continuing. Once the user successfully changes their password (via the change-password flow), `settings.lastPasswordChangeDate` is updated to the current time and the flag is cleared, so the user will not be picked up again until the configured number of days has elapsed.

## Parameters

**Parameter 1:** Query (Optional) - Title: *Query To Find User Ids*. Custom selection SQL that returns user IDs in the first column. If supplied, you may include the literal token `@days@` and it will be substituted with parameter 2. If omitted, the built-in default query is used.

**Parameter 2:** Period in days (Optional) - Title: *Period (default is 45, if used with query you must include @days@ in the query)*. Whole number of days since the last password change after which the user must change their password. Defaults to `45`. If a custom query is supplied that does **not** contain `@days@`, this parameter must be left empty.

## Default Query

```sql
select u.id from NaMaUser u where
u.commitedBefore = 1 and u.preventLogin = 0 and u.passwordMustBeChanged = 0
and (u.lastPasswordChangeDate is null or getdate() >= DATEADD(day, @days@, u.lastPasswordChangeDate))
```

## Recommended Usage

Create a Task Schedule that calls this action on a recurring basis (typically daily, outside business hours). This is the main intended deployment mode - running the action manually only flags users that already meet the threshold at that moment, while a scheduled job continuously enforces the policy as users cross the threshold.

## Database Tables Affected

- **NaMaUser** (the users table) - Updates the `passwordMustBeChanged` column for every matching user

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAForceUsersToChangePassword`


</div>
