---
entities: [ConfigEntry]
menu: Inventory → Settings → Supply Chain Configurations
---
# Item Barcode Specifications

This page documents the **Barcode Specifications** tab — the rules that tell the system how to read a composite/structured barcode and turn it into an item plus its properties and quantity.

![The Item Barcode Specs tab of Supply Chain Configurations](../../../ar/modules/supplychain/images/configuration/sc-config-item-barcode-specifications-en.png)

## The Concept

A retail or warehouse barcode is often **not** just the item code. It can be a single string that packs the item code together with extra properties and a quantity, weight, or price. A classic example is a deli/produce scale label where one scanned barcode contains the item code plus the weighed quantity or the total price.

Item Barcode Specifications tell the system **how to parse such a string** into its parts — the item **code**, item **properties** (size, color, revision, lot, box, expiry/production date, serial numbers, unit of measure), and a **quantity / unit price / total price**. You can define up to **five** independent specifications. When a barcode is scanned, the system matches it against the five specs by prefix and length and uses the first one that fits.

::: info Prerequisite
Barcode parsing only runs when **Allow Item Search by Barcode Specification** (on the [Items & Master Data](./items-and-master-data-configuration.md) tab) is enabled.
:::

## Defining a Specification

Each of the five specification slots has a header and a parts grid.

### Header

The field IDs below use the pattern `value.itemBarcodeSpecsN.<prop>`, where **N** is the slot number (1–5) of the specification you are configuring.

**Prefix** (`value.itemBarcodeSpecsN.prefix`) — The leading characters that identify a barcode as belonging to this specification (for example `20` for in-store weighed labels). Only barcodes starting with this prefix are parsed by this spec.

**Treat Prefix as Part of First Property** (`value.itemBarcodeSpecsN.treatPrefixAsPartOfFirstProperty`) — When on, the prefix characters are *not* stripped but kept as the beginning of the first parsed part — useful when the prefix is also meaningful data (e.g. part of the item code).

**Minimum / Maximum Code Length** (`value.itemBarcodeSpecsN.minCodeLength` / `value.itemBarcodeSpecsN.maxCodeLength`) — The length window the scanned barcode must fall within to match this spec. Together with the prefix, this is how the system decides which of the five specifications applies to a given scan.

**Separator** (`value.itemBarcodeSpecsN.separator`) — The character separating parts when the barcode uses a delimiter rather than fixed-length segments.

### Parts Grid

The parts grid lists, in order, the segments the barcode is split into. The system walks the parts in order, consuming the barcode either by each part's fixed length or up to its separator, and emits the item code plus the property values, which are then written onto the document line.

**Property** *(required)* (`value.itemBarcodeSpecsN.parts.property`) — What this segment represents. The available values are: **Code, Revision, Size, Color, Quantity, Width, Height, Length, Count, Lot, Box, Expiry Date, Production Date, First Serial Number, Second Serial Number, Unit Price, Total Price, Unit of Measure**.

**Separator** (`value.itemBarcodeSpecsN.parts.separator`) — A per-part separator marking the end of this segment (used when parts are delimited rather than fixed-length).

**Length** (`value.itemBarcodeSpecsN.parts.length`) — The fixed number of characters this segment consumes when parsing by length.

**Multiply By** (`value.itemBarcodeSpecsN.parts.multiplyBy`) — After extracting a numeric part, multiply it by this factor (for example, to scale an embedded weight or price).

**Divide On** (`value.itemBarcodeSpecsN.parts.divideOn`) — Divide the extracted numeric value by this factor (for example, a price embedded in cents divided by 100, or a weight with implied decimals).

**Format** (`value.itemBarcodeSpecsN.parts.format`) — The pattern used to interpret the segment — for instance a date format for an expiry/production date, or a numeric format.

## Specifications 1–5

Each of the five slots has its own field ID:

| Slot | Field ID |
| --- | --- |
| Specification 1 | `value.itemBarcodeSpecs1` |
| Specification 2 | `value.itemBarcodeSpecs2` |
| Specification 3 | `value.itemBarcodeSpecs3` |
| Specification 4 | `value.itemBarcodeSpecs4` |
| Specification 5 | `value.itemBarcodeSpecs5` |

The five slots (**Specification 1** through **Specification 5**) are independent. Define one slot per distinct composite-barcode format you scan — for example, slot 1 for weighed goods, slot 2 for price-embedded labels — each with its own prefix, length window, and parts. The system matches a scanned barcode to the first slot whose prefix and length fit and parses it accordingly. The same specifications are used at the point of sale.
