---
description: "The AI Tool Definition screen where administrators define the tools an AI assistant may call: basic data, access control, and the query, report, entity flow and system tool types."
entities: [AIToolDefinition]
menu: Artificial Intelligence → Master Files → AI Tool Definition
---

# AI Tool Definitions

When an AI assistant talks to Nama ERP — whether it is the assistant built into the system or an external client connected through the [MCP server](./ai-mcp-server.md) — it can do nothing on its own. Every capability the assistant has is a **tool** that a system administrator defined beforehand: a query that answers a specific question, a report run with parameters, an entity flow executed on a document, or one of Nama's ready-made system tools.

The **AI Tool Definition** screen in the AI module is where these tools are defined. Each record on the screen becomes a tool (or a set of tools) the language model can call, along with a description that tells it when and how to use it.

::: info Required License
This screen requires the AI module to be installed and licensed.
:::

![The AI Tool Definition screen — main page and access-control grid](../../ar/modules/ai/images/ai-tool-definition-main-en.png)

## Basic Data

The screen header identifies the tool and controls its general behavior:

| Field | Role |
|---|---|
| **Tool Type** | The kind of tool: `Query Based`, `Report Based`, `Entity Flow Based`, or `System Tool` — this decides which page of the screen you will use |
| **Alt Code** | The name the tool is advertised under to the language model for the first three types (query/report/entity flow) |
| **Tool Name (Must Be Unique)** | For System Tools, used as the prefix of the generated tool names — see "Tool Naming" below |
| **Description** | The tool description. This is **what the language model reads to decide when and how to call the tool** — the more precise the description, the better the model uses the tool |
| **In Active** | Disables the tool without deleting it — an inactive tool is never shown to the model |

::: tip When does a tool appear to the assistant?
A tool is only offered to the language model when it is **committed** and not inactive. Later edits or deletions are picked up automatically — the tool list is rebuilt on the next connection, no restart needed.
:::

### Tool Naming

- **Query, report, and entity-flow tools** are advertised under their **Alt Code** as-is.
- **System Tools**: each line in the tools grid may generate one or more tools, and each tool name is composed of a prefix plus the internal tool name. The prefix is the first non-empty value of **Tool Name**, then **Alt Code**, then the record **code**, followed by an underscore. For example, a record whose code is `import` containing the `AITReadRecordTools` tool generates two tools, `import_FindRecords` and `import_GetRecord`.
- **Every tool**, of every type, also takes five optional arguments you never define yourself: `loginLegalEntity`, `loginSector`, `loginBranch`, `loginDepartment` and `loginAnalysisSet`. They run the call as if the user had logged in to those dimensions — see [Choosing the login context](./ai-mcp-server.md#Choosing-the-login-context).

## Security (Access Control)

The **Security (Access Control)** grid decides who may execute the tool. Each line holds:

- **Applicable For**: a user, a security profile, or a user group.
- **Allow / Prevent**.

When the tool is executed, the system looks for the first line matching the current user in this order: the **user's** own line first, then the user's **security profile** line, then the **group** line. The first matching line decides. If the grid is empty (or no line matches), the tool is available to everyone.

::: warning Access is checked twice
A client is shown only the tools its user may run: a tool this grid prevents for the user does not appear in the user's tool list at all, in an MCP client or in the in-app assistant. So "user X does not see tool Y" is usually this grid, not a fault. **Execution** is checked again as well: a call to a prevented tool is rejected with a clear message. Record-level security and dimensions (legal entity, branch, ...) also still apply to everything the tool reads or writes, because everything goes through the system's standard service gates.
:::

## Type 1: Query Based

The simplest and most common tool type: a SQL query written by the administrator, which the language model can run with parameters it chooses.

On the **Query Based** page:

1. Write the query in the **Query** field, referencing each parameter with the `{paramName}` placeholder syntax (such as `{fromDate}` and `{toDate}`).
2. Define each parameter in the **Query Parameters** grid.
3. In **Description**, explain when this tool should be used and what it returns.

At execution time the query runs with the parameter values the model sent, and the result is returned to it as JSON (column names and row values).

::: tip Optional and conditional parameters
Query parameters go through the same engine as field-map SQL, so the full [Advanced SQL Parameter Syntax](../../entity-flows/core/ai-generated-field-maps-documentation.md#Advanced-SQL-Parameter-Syntax) is available — not just the plain `{fromDate}` placeholder. This matters because an AI tool usually exposes many *optional* filters, and these helpers let a single query handle them whether or not the model sends a value:

- `{x>=,valueDate,fromDate}` — a comparison that turns into `1 = 1` (no-op) when the model omits `fromDate`, instead of an `({fromDate} IS NULL OR ...)` wrapper around every filter.
- `{xBetween,column,fromDate,toDate}` — a range where either bound may be missing.
- `{xIN,column,codes}` — an IN clause that gracefully tolerates an empty list.
- `{!paramName}` — direct literal substitution (for dynamic table/column names; never for untrusted input).
:::

![The Query Based page and the query parameters grid](../../ar/modules/ai/images/ai-tool-definition-query-en.png)

### The Parameters Grid

Each line in the parameters grid defines one parameter:

| Column | Role |
|---|---|
| **Param Id** | The parameter identifier — must match the name used in the query, and cannot be repeated |
| **Parameter Description** | The description the model reads to know what to send |
| **Required** | Whether the parameter is mandatory |
| **Field Type** | The value type: `Text`, `Number`, `Date`, or `Reference` |
| **Allowed Values** / **Allowed Values Ar** / **Allowed Values En** | The list of allowed values (if any) with their translations — shown to the model inside the parameter description so it sticks to them |
| **Supported Reference Type** | For `Reference` parameters: the entity type the parameter points to (such as `Customer`) |

Notes on the types:

- **Date**: the model sends dates in the `yyyy-MM-dd HH:mm` format (this format is automatically appended to the parameter description).
- **Reference**: the model can send a record code or id, which is looked up directly. If it sends free text instead (such as an approximate customer name) and the entity type is indexed in the records-embedding service, the system performs a semantic search and returns the closest records — and when several match, the model is asked to pick a specific one.

## Type 2: Report Based

Turns any existing report definition in the system into a tool the model can run and read the output of.

On the **Report Based** page:

1. Pick the report in the **Report Definition** field.
2. Define the report parameters in the **Report Parameters** grid — one line per report parameter, with **Param Id** matching the report's parameter id.
3. For each parameter, choose how it is filled in the **AI Parameter Completion** column:
   - **Fill By AI**: the language model chooses the value itself based on the user's request (with the parameter description and allowed values, as in query tools).
   - **Fill Manually**: the value is fixed in the definition itself — a literal value, a reference, a date/time, or a dynamic value, in the same style as report parameters in task schedules — and is never shown to the model.

At execution time the report runs with the collected parameters, and its output is returned to the model **as text** for it to read and build its answer on.

![The Report Based page and the report parameters grid](../../ar/modules/ai/images/ai-tool-definition-report-en.png)

::: warning Picking the report fills the grid once — and freezes the drop-down labels
Choosing a report in **Report Definition** rebuilds the **Report Parameters** grid from the report's own design: one line per parameter, each with its type, whether it is required, and — for a parameter that offers a drop-down — its values in **Allowed Values** together with their Arabic and English labels in **Arabic Allowed Values** and **English Allowed Values**.

Those labels are copied as they read at that moment and are never looked up again. They are what the model is told the parameter accepts, so if someone later renames a value through the Translation OverRider, the report's own prompt shows the new label while the tool keeps offering the model the old one, with nothing to warn you. The same applies to a report whose parameters change after the tool was built: the grid does not follow.

The cure for both is to pick the report in **Report Definition** again, which rebuilds the grid from scratch. Because it rebuilds *every* line, anything you typed into the grid yourself — **Fill Manually** values, parameter descriptions — is lost and has to be entered again, so note those down before you re-pick.
:::

## Type 3: Entity Flow Based

Lets the model **perform an action** in the system through a predefined entity flow — here the AI does not just read, it makes changes.

On the **Entity Flow Based** page:

1. Pick the flow in the **Entity Flow** field.
2. Choose the **Entity Type Strategy** — which record the flow runs on:

| Strategy | Meaning |
|---|---|
| **Runs On Single Entity Type** | Runs on one specific entity type set in **Run Entity Flow On Type** |
| **Runs On Entity Type List** | Runs on one of the types listed in **Run Entity Flow On Entity Type List**; the model picks which |
| **Runs On Any Document Type** | Runs on any document type |
| **Runs On Any Master File Type** | Runs on any master file type |
| **Runs On Any Type** | Runs on any entity type |
| **Does Not Need A Record** | Needs no record — the flow executes directly |

3. Define any extra parameters the flow needs in the **Entity Flow Parameters** grid (same columns as query parameters).

When the strategy requires a record, the system automatically adds two parameters for the model: the target entity type (unless fixed in the definition) and the record code or id. At execution time the record is fetched, the parameter values are placed into the record's map, and the flow runs — any flow failure is returned to the model as an error message.

![The Entity Flow Based page and the flow parameters grid](../../ar/modules/ai/images/ai-tool-definition-entity-flow-en.png)

## Type 4: System Tools

Ready-made tools built into Nama, added by the administrator as lines in the **System Tools Configuration** grid: each line holds a **Tool Class Name** plus up to five text parameters (Parameter 1–5) that configure the tool when needed, and description/title fields that are filled automatically.

![The System Tool page and the System Tools Configuration grid](../../ar/modules/ai/images/ai-tool-definition-system-tools-en.png)

The **Tool Class Name** field has a suggestion list showing **every system tool available in the system** — you pick one by name.

::: warning A class is not a tool
What you pick in **Tool Class Name** is a *class*, and most classes generate several tools: pick `AITReadRecordTools` and the model ends up with two tools, `<prefix>FindRecords` and `<prefix>GetRecord`. The suggestion list also offers the class under its full name — `com.namasoft.modules.ai.services.tools.AITReadRecordTools` — so when you are looking for a particular tool, search the **Generated tool(s)** column of the tables below and add the class in its row; typing the tool's own name into the field finds nothing.
:::

::: warning Tools that disappear after an upgrade
Tool classes are occasionally renamed or split in two between releases. A line saved under the old name keeps it after the upgrade, and that line's tools quietly stop appearing — in the in-app assistant and in every MCP client alike. The other lines of the same definition are not affected, and the server log names the line that was skipped.

So when some tools go missing after an upgrade, open the definition and look for a line whose **Tool Class Name** is no longer offered by the field's suggestion list, and pick the class that replaced it. Saving the definition refuses such a line anyway, with:

*There is no AI tool class named {0}, choose one of the classes suggested on the field*

That message has no Arabic translation, so it appears in English on Arabic screens too.
:::

### The buttons above the grid

Picking classes one by one from the suggestion list is slow, and a tool group is rarely useful half-added — so the page carries a row of buttons, each adding a whole group in one press:

| Button | What it adds | Who it is for |
|---|---|---|
| **Add Export Tools** | 4 classes, 12 tools — understand an entity, search and read records, import records, upload and download attachment files | anyone connecting an external MCP client to read and write data |
| **Add Report Tools** | 3 classes, 7 tools — read a report's SQL, run it, correct it; run a dashboard and check what each chart shows | administrators and support staff chasing wrong figures in a report or a dashboard |
| **Add Term and Config Tools** | 2 classes, 4 tools — read and change document terms and configuration entries | administrators who configure documents |
| **Add Discussion Tools** | 2 classes, 2 tools — add a discussion to a record, list a record's discussions | an in-app assistant that comments on records |

A button adds only the lines that are not on the definition yet and fills each line's description automatically, so pressing two buttons adds up and pressing the same one twice changes nothing. Delete any line you do not want afterwards — that is how a definition is kept read-only.

#### Record export/import tools (Add Export Tools)

The most-used group with external MCP clients: four classes generating twelve tools between them, which let a client read system data, import new records as JSON, and move attachment files in and out.

| Tool Class Name | Generated tool(s) | Purpose |
|---|---|---|
| `AITEntityMetadataTools` | `<prefix>ResolveEntityType`, `<prefix>DescribeFields`, `<prefix>GetEnumValues`, `<prefix>GetEntitySchema` and `<prefix>SearchByTranslation` | Everything a client needs to understand an entity before it queries it: resolve an Arabic or English term to an entity type, list the field ids that can be used as search criteria, list the allowed values of enum fields, return the physical table and column names behind the entity, and resolve a term to entity types, fields and enum values at once |
| `AITReadRecordTools` | `<prefix>FindRecords` and `<prefix>GetRecord` | Search records by entity type and criteria, and read a single record as JSON |
| `AITImportTools` | `<prefix>GetImportSchema` and `<prefix>ImportRecord` | Get the JSON import schema of an entity type, and import one or more records into the system |
| `AITAttachmentTools` | `<prefix>PrepareAttachmentUpload`, `<prefix>PrepareAttachmentDownload` and `<prefix>PrepareAttachmentDownloadById` | Hand the assistant a one-time link to upload a file that `ImportRecord` then attaches to a record, and a one-time link to download a file already attached to a record — named either by its record and field, or by the attachment id that `GetRecord` and `FindRecords` return |

The details of these tools — their parameters and usage examples — are documented on the [Nama ERP MCP Server](./ai-mcp-server.md) page.

::: info Attachments need an assistant that can run commands
An MCP tool call carries text only, so the attachment tools do not pass the file itself: they hand the assistant a link, and the assistant sends or fetches the file with `curl`. That suits assistants that can run commands on your machine — Claude Code, or the Code tab of Claude Desktop. See [Moving attachment files](./ai-mcp-server.md#Moving-attachment-files).
:::

#### Report tools (Add Report Tools)

Almost every question about a report — why is this total wrong, why is this row missing, which parameter drives that filter — is a question about its query and its parameters, and that is a few hundred bytes out of a report file of 70–120 KB. These two classes let the assistant read exactly that much, run the report to see the effect, and correct the query when the query is what is wrong.

| Tool Class Name | Generated tool(s) | Purpose |
|---|---|---|
| `AITReportReadTools` | `<prefix>GetReportQuery` and `<prefix>RunReport` | Return a report's parameters and the SQL of its own query, of each of its sub-datasets and of each of its subreports; and run the report with given parameters and return its output |
| `AITUpdateReportTools` | `<prefix>UpdateReportQuery` and `<prefix>UpdateReportContent` | Replace the SQL of one dataset without touching the rest of the report file, or replace a whole report file |

A report runs with the permissions of the user the tool acts for, and its parameters are checked before it runs rather than after. Dates are day-first (`31-01-2026`), unlike the record tools. A date filter shown as one range picker is the exception: it takes a single value on the picker's own parameter, `2026-07-01@2026-07-31`, and the two hidden date parameters behind the picker are refused if sent directly. A parameter that points at a record — a fiscal period, a legal entity, a branch — takes that record's **code** as readily as its id: the tool looks the record up and hands the report the form that particular parameter reads.

::: warning A report that filters on nothing answers with everything
This check matters more than it sounds. When a report's filters do not reach it, nothing fails and nothing warns: it prints the same headings, the same columns and a full page of entirely plausible figures — for every period and every branch instead of the one that was asked for — and the parameters still appear in its own header. Somebody comparing those figures against a customer's question reaches a confident, wrong conclusion.

So `RunReport` refuses the run instead of answering with unfiltered figures: when an id is not a parameter of that report, when a value cannot be applied to the parameter it was given for, and when a parameter that points at a record names one that does not exist. The answer also repeats the parameters that were actually applied, as they were sent to the report, so the figures can be checked against what was asked for rather than taken on trust. A parameter that points at a record is repeated as the whole record reference — its id, type and code run together — and that is not what the report filters on: the report takes only the part it reads, usually the code.
:::

::: tip Read the numbers, don't look at a picture
Ask `RunReport` for **JSON** whenever the figures matter: one row per printed line, tagged with its band (column header, detail, group footer, summary …), its cells lined up with the column headers, and numbers as plain numbers — the grand totals are in the summary rows at the end. **CSV** is the report's grid as comma-separated values, **TXT** (the default) the page laid out as plain text, and **HTML** the rendered page, by far the largest. These text formats come back inside the answer itself: the first 20,000 characters by default (`maxChars`, up to 200,000), or with `tailChars` the *last* that many characters instead — which is where a report's totals are. `language` picks Arabic (the default) or English labels. The binary formats — PDF, XLSX, DOCX, RTF, ODT, ODS, PPTX, XLS — are stored on the server instead and answered with a **single-use link that expires after thirty minutes**, for a person to open: the link serves the file once and deletes it. Set `ai-file-download-base-url` in `nama.properties` if those links should carry the server's public address rather than a path.
:::

::: warning A report is never saved unless it still compiles
`UpdateReportQuery` and `UpdateReportContent` compile the report before sending it, and refuse to save anything that does not compile — the answer comes back with the compiler's own complaint and the stored report untouched, so a bad query costs a failed call rather than a broken report. The file is rewritten by JasperReports itself: the design survives exactly, but XML comments (the Jaspersoft Studio banner among them) and the original indentation do not.
:::

#### Dashboard tools (Add Report Tools)

A dashboard widget is written blind. Its SQL and its chart configuration are edited as text, and nothing says that the query returned no rows, that a join counted every invoice twice, or that the cross filter for the branch never reached the query — until somebody opens the dashboard and looks. These three tools let the assistant do the looking: they run a dashboard or a single widget and answer with what each chart would draw, as numbers it can check.

| Tool Class Name | Generated tool(s) | Purpose |
|---|---|---|
| `AITDashboardTools` | `<prefix>RunDashboard`, `<prefix>RunDashboardWidget` and `<prefix>PreviewDashboardWidget` | Run a dashboard (or one of its tabs) and return what every widget shows; run one widget and also return the SQL it executed; and run a widget as it would be after a change to its SQL or chart configuration, without saving anything |

The answer is what the server rendered, not the raw query output: a chart's categories and its series with their values (after its sorting, grouping and Top-N have been applied), a table's columns and rows, a metrics card's values, and the error message of any widget that failed. Colours, fonts and the rest of the styling are left out, because they are most of the bytes and none of the meaning. Long lists are cut at the number of rows the call asks for, and the full length is reported next to them. A dashboard runs with the permissions of the user the tool acts for, and its cross filter defaults apply exactly as they do on screen; the answer lists the cross filters and the values that were applied, and the tabs of a tabbed dashboard.

Cross filters and widget parameters are passed by code — the cross filter's code, not its title. A filter that points at a record takes the record's **code** as readily as its id, so `{"nileLE":"01","nileFrom":"01-03-2026"}` filters a dashboard to legal entity `01` for March onwards; a filter that takes several values takes a list, `{"nileLE":["01","03"]}`. A filter that belongs to one widget only is keyed by the filter code and the widget code, `nileLE@nile-sales-branch`.

::: tip See the SQL that actually ran
The SQL stored on a widget is only where the query starts. By the time it reaches the database the cross filter conditions have been written into it, a wizard widget's query has been rebuilt, and the parameters have been bound — so reading the stored SQL does not tell you why a chart is empty. `RunDashboardWidget` and `PreviewDashboardWidget` return every statement the widget executed (a period comparison runs two), each with:

- the SQL as it reached the database, with the parameters still written as `{name}`;
- the same statement with every value written in, ready to paste into the read-only SQL tool;
- the value each parameter received — a parameter that shows as `NULL` is one that never got a value;
- the columns and rows the database returned, before the chart grouped, sorted or cut them;
- how long it took, and the database's own error message when it failed.

Comparing those rows with the chart's series tells a wrong query from a wrong chart configuration at a glance. Seeing the SQL needs the right to edit dashboard widgets; without it the widget's figures are still returned, and the answer says why the statements are missing. `RunDashboard` does not return SQL — run the widget in question on its own.
:::

`PreviewDashboardWidget` starts from a saved widget, from scratch, or both: it takes the widget's code and a set of changes — typically a new SQL, a new chart configuration or a different widget type — runs the result with the parameters and cross filters given, and returns what it would show. Nothing is saved, so the assistant can try a query, read the figures, correct it and try again, and save the widget with `ImportRecord` only once the numbers are right. Only the widget's own text, number and yes/no fields can be changed this way; its grids (inputs, cross filter bindings) are taken from the saved widget as they are.

::: warning `chartConfigJSON` goes to `ImportRecord` as a string
When the widget is saved with `ImportRecord`, its `chartConfigJSON` must be sent as a JSON **string** — the whole configuration stringified, `"chartConfigJSON":"{\"series\":[…]}"` — exactly as `PreviewDashboardWidget` takes it. A nested object is read as a reference to another record, and the widget saves without a usable chart configuration. The nested form shown in the [BI technical reference](/platform/bi/bi-module-technical-reference.md#10-Bulk-Import-JSON-Format) works only in an import file loaded with **Import Records**.
:::

::: info A parameter the widget does not have is reported, not refused
A widget's parameters are the lines of its **inputs** grid. A value sent for an id that is not one of them cannot reach the query, so the widget runs without it — and a `{name}` in its SQL that matches no input is bound to `NULL`, which usually means no rows at all. The widget tools say so in their answer, naming the parameters that were not applied, so an empty chart is not mistaken for a period with no sales.
:::

#### Term and configuration tools (Add Term and Config Tools)

Document terms and configuration entries are settings rather than records, so the record tools above cannot reach them at all — these two classes are the only way an assistant reads or changes them.

| Tool Class Name | Generated tool(s) | Purpose |
|---|---|---|
| `AITTermAndConfigReadTools` | `<prefix>ListTermAndConfigTargets`, `<prefix>GetTermOrConfigSchema` and `<prefix>ReadTermOrConfig` | List the document terms and configuration entries that can be configured, describe one target's settings the way its screen groups them, and read the values it currently holds |
| `AITTermAndConfigWriteTools` | `<prefix>UpdateTermOrConfig` | Change the settings of one document term or configuration entry |

#### Discussion tools (Add Discussion Tools)

| Tool Class Name | Generated tool(s) | Purpose |
|---|---|---|
| `AITAddDiscussionToRecord` | `<prefix>AddDiscussionToRecord` | Add a discussion (comment) to any record |
| `AITListDiscussionsOfARecord` | `<prefix>ListDiscussionsForARecord` | List the discussions of a given record |

### Other system tools

The remaining ready-made tools are single classes with no group of their own; add them by picking the class name from the **Tool Class Name** suggestion list:

| Tool Class Name | Generated tool(s) | Purpose |
|---|---|---|
| `AITCountRecordsTools` | `<prefix>countEntities` and `<prefix>countEntitiesCreatedWithinDateRange` | Count records of an entity type — in total, or between two dates |
| `AINamaERPDocsTool` | `<prefix>erpDocs` | Search the Nama ERP documentation and return the passages closest to the question |
| `AITAppVersionTools` | `<prefix>GetAppVersion` | Return the build this server is running — the twelve-digit build stamp and the date and time behind it |
| `AITReadOnlySQLQuery` | `<prefix>runReadOnlySqlQuery` | Run a single read-only SQL `SELECT` against the database and return the rows — see the warning below |
| `AITViewAppLogTools` | `<prefix>ViewAppLog` | Return the last lines of one of the server's application log files — what to read when an operation failed with a message that does not say why. `logFile` picks the file (`namasoft`, the general log, by default; also `nama-services`, `hibernate`, `spy`, `gui`, `performance`, `reportPerformance`, `replication`, `mail`, `service`, `root` and `other`) and `lines` how many, 500 by default and 2000 at most. **Administrators only**, whatever the access-control grid says, because a log carries whatever data passed through the server |

::: tip Before concluding that a feature is missing
Nama ships monthly, and both this documentation and the [release notes](/release-notes/) describe the newest build. A server last upgraded before a feature was released does not have it, and no amount of configuration will make it appear — so an assistant that cannot date the server it is talking to will happily spend an afternoon hunting for a setting that was never there. `GetAppVersion` answers with the build stamp, the date it stands for and the month whose release notes that build carries, which is what turns "let me find that setting for you" into "that arrived in the March release, and this server is on January".
:::

::: tip Building a read-only assistant
Reading and writing are deliberately kept in separate classes so you can leave the writing ones out: `AITTermAndConfigReadTools` without `AITTermAndConfigWriteTools` lets the assistant explain how a document term is configured while having no way to change it, and the same holds for `AITReportReadTools` without `AITUpdateReportTools`, and for `AITEntityMetadataTools` and `AITReadRecordTools` without `AITImportTools`. Each group button adds both halves, so on a read-only definition press the button and then delete the writing line.
:::

::: info Module-specific system tools
Some modules add their own system tools that appear in the same list. For example, the HR module provides tools for an employee's vacation balance (for the current employee or any employee). The available set grows with the modules you have installed and licensed.
:::

::: info The ERP docs tool needs the internet, not the vector store
`AINamaERPDocsTool` sends the question to Nama's documentation search service, so it needs nothing from the vector store — only for the server to reach `https://nlm.namasoft.com` over HTTPS. When it cannot, the tool answers *Nama ERP documentation search is currently unavailable* followed by the reason.
:::

::: danger The read-only SQL tool ignores record permissions
Everything else on this screen runs through the standard gates, so a tool never shows a user more than the screens would. `AITReadOnlySQLQuery` is the exception: it reads the database directly and therefore sees every legal entity, branch, salary and price regardless of what its user may open. Only a single `SELECT` is accepted and the statement runs in a transaction that is always rolled back, so it can never change anything — but restrict it to administrators through the **Security (Access Control)** grid. Its first parameter column sets the default maximum rows per call (200 by default, 5000 at most). See [Getting Better Support with an AI Coding Agent](./ai-assisted-support.md) for how support teams use it.
:::

::: info The statement is checked by JSqlParser 5.0 first
Before it runs, the statement is validated with **JSqlParser 5.0**, which is stricter than SQL Server itself: anything JSqlParser cannot parse is rejected even if the server would run it. As an example, JSqlParser rejects `FOR XML PATH(''), TYPE).value(...)` and `ORDER BY` inside a `FOR XML PATH` subquery, so use `STRING_AGG(expr, ', ') WITHIN GROUP (ORDER BY …)` for string aggregation. Braces `{…}` inside string literals are passed through to the database unchanged.
:::

### Server administration tools

Most of what an administrator does on the **utilities** page (`/utils`) — checking who is logged in, what the server is busy with, whether a new release is out — is a question an assistant can answer just as well, and the few actions on that page that are safe at any time are things it can take for you. Two classes bring them to the assistant:

| Tool Class Name | Generated tool(s) | Purpose |
|---|---|---|
| `AITServerAdminTools` | `<prefix>ListLoggedInUsers`, `<prefix>ListRunningTasks`, `<prefix>ListCaches`, `<prefix>ListWebSocketSessions`, `<prefix>ListCostProcessingRequests`, `<prefix>ListPendingAsyncSaves` and `<prefix>CheckForNewRelease` | Look without touching: the users logged in now, the tasks running (both server tasks and those started from screens), the in-memory caches, the open WebSocket connections, the queued inventory cost recalculations, the supply chain document lines still being saved in the background, and which release the server runs against the latest one available to it |
| | `<prefix>EvictCaches`, `<prefix>ReloadConfiguration`, `<prefix>RegenerateDefaultUIs`, `<prefix>RegenerateDefaultUIsForTypes`, `<prefix>RefreshCriticalErrors` and `<prefix>KillReport` | The safe actions: clear the caches of screens and services, re-read the settings file, translations and application configuration without a restart, regenerate the default screens — all of them, or only those of some entity types — (keeping users' screen modifiers), re-check the critical errors after fixing one, and stop a runaway report |
| `AITServerDangerousTools` | `<prefix>UpgradeToLatestRelease` | Upgrade the server to the latest release of its sub-release — which stops Tomcat and disconnects every user. See below |

Both classes are for **administrators only**. The check is made on the user the call signs in as, every time, and the access-control grid cannot widen it: a definition that lists these classes simply gets a refusal back when a non-administrator calls them. Every call is also written to the **Actions History**, under the operation's name prefixed with `MCP:`.

Regenerating the default screens takes several minutes, so `RegenerateDefaultUIs` starts it and answers at once; the assistant can follow it with `ListRunningTasks`. Only one regeneration runs at a time — a second one started while the first is still running is refused, and the refusal is written to the application log.

When you know which screens are affected, prefer `RegenerateDefaultUIsForTypes`: it does what **Regenerate GUI For Applicable Types Only** does on a screen modifier or a custom list view, in seconds rather than minutes, and waits until it is done. Give it `entityTypes` (comma-separated, such as `SalesInvoice,SalesReturn`), `screenModifierCode` (the types that screen modifier applies to) or `customListViewCode` (the custom list view's types, including those on its "added to" lines) — any mix, but at least one.

::: danger The upgrade is confirmed by you, not by the assistant
An upgrade stops the server: Tomcat shuts down, every user is disconnected and loses unsaved work, and nobody can work for several minutes. So `UpgradeToLatestRelease` never goes ahead on the assistant's say-so. Before it does anything, your MCP client shows **you** a confirmation form — the customer, the release it moves from and to, the users logged in and the tasks running right now — with a choice that defaults to **Cancel** and a box where you must **type the customer name exactly**. The upgrade starts only if you choose **Upgrade now** and the name matches; declining, closing the form, a mistyped name, or two minutes without an answer all leave the server untouched.

The form is shown by the client, not written by the assistant, and your answer goes straight back to the server, so an assistant cannot fill it in on your behalf. That needs a client that can show such forms (MCP *elicitation*): Claude Code does. A client that cannot — including the [in-app AI assistant](./ai-assistant.md) — gets a refusal and nothing happens. The tool also refuses when there is nothing to upgrade to, or when the server's support contract has expired.

Once the upgrade has started the server stops answering for a while; when it is back, `GetAppVersion` (from `AITAppVersionTools`) confirms the release it now runs.
:::

::: tip Keep the dangerous class off by default
No button adds either class — pick them by name from the **Tool Class Name** suggestion list. Give `AITServerDangerousTools` its own definition, restricted to the administrators who are actually allowed to upgrade, rather than adding it next to everyday tools. Servers on releases older than 20261004 do not have these tools.
:::

## Where Are These Tools Used?

- **[The in-app AI assistant](./ai-assistant.md)** calls the tools while chatting with the user to answer questions and carry out requests.
- **External MCP clients**: any client that speaks the MCP protocol — such as Claude Desktop or Claude Code — can connect to the system and use the same tools under the same permissions. See [Nama ERP MCP Server](./ai-mcp-server.md).
