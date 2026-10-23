---
description: "A framework for answering whether Nama can integrate with another system, by direction of data flow (reading from or writing to Nama, or Nama calling the other system), with questions to ask and who bears the cost."
---
# Integration Scenarios Between Nama and Other Systems

## Introduction

We receive — on an almost daily basis — a question from customers and colleagues in sales, implementation, and technical support teams that goes something like:

> "Can we integrate Nama with such-and-such system?"

The question usually arrives without details, so answering it with a quick "yes" or "no" is inaccurate. Whether integration is possible — and how costly it might be — depends not only on Nama's capabilities, but also on the other system's capabilities, the direction of data flow between the two systems, and whether the other party provides documented APIs.

For this reason, we present in this document a systematic framework for answering that question — one that allows our colleagues in sales and implementation teams, and even the customer themselves, to ask the right questions before requesting a technical or financial proposal. This saves many rounds of back-and-forth and leads to a sound decision in less time.

::: tip Quick Summary
Nama is **open by default** for integration with other systems via a fully documented REST API following the OpenAPI 3.0 specification, available to every customer at no additional cost. Any additional cost — if it exists at all — typically originates from the other system's side, not ours.
:::

## The Central Question: In Which Direction Does the Data Flow?

Before exploring technical feasibility, we need to precisely identify the **direction of flow**. Each direction has its own requirements, and the party bearing the technical and financial burden differs accordingly. There are four main scenarios:

| # | Scenario | Source | Destination | Party Responsible for Providing the API |
|---|---|---|---|---|
| 1 | Other system reads from Nama | Nama | Other system | Nama (already available) |
| 2 | Other system writes to Nama | Other system | Nama | Nama (already available) |
| 3 | Nama writes to the other system | Nama | Other system | Other system |
| 4 | Nama reads from the other system | Other system | Nama | Other system (or its database) |

Before answering the customer's question, we must know **which of these scenarios they mean** — or which combination of them — since integration often requires more than one direction at once (for example: syncing items from Nama to an e-commerce store + receiving orders from the store into Nama).

## Scenario 1: The Other System Reads from Nama

This is the easiest and most common scenario. Nama already provides a complete REST API covering **all system entities**, with automatic documentation in OpenAPI 3.0 format and an interactive Swagger UI for exploring and testing the API directly.

Therefore, the near-ready answer in this scenario is:

> **Yes; the other system can read from Nama directly via our existing REST API, with no additional development on our part and no additional cost to the customer.**

It is sufficient for the other system's team to review the [Nama ERP REST API guide](./nama-erp-api.md), retrieve an API key from the "API Credentials" screen, and start calling the endpoints directly.

::: info When do we need additional development?
If the other system requires a non-standard shape of data — such as a custom field grouping, or a composite endpoint that merges data from multiple entities into a single response — then we need to develop a custom API, which falls under paid services (see the "Additional Costs" section below).
:::

### Questions to Ask the Customer in This Scenario

1. What entities does the other system need to read? (Sales invoices, items, customers, stock balances, …)
2. Will the reading be on-demand, periodic (polling), or event-driven (Webhook)?
3. Does it need full data, or only new/updated records?

## Scenario 2: The Other System Writes to Nama

This scenario is also fully supported without additional development on our part. The same REST API supports **Create, Update, and Delete** operations for all entities, with data validation, reference field management, and everything else documented in the [API guide](./nama-erp-api.md).

The answer here is also — in most cases:

> **Yes; the other system can write to Nama directly via the REST API, with no additional development and no additional costs.**

::: warning Keep in Mind
Every write operation passes through Nama's existing permissions and validation system (business rules, mandatory field checks, approvals…). If the other system sends incomplete data or data that violates business rules, the write will be rejected just as it would be if a user entered it manually. The other party's team should be informed of this so they understand the error messages they may receive.
:::

### Questions to Ask the Customer in This Scenario

1. What entities will the other system write?
2. What fields does it have for each entity? Are they sufficient to meet Nama's requirements (mandatory fields, reference fields…)?
3. How will error messages be handled? Does the other system have a retry mechanism, or will it rely on human intervention?

## Scenario 3: Nama Writes to the Other System

Here the equation changes fundamentally. Since Nama is the caller, it needs a **ready and well-defined API** on the other system's side to send data to. The most important question now is directed at the other party, not us:

> **Do you have a ready REST API to receive this data? What is its documentation?**

The best form — and the fastest to implement — is for the other party to have an **OpenAPI specification** (whether OpenAPI 3.0 or the earlier Swagger 2.0). Such a specification answers — automatically — most of the technical questions that may arise during development: What endpoints are available? What fields are in each request? What are the data types? What are the possible response codes? What is the authentication mechanism? And so on.

::: tip Why do we specifically insist on OpenAPI?
Because Nama generates OpenAPI for all its entities as mentioned in the [API guide](./nama-erp-api.md#API-Response-Structure), and we believe this is the **correct professional approach** for describing APIs in our current era. When both parties have a clear OpenAPI specification, integration time shrinks from weeks to days — even to hours in some cases.
:::

### If No OpenAPI Specification is Available

The absence of OpenAPI does not mean integration is impossible, but it does mean the other party must provide us with:

1. Complete written documentation for each endpoint (URL, HTTP method, request headers, body schema, response schema, error codes).
2. Practical examples of successful and failed requests (Request / Response samples).
3. A documented authentication mechanism (Bearer Token, API Key, OAuth2…).
4. A test environment (Sandbox / Staging) that we can test against before moving to production.

Without these elements, the work becomes guesswork, and time and cost estimates balloon unjustifiably.

### Questions to Ask the Customer in This Scenario

1. Does the other system provide a REST API that receives the required data?
2. Does it have documentation in OpenAPI / Swagger format? If not, what is the alternative?
3. What authentication mechanism is required? Does it need prior activation or agreement with the other party?
4. Are there rate limits on API calls?
5. Is there a test environment?

## Scenario 4: Nama Reads from the Other System

This scenario follows the same logic as Scenario 3 — Nama is the caller and a well-defined interface on the other side is required. However, there is a special case worth elaborating on: **an older system that has no REST API at all**.

### Special Case: A Legacy System with No REST API — Integration via Database

In the market — especially in large organizations — there are established legacy systems that provide no modern APIs (REST/SOAP); such as older versions of **Oracle E-Business Suite** and some custom-built ERPs written in older languages. In such cases, the customer may request that integration be done directly via the **database**.

#### The Two Fundamental Conditions for Accepting This Type of Integration

1. **The customer must provide database access** — preferably via a dedicated user account for Nama, with permissions limited to only the tables it actually needs.
2. **The other system's technical team must assist us** in understanding the tables and schema: Which tables do we read from? What are the relationships between them? What does each column mean? What flags indicate that a record is approved, cancelled, or in draft status?

::: danger Direct Writing to Another System's Database: A Red Line
We avoid — as a matter of principle — having Nama write directly into another system's database. Doing so bypasses all business rules, validations, and logical triggers built by that system's engineers, and typically leads to data corruption that is difficult to detect until it is too late.

We only accept this type of integration when two conditions are met simultaneously:

1. The other system's technical team explicitly states that this is their approved method for writing.
2. That same team assists us with the implementation details: Which tables do we write to? What are the mandatory columns? What are the computed fields? Are there triggers that must fire before/after writing? Are there sequences that must be called before insertion?

In most cases we end up doing **read-only** access from the other system's database, then writing appropriately back into Nama.
:::

#### Practical Example

One of the common scenarios when integrating with older Oracle EBS versions: Nama reads **invoice transactions and supplier balances** directly from EBS tables, then uses this data to enrich reports and screens inside Nama, without writing anything back.

#### Setting it up: the connection and the importer

The reading itself is done by the entity flow [SQLImporterFromDifferentDataSource](/entity-flows/core/SQLImporterFromDifferentDataSource.md). It works exactly like the ordinary SQL importer, except that its second parameter, **Data Source Name (Must be defined in context.xml)**, names a database connection other than Nama's own. That connection is declared once, as a resource in the application server's `context.xml`. This is a real one, pointing at an Oracle laboratory system:

```xml
<Resource name="jdbc/ldm" auth="Container" type="javax.sql.DataSource"
		factory="org.apache.tomcat.jdbc.pool.DataSourceFactory" maxActive="10000"
		maxIdle="20" maxWait="10000" username="username" password="password"
		driverClassName="net.sf.log4jdbc.DriverSpy" validationQuery="SELECT 1 FROM DUAL"
		testWhileIdle="true"
		url="jdbc:log4jdbc:oracle:thin:@192.168.80.80:1521:ldm"
		timeBetweenEvictionRunsMillis="24000000" testOnBorrow="true"/>
```

The flow's parameter would then be `jdbc/ldm`.

::: warning Oracle and long column names
Older Oracle versions refuse any column alias longer than 30 characters, and the importer's column names are field paths such as `details.quantity.quantity.primeQty.value` — well over the limit. This detail query, for example, is rejected by Oracle:

```sql
select '' ":-detail:details", r.REQUEST_ID "#description1",'1000001' "details.item.itemCode",'1000001' "details.item.item",rl.SERVICE_CODE "details.n1",rl.SERVICE_NAME "details.text1",'1' "details.quantity.quantity.primeQty.value",'101' "details.quantity.quantity.primeQty.uom",
rl.CASH_FEES "details.price.unitPrice",rl.DISCOUNT "details.price.discount1.value"
from Request_Services rl
left join Requests r on rl.REQUEST_ID = r.REQUEST_ID
where r.REQUEST_ID = '468273'
```

The way round it is a pair of columns for each long name: give the value a short alias (`c1`), and follow it immediately with a second column whose alias starts with `$alias$` and whose **value** is the real field path. Nama renames the first column to that path and drops the second:

```sql
select '' ":-detail:details", r.REQUEST_ID "#description1",'1000001' "details.item.itemCode",'1000001' "details.item.item",rl.SERVICE_CODE "details.n1",rl.SERVICE_NAME "details.text1",'1' "c1", 'details.quantity.quantity.primeQty.value' "$alias$1",
'101' "c2", 'details.quantity.quantity.primeQty.uom' "$alias$2",
rl.CASH_FEES "details.price.unitPrice",rl.DISCOUNT "details.price.discount1.value"
from Request_Services rl
left join Requests r on rl.REQUEST_ID = r.REQUEST_ID
where r.REQUEST_ID = '468273'
```

So `'1' "c1", 'details.quantity.quantity.primeQty.value' "$alias$1"` is read exactly as if you had written `'1' "details.quantity.quantity.primeQty.value"`. The `$alias$` column must always come straight after the column it names, and can never be the first column of the query.
:::

### Questions to Ask the Customer in the Database Integration Case

1. What is the database type and version? (Oracle, SQL Server, MySQL, …)
2. Is there documentation for the schema of the relevant tables?
3. Does the other system's technical team have the capacity to support us during analysis?
4. Will we be given secure access (VPN, IP Whitelisting, restricted user account…)?
5. Does the data we need update in real time, or is periodic synchronization sufficient?

## Who Bears the Cost?

In light of the above, the financial policy for integrating Nama with other systems can be summarized as follows:

### What is Available at No Additional Cost

* **Using Nama's standard REST API** for all entities and all CRUD operations: available to every customer who has the system, at no additional cost, with no development required on our part.
* **API documentation in OpenAPI 3.0 format and Swagger UI**: available automatically within the system.
* **Quick and simple technical assistance** for the other party's team (answering a question here and there, clarifying a specific request structure): we provide this free of charge in most cases as a matter of good technical partnership.

### What Requires a Financial Proposal

There are three common cases that require a separate financial proposal:

1. **Requesting specialized training** for the other party's development team; for example, the customer requests a full workshop explaining the integration mechanism and best practices.
2. **Developing a new custom API** in a specific shape not supported by the standard API; for example, the customer requests a composite endpoint that merges data from multiple entities into a single response in a custom format.
3. **Namasoft taking full responsibility for developing the calling side** (Scenario 3 or 4); meaning we — not the customer's team — write the code that calls the other party's API or reads from their database. This is full development work requiring analysis, design, implementation, and testing, and therefore falls under paid services.

::: info A Note on the Third Case
The cost of this case varies significantly depending on the quality of the other party's documentation. Integration with a system that has a clear OpenAPI Spec and a Sandbox environment may take a few days, while integration with a legacy system with no documentation may take weeks or months. Therefore, when building a financial proposal for this case, we should first ask the customer to provide the other party's documentation, so that the estimate is based on real information rather than assumptions.
:::

## A Quick Checklist for Colleagues Before Responding to the Customer

Before responding to the customer about whether integration is possible, and before building any financial proposal, we should clarify the following answers:

1. **Direction of flow**: Who reads from whom? And who writes to whom? (One of the four scenarios above, or a combination)
2. **Entities involved**: What entities will data flow through? (Invoices, items, customers, accounting entries, …)
3. **Timing frequency**: Real-time synchronization, periodic (Batch), or event-driven (Webhook)?
4. **Other party's capabilities**: Does it have a REST API? Does it have an OpenAPI Spec? Does it have a test environment?
5. **Authentication mechanism**: Supported by both sides? Does it require prior agreement?
6. **Other party's technical team**: Cooperative and available for discussion, or difficult to reach?
7. **Does it require database integration** (which should be treated as an exception, not the rule)?

Once we have complete answers to these questions, we can — with full confidence — give the customer a precise answer about integration feasibility, the estimated timeline, and the cost if any.

## Related References

* [Nama ERP REST API – Full Developer Guide](./nama-erp-api.md) — The complete technical guide for using Nama's API (in English).
* [Attendance Machines Integration](./attendance-machines-integration.md) — A practical example of integrating Nama with attendance machines.
