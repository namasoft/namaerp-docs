# The In-System AI Assistant

Besides connecting external clients through the [MCP server](./ai-mcp-server.md), Nama ERP ships with a **built-in AI assistant** that works right inside the interface: a chat window the user opens to ask questions in natural language — Arabic or English — and the assistant answers from the system's actual data, runs reports, and even performs actions, using the same [AI tools](./ai-tool-definitions.md) the administrator defined and under the same permissions as the user sitting at the screen.

::: info Requirements
- The AI module installed and licensed.
- At least one chat model defined in [AI Module Configuration](./ai-configuration.md).
- The semantic index set up in the same settings: the **Open AI Embedding Key**, the **Text Embedding Model** and the **Vector Store URI** (see [Semantic Search and Embedding Setup](./ai-configuration.md#Semantic-Search-and-Embedding-Setup)). Without them the assistant does not start, and a new chat answers *AI vector store is not configured* (in English, also on Arabic screens). External MCP clients do not need this.
- At least one committed tool in the [AI Tool Definition](./ai-tool-definitions.md) screen (otherwise the assistant chats but cannot reach system data).
:::

## Where to Find the Assistant

The AI assistant icon (**Nama AI Assistant**) is shown in the system's **top toolbar** and opens the chat window at any time. The assistant also appears:

- **Inside report screens**: open the chat while viewing a report, and the displayed report output becomes **context** the assistant can read and analyze — ask it to summarize the results or highlight the top values.
- **Inside record edit screens**: to discuss the record open in front of you.

## What Can the Assistant Do?

The assistant has no capability of its own — everything it does goes through a **tool** defined in the AI Tool Definition screen. So once you define query, report, entity-flow, and system tools, the assistant can:

- Answer questions from your data ("How many sales invoices this month?", "Who are the top five customers by balance?").
- Run a report with parameters it infers from your question, and read its output.
- Perform an action on a document through an entity flow (approve, post, ...).
- Read a record or import new records, if the import tools are enabled.
- Search the Nama ERP documentation, if the docs system tool is enabled.

In all cases the user's permissions and dimensions (legal entity, branch, ...) apply: the assistant only sees what the user sees, and only does what the user is allowed to do.

## Working With the Chat Window

### Choosing the Model

At the top of the window is a drop-down to choose the **chat model**, listing the models defined in [Module Configuration](./ai-configuration.md). You can switch models by task — a faster model for simple questions and a stronger one for complex analysis.

### Chat History

The system saves your conversations in **sessions** you can return to later. From the chat side panel:

- **New chat**: start a clean session with no prior context.
- **History**: browse your previous sessions to resume any of them.

Each user sees only their own sessions.

### Rating Answers (Like / Dislike)

Below each assistant reply are **Like** and **Dislike** buttons. Your rating is saved with the message and helps track answer quality and refine tool setup and descriptions over time.

### Expert Mode

In normal mode you see the conversation as a simple dialog (your question and the assistant's answer). **Expert Mode** reveals what happens behind the scenes and classifies every message:

| Message Type | Meaning |
|---|---|
| **User** | Your own message |
| **Assistant** | The language model's reply |
| **System** | The system instructions guiding the model |
| **Tool Execution Result** | The output of a tool the model called |

This mode is very useful for technical support and power users: it reveals **which tool the assistant called, with what parameters, and what it returned**, making it easy to diagnose an unexpected answer — is the problem in the tool's description? the query? the permissions?

### The Available Tools List

The side panel shows the tools available to the assistant in this session — the same committed, non-inactive tools this user is allowed to use in the AI Tool Definition screen. If a tool you expect is missing, it is most likely not committed, inactive, or prevented for the user by the access-control grid.

## How the assistant picks its tools

The assistant does not hand the model every tool on the list. For each message you send, it compares your words with the name, description and parameters of every tool — the semantic index keeps a copy of each tool for exactly this — and offers the model only the few closest ones, never more than four, after dropping any the user is not allowed to run. Two helpers come with every message on top of those: one that finds the records your message mentions, and one that works out which entity type you mean.

That is why a tool can be on the list and still never be called. If the assistant answers without the tool you expected, look at the tool's **Description** before anything else: it has to read like the questions people actually ask. A report tool described only as "Customer balances report" is a weak match for "who owes us the most this month"; a description that says what the report answers, in the words a user would use, gets chosen. Expert Mode shows which tools were called for each message.

## When the Assistant Can't Find Something

Many tools take a **reference** (customer, item, ...). If the user sends an approximate name instead of the code, the assistant relies on **semantic search** to find the closest records — provided the entity type is indexed in [embedding configuration](./ai-configuration.md#Semantic-Search-and-Embedding-Setup). Without it the assistant still works with explicit codes, but it does not "guess" the reference from free text.

## The Assistant and the MCP Server

The in-system assistant and external MCP clients are **two faces of one base**: both use the same set of tools defined in the AI Tool Definition screen, with the same access check at execution time. The difference is that the in-system assistant runs inside the interface as the logged-in user, while an external client connects through API credentials as in the [MCP Server guide](./ai-mcp-server.md).
