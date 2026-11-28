# The In-System AI Assistant

Besides connecting external clients through the [MCP server](./ai-mcp-server.md), Nama ERP ships with a **built-in AI assistant** that works right inside the interface: a chat window the user opens to ask questions in natural language — Arabic or English — and the assistant answers from the system's actual data, runs reports, and even performs actions, using the same [AI tools](./ai-tool-definitions.md) the administrator defined and under the same permissions as the user sitting at the screen.

::: info Requirements
- The AI module installed and licensed.
- The user allowed to use AI: **Allow Access To AI Capabilities** set to **Yes** on the user, or left empty or on **Default** on the user and set to **Yes** on the user's security profile. **No** on the user overrides the profile, and when neither says **Yes** the user has no access. Without access the assistant icon and the AI buttons do not appear. A request from a user whose setting comes out as **No** is refused with *User can not access AI*.
- At least one chat model defined in [AI Module Configuration](./ai-configuration.md).
- The semantic index set up in the same settings: the **Open AI Embedding Key**, the **Text Embedding Model** and the **Vector Store URI (Zilliz or Milvus)** (see [Semantic Search and Embedding Setup](./ai-configuration.md#Semantic-Search-and-Embedding-Setup)). Without them the assistant does not start: the first message of a chat fails with the error *AI vector store is not configured* (in English, also on Arabic screens). External MCP clients do not need this.
- At least one committed tool in the [AI Tool Definition](./ai-tool-definitions.md) screen (otherwise the assistant chats but cannot reach system data).
:::

## Where to Find the Assistant

The AI assistant icon (**Nama AI Assistant**) is shown in the system's **top toolbar** and opens the chat window at any time. The assistant also has a button of its own on two toolbars:

- **Inside report screens**: open the chat while viewing a report, and the displayed report output becomes **context** the assistant can read and analyze — ask it to summarize the results or highlight the top values.
- **Inside record edit screens**: the record open in front of you is sent to the assistant as context, so you can discuss it. This needs the right to view the record.

These two buttons use the chat model last chosen in the assistant window, so open the assistant from the top toolbar and choose a model there once before using them.

## What Can the Assistant Do?

The assistant has no capability of its own — everything it does goes through a **tool** defined in the AI Tool Definition screen. So once you define query, report, entity-flow, and system tools, the assistant can:

- Answer questions from your data ("How many sales invoices this month?", "Who are the top five customers by balance?").
- Run a report with parameters it infers from your question, and read its output.
- Perform an action on a document through an entity flow (approve, save, ...).
- Read a record or import new records, if the import tools are enabled.
- Search the Nama ERP documentation, if the docs system tool is enabled.

In all cases the user's permissions and dimensions (legal entity, branch, ...) apply: the assistant only sees what the user sees, and only does what the user is allowed to do.

## Working With the Chat Window

### Choosing the Model

At the top of the window is a drop-down to choose the **chat model**, listing the models defined in [Module Configuration](./ai-configuration.md). The window opens on the model you chose last time, or on the first model of the list. You can switch models by task — a faster model for simple questions and a stronger one for complex analysis.

### Chat History

The system saves your conversations in **sessions** you can return to later. From the chat side panel:

- **Start New Chat**: start a clean session with no prior context.
- **Chat History**: lists your latest 50 sessions, newest first; click one to resume it.

Each user sees only their own sessions. The exception is an administrator with Expert Mode on: the list then holds the latest 50 sessions of all users, each with its user's name under the title.

Another entry of the side panel, **Switch Chat Direction**, flips the conversation between right-to-left and left-to-right.

### Attaching a File

The **Attach file** button (the plus sign in the message box) sends one file with your message: a PDF, a text file (TXT, Markdown, CSV, JSON, XML, HTML, log, YAML, properties) or an image, of 5 MB at most. Choose the chat model first, and choose one whose provider is **OPEN AI**, **Anthropic** or **GEMINI**; with any other provider the file is refused with a message that names the provider and ends:

*Pick a model from OpenAI, Anthropic, or Gemini to attach files.*

Once a file is attached, that message and every later message of the same chat are answered by the model from the file and the conversation alone, without calling any tool. The server keeps the file for two hours after the upload; after that, or in a new chat, the assistant goes back to the tools.

### Rating Answers (Like / Dislike)

Below each assistant reply are **Like** and **Dislike** buttons. Your rating is saved with the message and helps track answer quality and refine tool setup and descriptions over time.

### Expert Mode

In normal mode you see the conversation as a simple dialog (your question and the assistant's answer). **Expert Mode** reveals what happens behind the scenes and classifies every message. It is switched on with **Activate Expert Mode** in the side panel, an entry that only administrators see:

| Message Type | Meaning |
|---|---|
| **USER** | Your own message |
| **ASSISTANT** | The language model's reply |
| **SYSTEM** | The system instructions guiding the model |
| **TOOLEXECUTIONRESULT** | The output of a tool the model called |

This mode is very useful for technical support: it reveals **which tool the assistant called, with what parameters, and what it returned**, making it easy to diagnose an unexpected answer — is the problem in the tool's description? the query? the permissions?

## How the assistant picks its tools

The assistant does not hand the model every committed tool. For each message you send, it compares your words with the name, description and parameters of every tool — the semantic index keeps a copy of each tool for exactly this — and offers the model only the few closest ones, never more than four, after dropping any the user is not allowed to run. Two helpers come with every message on top of those: one that finds the records your message mentions, and one that works out which entity type you mean.

That is why a tool can be committed, active and allowed for the user and still never be called. If the assistant answers without the tool you expected, look at the tool's **Description** before anything else: it has to read like the questions people actually ask. A report tool described only as "Customer balances report" is a weak match for "who owes us the most this month"; a description that says what the report answers, in the words a user would use, gets chosen. Expert Mode shows which tools were called for each message.

## When the Assistant Can't Find Something

Many tools take a **reference** (customer, item, ...). If the user sends an approximate name instead of the code, the assistant relies on **semantic search** to find the closest records — provided the entity type is indexed in [embedding configuration](./ai-configuration.md#Semantic-Search-and-Embedding-Setup). Without it the assistant still works with explicit codes, but it does not "guess" the reference from free text.

## The Assistant and the MCP Server

The in-system assistant and external MCP clients are **two faces of one base**: both use the same set of tools defined in the AI Tool Definition screen, with the same access check at execution time. The difference is that the in-system assistant runs inside the interface as the logged-in user, while an external client connects through API credentials as in the [MCP Server guide](./ai-mcp-server.md).
