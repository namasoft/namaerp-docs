---
title: EAScaleMasterFileImage
module: core
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAScaleMasterFileImage

## Overview

Image scaling action that processes the main file (image) of master files such as items and customers. Resizes the primary image to specified dimensions while maintaining aspect ratio, specifically designed for master file image standardization.

## When This Action Runs

Manual execution for standardizing master file images, reducing storage space, or ensuring consistent image dimensions for display purposes in master file records.

## How It Works

1. **Accesses main file** - Retrieves the main file (the record's image) of the master file; an empty main file, or one that is not a readable image, is left as it is
2. **Checks the size** - An image whose width and height are both within Parameters 1 and 2 is left as it is
3. **Calculates scaling** - Keeps the aspect ratio: a portrait image (taller than wide) gets the height of Parameter 2, any other image gets the width of Parameter 1, and the other side follows the ratio
4. **Resizes image** - Redraws the image at the new size, in the format given by the file name's extension
5. **Updates main file** - Replaces original image data with scaled version

## Parameters

**Parameter 1:** Scaled Width (Required) - Maximum width in pixels for scaled images

**Parameter 2:** Scaled Height (Required) - Maximum height in pixels for scaled images

## Database Tables Affected

- **MasterFile Tables** - Updates main file attachment data with scaled version
- **Large Data Storage** - Modifies binary data storage for main file attachments

**Module:** core

**Full Class Name:** `com.namasoft.infor.domainbase.util.actions.EAScaleMasterFileImage`


</div>