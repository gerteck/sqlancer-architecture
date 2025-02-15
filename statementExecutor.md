<frontmatter>
  title: StatementExecutor
  layout: default.md
</frontmatter>

## Statement Executor

The StatementExecutor class is responsible for executing a set of actions (e.g., SQL queries) in a randomized manner. It is used in SQLancer to generate and execute a sequence of database operations (e.g., INSERT, UPDATE, DELETE) based on a weighted random selection.

`DBMSExecutor` calls `executeStatements()` of `StatementExecutor`. The StatementExecutor initializes the `nrRemaining` array and `availableActions` list based on the number of times each action should be performed. This list is based on the actions defined when creating the Executor instance.

The StatementExecutor uses a weighted random selection to *choose the next action to execute*. The ActionMapper is used to determine how many times each action should be performed.

**Query Execution**:
The StatementExecutor retrieves the query for the selected action using the getQuery() method. The query is executed using the GlobalState. If the query affects the schema, the StatementExecutor updates the schema using the updateSchema() method.


The StatementExecutor continues executing actions until all actions have been performed. Once all actions are executed, the StatementExecutor returns control to the DBMSExecutor.

<mermaid>
sequenceDiagram
    participant DBMSExecutor
    participant StatementExecutor
    participant GlobalState
    participant AbstractAction
    participant Query
    participant AfterQueryAction

    DBMSExecutor->>StatementExecutor: executeStatements()
    StatementExecutor->>StatementExecutor: Initialize nrRemaining and availableActions
    loop For each action
        StatementExecutor->>ActionMapper: map(globalState, action)
        ActionMapper-->>StatementExecutor: Return nrPerformed
        StatementExecutor->>StatementExecutor: Update nrRemaining and total
    end
    loop While total > 0
        StatementExecutor->>Randomly: getInteger(0, total)
        Randomly-->>StatementExecutor: Return selection
        StatementExecutor->>StatementExecutor: Select nextAction based on selection
        StatementExecutor->>StatementExecutor: Decrement nrRemaining and total
        StatementExecutor->>AbstractAction: getQuery(globalState)
        AbstractAction-->>StatementExecutor: Return query
        StatementExecutor->>GlobalState: executeStatement(query)
        alt If query affects schema
            StatementExecutor->>GlobalState: updateSchema()
            StatementExecutor->>AfterQueryAction: notify(query)
        end
    end
    StatementExecutor-->>DBMSExecutor: Statements executed
</mermaid>