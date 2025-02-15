
    var pageVueRenderFn = function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_c('header',{attrs:{"sticky":""}},[_c('navbar',{attrs:{"type":"dark"},scopedSlots:_u([{key:"brand",fn:function(){return [_c('a',{staticClass:"navbar-brand",attrs:{"href":"/sqlancer-architecture/index.html","title":"Home"}},[_v("SQLancer Main")])]},proxy:true}])},[_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/sqlancer-architecture/databaseProvider.html"}},[_v("DatabaseProvider")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/sqlancer-architecture/globalState.html"}},[_v("GlobalState")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/sqlancer-architecture/query.html"}},[_v("Query, SQLQueryAdapter")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/sqlancer-architecture/statementExecutor.html"}},[_v("StatementExecutor")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/sqlancer-architecture/SQLite.html"}},[_v("SQLite")])])])],1),_v(" "),_c('div',{attrs:{"id":"flex-body"}},[_c('div',{attrs:{"id":"content-wrapper"}},[_m(0),_v(" "),_c('p',[_v("The StatementExecutor class is responsible for executing a set of actions (e.g., SQL queries) in a randomized manner. It is used in SQLancer to generate and execute a sequence of database operations (e.g., INSERT, UPDATE, DELETE) based on a weighted random selection.")]),_v(" "),_m(1),_v(" "),_m(2),_v(" "),_m(3),_v(" "),_c('p',[_v("The StatementExecutor continues executing actions until all actions have been performed. Once all actions are executed, the StatementExecutor returns control to the DBMSExecutor.")]),_v(" "),_c('div',{directives:[{name:"mermaid",rawName:"v-mermaid"}],staticClass:"mermaid"},[_v("\nsequenceDiagram\n    participant DBMSExecutor\n    participant StatementExecutor\n    participant GlobalState\n    participant AbstractAction\n    participant Query\n    participant AfterQueryAction\n\n    DBMSExecutor->>StatementExecutor: executeStatements()\n    StatementExecutor->>StatementExecutor: Initialize nrRemaining and availableActions\n    loop For each action\n        StatementExecutor->>ActionMapper: map(globalState, action)\n        ActionMapper-->>StatementExecutor: Return nrPerformed\n        StatementExecutor->>StatementExecutor: Update nrRemaining and total\n    end\n    loop While total > 0\n        StatementExecutor->>Randomly: getInteger(0, total)\n        Randomly-->>StatementExecutor: Return selection\n        StatementExecutor->>StatementExecutor: Select nextAction based on selection\n        StatementExecutor->>StatementExecutor: Decrement nrRemaining and total\n        StatementExecutor->>AbstractAction: getQuery(globalState)\n        AbstractAction-->>StatementExecutor: Return query\n        StatementExecutor->>GlobalState: executeStatement(query)\n        alt If query affects schema\n            StatementExecutor->>GlobalState: updateSchema()\n            StatementExecutor->>AfterQueryAction: notify(query)\n        end\n    end\n    StatementExecutor-->>DBMSExecutor: Statements executed\n")])]),_v(" "),_c('scroll-top-button')],1)])}
};
    var pageVueStaticRenderFns = [function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"statement-executor"}},[_v("Statement Executor"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#statement-executor","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("DBMSExecutor")]),_v(" calls "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("executeStatements()")]),_v(" of "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("StatementExecutor")]),_v(". The StatementExecutor initializes the "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("nrRemaining")]),_v(" array and "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("availableActions")]),_v(" list based on the number of times each action should be performed. This list is based on the actions defined when creating the Executor instance.")])}
},function anonymous(
) {
with(this){return _c('p',[_v("The StatementExecutor uses a weighted random selection to "),_c('em',[_v("choose the next action to execute")]),_v(". The ActionMapper is used to determine how many times each action should be performed.")])}
},function anonymous(
) {
with(this){return _c('p',[_c('strong',[_v("Query Execution")]),_v(":\nThe StatementExecutor retrieves the query for the selected action using the getQuery() method. The query is executed using the GlobalState. If the query affects the schema, the StatementExecutor updates the schema using the updateSchema() method.")])}
}];
  