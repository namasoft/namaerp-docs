# Troubleshooting System Hanging or Unresponsiveness

## Overview

When your Nama ERP system becomes unresponsive, slow, or appears to hang, the most effective diagnostic tool is a **thread dump** (also called a stack dump). A thread dump captures a snapshot of all threads in the Tomcat process at a specific moment, showing exactly what each thread is doing. This information is invaluable for the development team to identify the root cause of performance issues.

## When to Capture a Thread Dump

Capture a thread dump when you experience any of these symptoms:

- 🔴 **Complete System Freeze** - The application stops responding entirely
- 🟡 **Extreme Slowness** - Pages take several minutes to load or operations timeout
- 🔵 **High CPU Usage** - Tomcat process consuming 90-100% CPU continuously
- 🟣 **Database Deadlocks** - Users getting timeout errors or waiting indefinitely
- 🟠 **Hanging Requests** - Specific operations never complete (e.g., report generation, data import)

::: tip Best Practice
Capture **2-3 thread dumps** with 10-30 second intervals between them. This helps identify patterns and distinguish between temporary spikes and persistent issues.
:::

## What is a Thread Dump?

A thread dump is a text file containing detailed information about all running threads in the Java Virtual Machine (JVM), including:

- Thread names and IDs
- Thread states (RUNNABLE, WAITING, BLOCKED, etc.)
- Stack traces showing the exact line of code each thread is executing
- Lock information and potential deadlocks
- Resource usage patterns

## Prerequisites

- **Administrator access** to the Windows server (the tool will request elevation automatically)
- **Network connectivity** to download the tool (or save it locally)

## Step-by-Step Instructions

### Step 1: Download and Run the Tool

Open PowerShell (regular or admin) and copy the following commands:

```powershell
# Download the thread dump tool
Invoke-WebRequest https://namasoft.com/bin/nama-jstack.exe -OutFile "$env:USERPROFILE\nama-jstack.exe"

# Run the tool (will request admin privileges if needed)
& "$env:USERPROFILE\nama-jstack.exe"
```

::: tip Automatic Elevation
If you're not running as administrator, the tool will automatically request elevation and restart with admin privileges.
:::

::: info Alternative Download
You can also download the tool directly from [namasoft.com/bin](https://namasoft.com/bin) — use the search box to find it by typing "jstack".
:::

### Step 2: Select the Tomcat Process

The tool will automatically detect running Tomcat processes:

#### Single Process Scenario
If only one Tomcat instance is running, the tool will automatically select it:
```
Auto-detected: Tomcat101010.exe (PID: 29500)
```

#### Multiple Process Scenario
If multiple Tomcat instances are running, you'll see a menu:
```
Found 3 Tomcat processes:

[1] Tomcat109999.exe (PID: 2972)
[2] Tomcat101010.exe (PID: 29500)
[3] Tomcat101111.exe (PID: 20984)

Select process (1-3):
```

Enter the number corresponding to the **hanging or problematic instance**.

::: tip How to Identify the Correct Instance
- Check the **port number** in the Tomcat service name (e.g., Tomcat10**1010** = port 1010)
- Match it with the URL users are accessing (e.g., `http://server:1010/namaerp`)
- If unsure, capture dumps for all instances
:::

### Step 3: Wait for Completion

The tool will:
1. Find the JDK installation automatically
2. Locate the process ID (PID)
3. Execute the jstack command
4. Save the output to a timestamped file in `%USERPROFILE%\nama-dumps\`
5. Automatically open the file in your default text editor

```
Process: Tomcat101010.exe (PID: 29500)
Running jstack...

Thread dump saved to: C:\Users\YourName\nama-dumps\Tomcat101010-20251102-143025.txt
File size: 2847623 bytes
Opening file...
```

::: info Where Are Dumps Saved?
All thread dumps are automatically saved to the `nama-dumps` folder in your user directory. You can easily find them at `%USERPROFILE%\nama-dumps\`
:::

### Step 4: Capture Multiple Dumps (Recommended)

For better analysis, run the tool 2-3 times with 10-30 second intervals between each run. This creates multiple timestamped files in your `nama-dumps` folder showing how thread states evolve over time.

## Heap Dump (Memory Dump)

::: danger Only When Requested by Developers
A heap dump captures the entire memory contents of the Tomcat process. **Only run this when the development team specifically asks you to.** Unlike thread dumps, a heap dump:
- **Consumes significant CPU** while the dump is being written
- **Uses large amounts of disk space** (the dump file can be several gigabytes)
- **Temporarily freezes the application** during the dump process

Running this without coordination can make an already struggling system worse.
:::

If the development team asks you to capture a heap dump, download and run the heap dump tool:

```powershell
# Download the heap dump tool
Invoke-WebRequest https://namasoft.com/bin/nama-heap-dump.exe -OutFile "$env:USERPROFILE\nama-heap-dump.exe"

# Run the tool (will request admin privileges if needed)
& "$env:USERPROFILE\nama-heap-dump.exe"
```

You can also download it directly from [namasoft.com/bin](https://namasoft.com/bin) by searching for "heap".

The process selection works the same way as the thread dump tool. The output file will be saved as a compressed `.hprof.gz` file in `%USERPROFILE%\nama-dumps\`.

## Understanding the Output

The generated thread dump file will contain sections like:

```text
"http-nio-8080-exec-42" #123 daemon prio=5 os_prio=0 tid=0x00007f8c4c123456 nid=0x4567 waiting on condition
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        at java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)
        at com.namasoft.erp.service.InventoryService.processOrder(InventoryService.java:456)
```

::: details What This Means
- **Thread Name**: `http-nio-8080-exec-42` (HTTP request handler)
- **Thread State**: `WAITING` (thread is idle, waiting for a resource)
- **Stack Trace**: Shows the exact code path - in this case, waiting in `InventoryService.java` at line 456
:::

## Sending Results to Development Team

### What to Send

1. **All generated dump files** (e.g., `Tomcat101010-20251102-143025.txt`)
2. **Timestamp** of when the issue occurred
3. **Description** of the problem:
   - What operation was being performed?
   - How many users were affected?
   - How long had the system been unresponsive?
   - Any error messages displayed to users?

### Email Template

```
Subject: Thread Dump - System Hanging on [Server Name]

Hi Development Team,

The ERP system experienced [describe issue: hanging/slowness/high CPU]
on [date] at [time].

Issue Details:
- Server: [server name/IP]
- Tomcat Instance: [service name and port]
- Duration: [how long the issue lasted]
- Affected Operations: [what users were trying to do]
- Number of Users Affected: [approximate number]

I've captured thread dumps as requested. Files attached:
- Tomcat101010-20251102-143025.txt (2.8 MB)
- Tomcat101010-20251102-143035.txt (2.7 MB)
- Tomcat101010-20251102-143045.txt (2.9 MB)

The system [returned to normal/required restart] after [action taken].

Please let me know if you need additional information.

Best regards,
[Your name]
```

### Preferred Delivery Methods

1. **Email** - For files under 10 MB
2. **Shared Drive** - For larger files or multiple dumps
3. Whatsapp Messages

## Troubleshooting

### JDK Not Found

The tool will prompt you for the JDK path if it cannot find one automatically. Enter the full path:
```
C:\Program Files\Java\jdk-21
```

Or find your JDK location:
```powershell
Get-ChildItem "C:\Program Files\Java" -Directory
```

### Process Not Found

If no Tomcat process is detected, the tool will list any available Java/Tomcat processes it can find. Make sure the Tomcat service is running:
```powershell
Get-Service | Where-Object {$_.Name -like "*Tomcat*"}
```

### Permission Denied

The tool automatically requests administrator privileges. If you still see this error:
1. Click **Yes** when the UAC prompt appears
2. Verify your user account has admin rights on the server
3. Check if antivirus is blocking the tool

## Advanced Usage

### Specify Process Name Directly

If you know the exact process name, pass it as an argument:

```powershell
& "$env:USERPROFILE\nama-jstack.exe" Tomcat101010
```

::: tip Need Help?
If you encounter any issues with the tool or need assistance interpreting results, contact the Nama ERP Development team at dev@namasoft.com
:::
