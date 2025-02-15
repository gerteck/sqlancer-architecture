<frontmatter>
  title: Home Page
  layout: default.md
</frontmatter>

### DatabaseProvider

The DatabaseProvider interface is a core component of SQLancer, defining the contract for DBMS-specific implementations (e.g., MySQL, PostgreSQL). It provides methods for **creating databases, generating and testing queries, and managing logging and reproducibility**. 


<mermaid>
sequenceDiagram
    participant DBMSExecutor
    participant DatabaseProvider
    participant GlobalState
    participant QueryManager
    participant StateLogger
    participant Reproducer

    DBMSExecutor->>DatabaseProvider: createDatabase(globalState)
    DatabaseProvider->>GlobalState: Initialize database
    DatabaseProvider-->>DBMSExecutor: Return connection
    DBMSExecutor->>DatabaseProvider: generateAndTestDatabase(globalState)
    DatabaseProvider->>QueryManager: Execute queries
    QueryManager->>StateLogger: Log queries and results
    alt If bug is found
        DatabaseProvider->>Reproducer: Create reproducer
        DatabaseProvider-->>DBMSExecutor: Return reproducer
    end
</mermaid>


### ProviderAdapter

The ProviderAdapter class is an abstract base class that implements the DatabaseProvider interface and provides common functionality for managing databases, test oracles, and query plan guidance (QPG). It is designed to be extended by DBMS-specific implementations (e.g., MySQL, PostgreSQL).

<mermaid>
sequenceDiagram
    participant DBMSExecutor
    participant ProviderAdapter
    participant GlobalState
    participant TestOracle
    participant QueryManager
    participant StateLogger
    participant Reproducer

    DBMSExecutor->>ProviderAdapter: generateAndTestDatabase(globalState)
    ProviderAdapter->>GlobalState: generateDatabase()
    ProviderAdapter->>GlobalState: checkViewsAreValid()
    ProviderAdapter->>QueryManager: incrementCreateDatabase()
    ProviderAdapter->>ProviderAdapter: getTestOracle(globalState)
    ProviderAdapter->>TestOracle: create(globalState)
    TestOracle-->>ProviderAdapter: Return oracle
    loop For each query
        ProviderAdapter->>TestOracle: check()
        TestOracle->>StateLogger: Log query and result
        alt If bug is found
            TestOracle->>Reproducer: Create reproducer
            Reproducer-->>ProviderAdapter: Return reproducer
        end
    end
    ProviderAdapter-->>DBMSExecutor: Return reproducer (if bug found)
</mermaid>

#### generateDatabase()

This method is implemented by specific database implementations, but look at how it is implemented for SQLite (`SQLite3Provider.generateDatabase()`). (In SQLite Tab)



### SQLProviderAdapter 

The SQLProviderAdapter class is an abstract base class that extends ProviderAdapter and provides SQL-specific functionality for managing databases, views, and logging. It is designed to be extended by DBMS-specific implementations (e.g., MySQL, PostgreSQL).

<mermaid>
sequenceDiagram
    participant DBMSExecutor
    participant SQLProviderAdapter
    participant GlobalState
    participant SQLQueryAdapter
    participant StateLogger

    DBMSExecutor->>SQLProviderAdapter: checkViewsAreValid(globalState)
    SQLProviderAdapter->>GlobalState: getSchema().getViews()
    GlobalState-->>SQLProviderAdapter: Return list of views
    loop For each view
        SQLProviderAdapter->>SQLQueryAdapter: new SQLQueryAdapter("SELECT 1 FROM view LIMIT 1")
        SQLProviderAdapter->>SQLQueryAdapter: execute(globalState)
        alt If view is invalid
            SQLProviderAdapter->>SQLProviderAdapter: dropView(globalState, viewName)
            SQLProviderAdapter->>SQLQueryAdapter: new SQLQueryAdapter("DROP VIEW viewName")
            SQLProviderAdapter->>GlobalState: executeStatement(dropViewQuery)
        end
    end
    SQLProviderAdapter-->>DBMSExecutor: Views validated or dropped
</mermaid>

