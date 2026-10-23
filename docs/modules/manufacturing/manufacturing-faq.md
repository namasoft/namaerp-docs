---
description: "Manufacturing questions answered with ready-made entity flows, such as moving a production order to In Progress as soon as it is saved."
entities: [ProductionOrder]
---
# Frequently Asked Questions — Manufacturing Module in Nama ERP

## I want the production order status to change to "In Progress" immediately upon saving, so I can execute the production order right after saving

You can achieve this through an **Entity Flow** (مسار كيان) that executes during the production order save operation.

### The Action Used

`PreUpdateCalculatedFields`

### The Ready-Made Component

`EAStartOrderIfNotStarted`
This component checks the production order status, and if it has not yet started, it changes it to "In Progress".

### How to Activate

Add an Entity Flow of type `ProductionOrder`, and place the mentioned component on the `PreUpdateCalculatedFields` action.

::: details JSON for Direct Import

```json
{
  "targetType": "ProductionOrder",
  "details": [
    {
      "className": "com.namasoft.modules.manufacturing.domain.utils.plugnplay.EAStartOrderIfNotStarted",
      "targetAction": "PreUpdateCalculatedFields"
    }
  ]
}
```
:::
