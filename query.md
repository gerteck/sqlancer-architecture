<frontmatter>
  title: Query, SQLQueryAdapter
  layout: default.md
</frontmatter>

### Query

The Query class represents a single query string and supports several methods, such as `getQueryString`, `couldAffectSchema` (can add or delete tables), and establishes the abstract method `execute`.


### SQLQueryAdapter

The SQLQueryAdapter class is a concrete implementation of the Query interface, designed to execute SQL queries and handle their results. It is used extensively in SQLancer to interact with the database, execute queries, and manage expected errors. 

**Query Execution**: The GlobalState calls execute() or executeAndGet() on the SQLQueryAdapter to execute a query. The SQLQueryAdapter creates a Statement or PreparedStatement depending on whether placeholders (fills) are provided. The query is executed using the Statement or PreparedStatement. If the query is successful, the result is returned to the GlobalState. If the query fails, the SQLQueryAdapter checks if the error is expected using the ExpectedErrors class.

<mermaid>
sequenceDiagram
    participant GlobalState
    participant SQLQueryAdapter
    participant Statement
    participant PreparedStatement
    participant ResultSet
    participant SQLancerResultSet
    participant ExpectedErrors

    GlobalState->>SQLQueryAdapter: execute(globalState, fills)
    SQLQueryAdapter->>Statement: createStatement() or prepareStatement(fills[0])
    alt If prepared statement
        SQLQueryAdapter->>PreparedStatement: setString(i, fills[i])
        PreparedStatement->>SQLQueryAdapter: execute()
    else
        Statement->>SQLQueryAdapter: execute(query)
    end
    alt If successful
        SQLQueryAdapter->>GlobalState: Return true
    else
        SQLQueryAdapter->>ExpectedErrors: checkException(e)
        ExpectedErrors-->>SQLQueryAdapter: Return if error is expected
        SQLQueryAdapter->>GlobalState: Return false
    end

    GlobalState->>SQLQueryAdapter: executeAndGet(globalState, fills)
    SQLQueryAdapter->>Statement: createStatement() or prepareStatement(fills[0])
    alt If prepared statement
        SQLQueryAdapter->>PreparedStatement: setString(i, fills[i])
        PreparedStatement->>SQLQueryAdapter: executeQuery()
    else
        Statement->>SQLQueryAdapter: executeQuery(query)
    end
    alt If successful
        SQLQueryAdapter->>ResultSet: Wrap in SQLancerResultSet
        SQLancerResultSet-->>GlobalState: Return result
    else
        SQLQueryAdapter->>ExpectedErrors: checkException(e)
        ExpectedErrors-->>SQLQueryAdapter: Return if error is expected
        SQLQueryAdapter-->>GlobalState: Return null
    end
</mermaid>