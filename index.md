<frontmatter>
  title: SQLancer Main
  layout: default.md
  pageNav: 4
  pageNavTitle: "Topics"
</frontmatter>


### SQLancer  Main.
* **DBMSExecutor, ExecutorFactory, StateLogger, QueryManager**

First let's look at the main entry point and core logic for SQLancer. Test DBMS by generating random SQL queries and databases to check for bugs or inconsistencies in DBMS.

### **Key Components**

The `Main` class serves as the entry point, parsing command-line arguments, initializing DBMS providers, and managing concurrent test execution. The `StateLogger` handles logging of queries, errors, and test details to files, while the `QueryManager` executes SQL queries, tracks success/failure, and logs results. The `DBMSExecutor` tests specific DBMSs by initializing databases, generating random queries, and ensuring reproducibility with fixed random seeds. The `DatabaseProvider` interface is implemented by DBMS-specific providers (e.g., MySQLProvider) to manage databases, generate queries, and handle configurations. The `GlobalState` represents the database and test case state, including the database name, random seed, connection, and schema. The workflow involves parsing arguments, configuring test parameters, generating and executing random queries, and logging results. If a bug is found, a reducer minimizes the test case for debugging. Progress monitoring tracks query execution, database creation, and success rates. Concurrency is achieved via a thread pool, and reproducibility is ensured through fixed random seeds. Example usage: `java -jar sqlancer.jar mysql --num-tries 100 --num-threads 4 --log-each-select` tests MySQL with 100 cases, 4 threads, and logs each query.

<br>

#### Main Class

<mermaid>
sequenceDiagram
    participant Main
    participant JCommander
    participant ServiceLoader
    participant DBMSExecutorFactory
    participant DBMSExecutor
    participant ExecutorService

    Main->>JCommander: Parse command-line arguments
    JCommander-->>Main: Return parsed options
    Main->>ServiceLoader: Load DBMS providers
    ServiceLoader-->>Main: Return list of providers
    Main->>DBMSExecutorFactory: Create executor factory for selected DBMS
    DBMSExecutorFactory-->>Main: Return executor factory
    Main->>ExecutorService: Initialize thread pool
    loop For each test case
        Main->>DBMSExecutorFactory: Create DBMSExecutor
        DBMSExecutorFactory-->>Main: Return DBMSExecutor
        Main->>DBMSExecutor: Run test case (see Diagram 2)
    end
    Main->>ExecutorService: Shutdown thread pool
    ExecutorService-->>Main: Confirm shutdown
</mermaid>

<br>

Running the tests for each DBMS is done through `DBMSExecutor.run()`.

### DBMSExecutor.run()

<mermaid>
sequenceDiagram
    participant DBMSExecutor
    participant GlobalState
    participant DatabaseProvider
    participant StateLogger
    participant QueryManager
    participant Reducer

    DBMSExecutor->>GlobalState: Initialize global state
    DBMSExecutor->>DatabaseProvider: Create database
    DatabaseProvider-->>DBMSExecutor: Return database connection
    DBMSExecutor->>StateLogger: Initialize logger
    DBMSExecutor->>QueryManager: Initialize query manager
    loop For each query
        QueryManager->>DatabaseProvider: Execute query
        DatabaseProvider-->>QueryManager: Return query result
        QueryManager->>StateLogger: Log query and result
    end
    alt If bug is found
        DBMSExecutor->>Reducer: Reduce test case
        Reducer-->>DBMSExecutor: Return minimized test case
        DBMSExecutor->>StateLogger: Log reduced test case
    end
</mermaid>

Here is a class diagram for the main class.

<pic src="./assets/main_class.bmp" width="900" />
