---
description: "What support and setup teams must include in a development request for a bug or a new feature (logs, table name, backup URL, reproduction steps) and how to tell when the fix is released."
---
# Guidelines for Submitting Development Requests by Support and Setup Teams

- Namasoft provides an internal system for tracking development requests arising from:
  - Issues encountered by customers
  - Or new requests that require development work

## Before Submitting a Request for a New Feature
- Make sure the requested feature **does not already exist** in the system

## When Submitting a Request to Fix a Bug
- You must **attach a log from the system**:
  - Press `Ctrl + Alt + L`, then perform the action that caused the issue
  - If no log appears after saving or performing the action:
    - Retrieve the `namasoft.log` file from the server
    - Or use `utils.html` if access to the server is not possible

## When Requesting New Fields
- Copy the name of the **screen's table** that you want to add the fields to
  - You can copy it from the screen's URL or by using `Ctrl + Alt + I` (Show Field Info)

## To Make It Easier to Reproduce the Issue
- It is best to provide a **backup of the customer's database** where the issue occurred
- Do not post the backup link in the discussion
  - Use the `Backup URL` field exclusively for this purpose
  - ⚠️ This is an **extremely important** point and must be followed

## When Writing the Request
- Write the request in a **clear and precise** manner
- Explain the **steps to reproduce the issue** in detail
- Avoid vague phrases such as: *"The screen does not work"*

## After Development Is Complete
- You will receive an email notification when the request is finished
  - **However, this does not mean** the fix has been released in a system version
- Open the request and check the following fields:
  - `Release Name`
  - `First Release Name`
- If either field has a value, it means the changes **have been released**
- If **both are empty**, it means the changes **have not yet been included in a new release**

## Development Team Guidelines When Executing Development Requests

- **Understand the Requirements Accurately**
  - If any part is unclear, contact your direct manager or the request creator to clarify the details

- **Thoroughly Test What Has Been Implemented**
  - Make sure the modification or added feature is tested in a way that covers most possible scenarios and outcomes

- **Review the Code Before Presenting It**
  - Carefully review the code before presenting it to your direct manager for review

- **Clarify What Is Needed to Activate the Changes**
  - If the modification requires enabling settings, options in the modified entity, a specific Term Config, or any other configuration, this must be explicitly stated so that the support or setup team can activate it correctly

- **Do Not Waste Your Colleagues' Time in Support and Setup**
  - Avoid directing questions that could be answered by your colleagues in the development team or your direct manager, in order to preserve the time and effort of the other teams

- **The Importance of Internal Testing Before Handover**
  - If the modification has not been tested internally and the issue reappears with the support or setup team:
    - It causes **discouragement for the colleague**
    - It puts them in an **embarrassing situation in front of the customer**
    - And it causes them to **lose trust in the development team and its members**

  Therefore, we emphasize the following:
  - **Thoroughly understanding** the requirements
  - **Carefully reviewing** the changes
  - **Practically testing** what has been implemented in more than one way
