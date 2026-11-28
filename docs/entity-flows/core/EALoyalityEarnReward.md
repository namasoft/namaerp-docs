---
title: EALoyalityEarnReward
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EALoyalityEarnReward

## Overview

Processes customer loyalty reward points earning for invoice transactions, calculating and awarding points based on purchase amounts while handling returns and external system integration.

## When This Action Runs

Loyalty point processing for invoices after completion or approval to award reward points to customers.

## How It Works

1. **Validates invoice and configuration** ensuring proper loyalty setup and earning policy
2. **Identifies points owner** and verifies required contact information (mobile number)
3. **Calculates reward-eligible amount** after discount adjustments and coupon deductions
4. **Processes points earning/updates** including return deductions and external system communication
5. **Creates reward entries** in loyalty system with transaction tracking

On an installation with replication enabled, the flow does nothing on a site that is not the head office.
On a return invoice it reduces the points earned by the invoice it was returned from (its From Document).
The flow stops with one of these messages:

- *The document {0} is not an invoice* — «المستند {0} ليس بفاتورة» - the record, or the From Document of a return, is not an invoice
- *Reward config can not be empty* — «لا يمكن ترك إعدادات نقاط المكافأة فارغ» - no reward points config has the code in Parameter 1
- *Reward points config type must be support eran policy Loyalty Points* — «إعدادات نقاط المكافأة يجب أن تكون من نوع نقاط ولاء مُدعمة لاكتساب النقاط» - the config does not support earning points
- *Could not find points owner* — «لا يمكن إيجاد مالك النقاط» - the points owner field of the config is empty on the invoice
- *Points owner {0} does not have a phone number* — «مالك النقاط {0} لا يحتوي على رقم هاتف» - the points owner has no mobile number

## Parameters

**Parameter 1:** Reward Points Config (Required) - Code of RewardPointsConfig entity defining earning rules (e.g., STANDARD_LOYALTY, VIP_REWARDS, STC_LOYALTY_CONFIG)

## Database Tables Affected

- **STCLoyaltyPointsRewardEntry** - Creates/updates reward point entries with transaction history
- **RewardPointsConfig** - Reads earning rules, thresholds, and external system settings
- **Invoice and Related Tables** - Accesses invoice data, customer info, and payment lines
- **External System Records** - May create API transaction records and error tracking

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EALoyalityEarnReward`


</div>

