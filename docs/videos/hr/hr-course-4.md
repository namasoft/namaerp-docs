---
description: "Video summary, HR payroll course part 4: attendance and departure, the Timer, shifts, leave, the mobile attendance app, importing fingerprint data from Excel and handling double shifts."
---
# Detailed Explanation of the Payroll System in Nama ERP - 4

# Attendance and Departure System in Detail
[Go to video 00:00:11](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=11s)

## Introduction to the Attendance and Departure System
The video begins by explaining the concept of attendance and departure in the system, and how it relates to employees and shifts, especially in different work environments in Saudi Arabia and the Gulf. The presenter explains that employees may work more than one shift during the day — for example, a morning shift from 10 AM to 2 PM, then returning to work from 6 PM to 10 PM. The video also covers special rules for handling forgotten punches (either check-in or check-out) and how penalties are applied in such cases.

[Go to video 00:01:44](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=104s)

## Documents That Affect Attendance and Departure

### The Timer
The Timer file is one of the most important documents in the system. It is a simple file that contains attachments such as employee attendance data. For example: the attendance day, the time the employee started work, and the machine code on which the fingerprint was recorded. This data is populated automatically and requires no manual entry.
The video explains how to identify the day by date and day of the week, which helps in accurately tracking lateness or absence.

### Adding Employees Manually
There is a button for adding employees manually, which allows entering employees for a specific period without affecting their pre-registered attendance plans. For example, employees can be added automatically from June 1 to June 6.

[Go to video 00:03:28](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=208s)

## Shift System and Setting Work Hours

### How to Define an Employee's Shift
The employee's shift is defined through a duty plan that covers the department, section, or specific employee.
Example: an employee working from January 1, 2023 to December 31, 2023, with a shift from 8 AM to 4 PM.

### Priorities in Defining Shifts
There is a priority concept to determine which duty plan applies to an employee when more than one plan exists. Priority number 1 means it is the highest priority and is applied first, while higher numbers mean lower priority.
Example: a Ramadan plan may have a higher priority than the regular year plan because work hours differ during Ramadan.

[Go to video 00:05:41](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=341s)

### Aggregating Attendance and Departure Data
Attendance data can be aggregated for employees who have specific shifts or who are expected to be present at certain times, using the "Add Employees Manually" button.
This is used in cases where an employee is on leave or not present during a specified period.

[Go to video 00:07:28](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=448s)

## Handling Leave and Updating Employee Data

### How to Handle Employee Data While on Leave
A leave status can be entered for a specific period — for example, from January 1 to June 30 — and this data is entered into the system so that the employee is excluded from attendance during those periods.

### Adjusting and Controlling Attendance Data
There is the ability to manually edit attendance and departure data as needed. It is noted that sometimes there may be issues related to the configuration or the system that require updating or correcting the data.

[Go to video 00:11:11](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=671s)

## Using the App and Modern Technologies for Attendance

### Electronic Attendance App
An electronic app can be used to record employee attendance, where the app sends the employee's geographic location and automatically registers check-in and check-out.

### Defining the Allowed Geographic Area
A specific geographic area can be defined (for example, a circle with a radius of 300–500 meters around the workplace) within which the employee is allowed to punch in, to ensure the employee is actually at the workplace when recording attendance.

[Go to video 00:12:58](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=778s)

## Importing Attendance Data from Excel Files

### Importance of the Employee Code (Attendance Code)
Each employee has a unique code linked to the fingerprint device. This code is used to link data imported from Excel files to the correct employee attendance record.
Example: employee Ahmed has code 1002, and this code must be present in the attendance file to accurately record his data.

### Excel File Format
- The first row is left as a header (it contains column headers).
- Dates are written in day/month/year format (without a leading zero for days or months less than 10).
- Time is written in 24-hour format (e.g., 09:03, 17:10).
- In some cases, AM or PM is appended to the time to specify the morning or evening period.

[Go to video 00:18:19](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=1099s)

### Handling Multiple Files from More Than One Fingerprint Device
When more than one fingerprint device exists, each device is assigned a unique code in the system to distinguish its data.
The data is later aggregated within the system, identifying the source of each punch (which device it came from).

[Go to video 00:20:44](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=1244s)

## Importing Data into the System and Saving Settings

### Steps for Saving Data Import Settings
- Go to System Settings > Payroll Settings > Human Resources > Payroll.
- Enter the date and time format appropriate for the imported file.
- Specify the file columns such as date, time, and employee code.
- Save the settings to simplify the import process later.

[Go to video 00:25:24](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=1524s)

### Importing the Attendance and Departure File
- Upload an Excel file from the computer.
- Use the "Import" button to load the data into the system.
- Verify that the columns match the previously saved settings.

[Go to video 00:28:28](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=1708s)

## Handling Overlapping Attendance Data and Double Shifts

### The Issue of Two Shifts on the Same Day
If an employee works two shifts on the same day, the first punch is recorded as check-in and the last punch as check-out, regardless of time-period overlap.
Example: an employee who came in the morning, went home, and returned to work in the evening — only the first entry and last exit are used to calculate attendance.

### Handling Forgotten Punches or Tampering Attempts
- Penalties exist for forgetting to punch.
- Cases of evasion or attempting to corrupt the fingerprint (e.g., using dirty fingers).
- Suggestions for addressing the lack of devices or internet connectivity, such as placing fingerprint devices at factory entrances and exits.

[Go to video 00:30:36](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=1836s)

## Adjusting Attendance According to Work Plans and Shift Changes

### Modifying Daily Work Plans
Work plans are adjusted based on circumstances, such as an employee arriving at a different time than their assigned shift, or switching to a different shift on a given day.
The system is configured to calculate attendance and departure based on the new plan for each day.

### Handling Early Departure or Lateness
The system is able to determine whether a given punch is a check-in or check-out based on shift times and scheduled work hours.

[Go to video 00:34:18](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=2058s)

## Details on Using System Buttons and Their Functions

### Using the "Punch" Button
- Allows you to take attendance and departure data from an Excel file and prepare it for processing inside the system.
- Can be used to reorganize columns in the file so they do not affect the data order.

### Handling Different Column Orders
If the column order in the file differs from what is expected, the columns can be reordered using this button to simplify the import.

[Go to video 00:39:12](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=2352s)

## Handling Attendance Data Where Time and Date Are in a Single Column

### Date and Time Format
In some cases, the date and time are written in the same cell, for example "01-01-2023 18:05 PM."
This data is handled by separating the date from the time within the system, or by using Excel tools before importing.

### Distinguishing Between Employee Check-In and Check-Out
Additional columns can be used to specify the punch type (check-in or check-out), or the system can determine this automatically based on the punch time relative to the employee's scheduled shift.

[Go to video 00:42:00](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=2520s)

## Handling Multiple Devices and Different Work Locations

### Importance of Knowing Where the Punch Was Recorded
- There may be several fingerprint devices in different locations within the company or its branches.
- The code for each device or location is recorded in the attendance file to facilitate tracking of employee movements.

### Using Device Information in Salary Distribution
Device information helps in distributing salaries according to the work location or project where the work was performed.

[Go to video 00:44:08](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=2648s)

## Processing Multiple Punches on the Same Day

### Using the First and Last Punch of the Day
Normally, the first punch of the day is considered the employee's check-in and the last punch is their check-out.
However, in some cases — such as working a night shift — this rule may need to be adjusted to match practical reality.

### Handling Day Differences Due to Night Shifts
The difference in day is taken into account between a night punch that occurred before midnight and one that occurred after midnight, to correctly identify the day for each punch.

[Go to video 00:45:57](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=2757s)

## Importance of Adjusting System Settings to Match Practical Reality

### Setting Time Intervals and Time Gaps
- Time intervals can be defined — for example, 5 minutes between two consecutive punches — to determine whether two consecutive punches count as a check-in/check-out pair or not.
- This helps handle cases such as an employee who enters and exits several times in a short period (e.g., to take a break).

### Handling Text Data and Text Fields in Excel Files
The video explains how to handle fields that may contain text, numbers, or extra spaces in attendance files to avoid import errors.

[Go to video 00:49:59](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=2999s)

## Questions and Practical Scenarios

### Data Volume and Its Impact on the System
Example: handling 1,500 employees over 30 days produces more than 45,000 records in the system, and how to manage such large volumes of data.

### Handling Unreasonable Client Requests
A real-world example of a client who wanted to combine various deductions under a single line item, and how the importance of separating deductions was explained to simplify management.
It is noted that cooperation between management and employees is essential to ensure the system's accuracy and successful implementation.

[Go to video 00:54:39](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=3279s)

## Closing and Final Questions

Several important points about the attendance and departure system were discussed, and the floor was opened for questions from attendees.
The importance of fully understanding the system was emphasized, along with avoiding hasty evaluation or decisions without knowing all the details.

[Go to video 00:57:29](https://www.youtube.com/watch?v=2KL8FjiXx4Q&t=3449s)

---

*This guide was prepared in detail to cover all aspects of the attendance and departure system as presented in the video, preserving the chronological order of information along with all technical and administrative details.*
