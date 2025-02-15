<frontmatter>
  title: SQLite
  layout: default.md
</frontmatter>


### SQLite3 Provider

It handles Database initialization, table creation, statement execution (e.g to insert rows), transaction handling (logical units of work).

The key method here is `generateDatabase`. This generates the tables and populates the tables using `executeStatements`.


<mermaid>
sequenceDiagram
    participant DBMSExecutor
    participant SQLite3Provider
    participant SQLite3GlobalState
    participant SQLQueryAdapter
    participant SQLConnection
    participant StatementExecutor
    participant SQLite3Table
    participant SQLite3Schema

    DBMSExecutor->>SQLite3Provider: generateDatabase(globalState)
    SQLite3Provider->>SQLite3GlobalState: addSensiblePragmaDefaults()
    SQLite3Provider->>SQLite3GlobalState: executeStatement(pragmaQuery)
    loop For each table to create
        SQLite3Provider->>SQLite3Provider: getTableQuery(globalState, i)
        SQLite3Provider->>SQLite3GlobalState: executeStatement(tableQuery)
    end
    SQLite3Provider->>StatementExecutor: executeStatements()
    StatementExecutor->>SQLite3Provider: mapActions(globalState, action)
    loop For each action
        StatementExecutor->>SQLite3Provider: getQuery(globalState)
        SQLite3Provider->>SQLite3GlobalState: executeStatement(query)
    end
    SQLite3Provider->>SQLite3GlobalState: executeStatement(commitQuery)
    SQLite3Provider->>SQLite3GlobalState: executeStatement(rollbackQuery)
    SQLite3Provider-->>DBMSExecutor: Database generated
</mermaid>


### SQLite3InsertGenerator

The SQLite3InsertGenerator class is responsible for generating SQL INSERT statements to populate tables in an SQLite3 database. It is used during the database generation process to insert rows into tables, ensuring that the database is populated with data for testing purposes.

<mermaid>
sequenceDiagram
    participant SQLite3Provider
    participant SQLite3InsertGenerator
    participant SQLite3GlobalState
    participant SQLite3Table
    participant SQLite3Column
    participant SQLite3ExpressionGenerator
    participant SQLQueryAdapter

    SQLite3Provider->>SQLite3InsertGenerator: insertRow(globalState, table)
    SQLite3InsertGenerator->>SQLite3InsertGenerator: insertRow(table)
    SQLite3InsertGenerator->>SQLite3Table: getRandomNonEmptyColumnSubset()
    SQLite3Table-->>SQLite3InsertGenerator: Return columns
    SQLite3InsertGenerator->>SQLite3ExpressionGenerator: getRandomLiteralValue(globalState)
    SQLite3ExpressionGenerator-->>SQLite3InsertGenerator: Return literal value
    SQLite3InsertGenerator->>SQLite3ToStringVisitor: visit(literal)
    SQLite3ToStringVisitor-->>SQLite3InsertGenerator: Return string representation
    SQLite3InsertGenerator->>SQLQueryAdapter: new SQLQueryAdapter(query, errors, true)
    SQLQueryAdapter-->>SQLite3Provider: Return SQLQueryAdapter
</mermaid>