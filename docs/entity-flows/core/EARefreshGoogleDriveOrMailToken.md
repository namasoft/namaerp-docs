---
title: EARefreshGoogleDriveOrMailToken
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EARefreshGoogleDriveOrMailToken

## Overview

Refreshes Google OAuth tokens for Google Drive or Gmail integration by re-authenticating and testing the connection. This action forces token renewal and validates connectivity to Google services.

## When This Action Runs

Manual execution when Google API integration fails due to expired or invalid OAuth tokens, typically after authentication errors or when Google access stops working.

## How It Works

1. **Locates OAuth configuration** - Finds the OAuthFile entity by code or ID
2. **Retrieves credentials** - Gets the Google OAuth credentials saved for that OAuth File
3. **Builds Google Drive service** - Creates authenticated Google Drive service connection
4. **Tests connectivity** - Executes a simple file list operation to validate the token
5. **Updates token** - Token is automatically refreshed during the authentication process

## Parameters

**Parameter 1:** OAuth file code or ID (Required) - Business code or entity ID of the OAuthFile containing Google credentials. The OAuth File must be **Authorized** and have **Used For Emptying Trash of Google Drive Account** ticked; saving the entity flow is refused otherwise, with the OAuth File messages listed on [EACheckDailyBackupOnGoogleDrive](/entity-flows/core/EACheckDailyBackupOnGoogleDrive)

## Database Tables Affected

- **OAuthFile** - Reads Google OAuth configuration and credentials
- **Google Token Storage** - OAuth tokens may be refreshed and updated during the process

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.google.EARefreshGoogleDriveOrMailToken`


</div>