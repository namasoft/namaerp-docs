---
title: EAEcommerceUploadQuantityCSVFileToFTPServer
module: magento
entities: [EntityFlow]
---


<div class='entity-flows'>

# EAEcommerceUploadQuantityCSVFileToFTPServer

## Overview

Exports SKU and quantity data from Magento sites to CSV files and uploads them to FTP/SFTP servers. Generates inventory data files that can be consumed by external systems for inventory synchronization or reporting purposes.

## When This Action Runs

Manual execution or scheduled tasks for inventory data export. Typically used for regular inventory synchronization with external systems, third-party logistics providers, or e-commerce platforms that require CSV-based inventory updates.

## How It Works

1. **Validates site code** - Finds the e-commerce site using the provided site code; the flow fails with *Can not find site with code {0}* when there is none
2. **Exports CSV data** - Builds the site's SKU and quantity data as CSV text
3. **Handles file pagination** - When parameter 8 is filled, splits the data into files of at most that many rows; when it is empty, one file is produced
4. **Generates file names** - When parameter 8 is filled, a number is added before the extension of the file name (e.g., items-1.csv, items-2.csv), even when there is only one file; when it is empty, the file name is used as it is
5. **Uploads to server** - Uses FTP utilities to transfer each file to the specified server
6. **Manages connections** - Handles FTP/FTPS/SFTP connections with proper authentication

## Parameters

**Parameter 1:** Site Code (Required) - Code of the MagentoSite to export data from

**Parameter 2:** Server URL (Required) - FTP/SFTP server hostname or IP address

**Parameter 3:** Protocol (ftp, ftps, or sftp) (Required) - Transfer protocol: `ftp`, `ftps`, or `sftp`, in lower case

**Parameter 4:** Server Port (Required) - Port number (21 for FTP, 990 for FTPS, 22 for SFTP)

**Parameter 5:** Server Username (Optional) - Username for server authentication

**Parameter 6:** Server Password (Optional) - Password for server authentication

**Parameter 7:** File Name(ex: nama-items.csv) (Required) - Target file name with its extension (e.g., "nama-items.csv")

**Parameter 8:** File Rows Count (Optional) - Maximum rows per file for pagination

## Supported Protocols

- **FTP** - Standard File Transfer Protocol (port 21)
- **FTPS** - FTP over SSL/TLS (port 990)
- **SFTP** - SSH File Transfer Protocol (port 22)

## File Pagination Example

If file rows count is set to 1000 and there are 2500 records:
- File 1: nama-items-1.csv (1000 rows)
- File 2: nama-items-2.csv (1000 rows)
- File 3: nama-items-3.csv (500 rows)

## Database Tables Affected

- **MAGMagentoSite** - References the Magento site configuration (read-only)
- **Inventory Tables** - Reads item and quantity data for export (read-only)
- **Item Linker Tables** - Accesses SKU mappings for export (read-only)

**Module:** magento

**Full Class Name:** `com.namasoft.modules.magento.utils.EAEcommerceUploadQuantityCSVFileToFTPServer`


</div>