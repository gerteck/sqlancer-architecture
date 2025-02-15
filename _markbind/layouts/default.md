<head-bottom>
  <link rel="stylesheet" href="{{baseUrl}}/stylesheets/main.css">
</head-bottom>

<header sticky>
  <navbar type="dark">
    <a slot="brand" href="{{baseUrl}}/index.html" title="Home" class="navbar-brand">SQLancer Main</a>
    <li><a href="{{baseUrl}}/databaseProvider.md" class="nav-link">DatabaseProvider</a></li>
    <li><a href="{{baseUrl}}/globalState.md" class="nav-link">GlobalState</a></li>
    <li><a href="{{baseUrl}}/query.md" class="nav-link">Query, SQLQueryAdapter</a></li>
    <li><a href="{{baseUrl}}/statementExecutor.md" class="nav-link">StatementExecutor</a></li>
    <li><a href="{{baseUrl}}/SQLite.md" class="nav-link">SQLite</a></li>
  </navbar>
</header>

<div id="flex-body">
  <div id="content-wrapper">
    {{ content }}
  </div>
  <!-- <nav id="page-nav">
    <div class="nav-component slim-scroll">
      <page-nav />
    </div>
  </nav> -->
  <scroll-top-button></scroll-top-button>
</div>


