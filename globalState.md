<frontmatter>
  title: GlobalState
  layout: default.md
</frontmatter>

### GlobalState Class
The GlobalState class is a central component in SQLancer that manages the state of the database, including the connection, schema, options, and logging. It provides methods for executing queries, updating the schema, and managing the overall state of the testing process. 

<mermaid>
sequenceDiagram
    participant DBMSExecutor
    participant GlobalState
    participant QueryManager
    participant Query
    participant ExecutionTimer
    participant StateLogger
    participant Schema

    DBMSExecutor->>GlobalState: executeStatement(query)
    GlobalState->>GlobalState: executePrologue(query)
    GlobalState->>StateLogger: writeCurrent(query.getLogString())
    GlobalState->>ExecutionTimer: start()
    GlobalState->>QueryManager: execute(query)
    QueryManager->>Query: execute(globalState)
    Query-->>QueryManager: Return success
    QueryManager-->>GlobalState: Return success
    GlobalState->>GlobalState: executeEpilogue(query, success, timer)
    GlobalState-->>DBMSExecutor: Return success

    DBMSExecutor->>GlobalState: executeStatementAndGet(query)
    GlobalState->>GlobalState: executePrologue(query)
    GlobalState->>StateLogger: writeCurrent(query.getLogString())
    GlobalState->>ExecutionTimer: start()
    GlobalState->>QueryManager: executeAndGet(query)
    QueryManager->>Query: executeAndGet(globalState)
    Query-->>QueryManager: Return result
    QueryManager-->>GlobalState: Return result
    GlobalState->>GlobalState: executeEpilogue(query, success, timer)
    GlobalState-->>DBMSExecutor: Return result

    DBMSExecutor->>GlobalState: updateSchema()
    GlobalState->>GlobalState: readSchema()
    GlobalState->>Schema: getDatabaseTables()
    Schema-->>GlobalState: Return tables
    GlobalState->>GlobalState: setSchema(schema)
    GlobalState-->>DBMSExecutor: Schema updated
</mermaid>

`executeStatement(Query<C> q, String... fills)` executes a query and returns a boolean indicating success or failure.
