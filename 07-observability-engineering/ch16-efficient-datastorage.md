Engineering challenges to effectively store and retrieve your observability data when you need them the most.

# 1. Functional Requirements for Observability

When the production system is down, queries against your observability data must return asap.

Events are the building block of observability, and traces are a collection of interrelated events. Finding meaningful patterns within those events require the ability to search through high cardinality and high dimensionality data.

Since, we dont know which dimension is important we can not priviledge (ie index) any single dimension - all must be equally fast. So data retrieval must be fast without index or all dimensions must be indexed.

Telemetry data must be fresh since it is used to solve production problems. Stale data might lead to detection of false issues.

Also, data store must be reliable. Telemetry data is extremely important.

With all this in mind, traditional data stores are inadequate.

# 2. Time-Series Databases are Inadequate

At its core observability data is series of structured events representing information about program's execution. These generally key-value pairs. In case of tracing structures events are related in a parent child relatioinship.

In contrast, time-series aggregates system performance into simple measures. (Number of requests during a given period - main reason why they were used over logs).

This reduces the volume of telemetry data but individual details are lost in aggregate.

# 3. Other kinds of database

While key-value can be stored in be stored in NoSQL, their egress performance (query performance) is different from what the functional requirements for Observability data are.

Folks at FB's Scuba system solved it by using huge amounts of RAM. Not feasible for other orgs.

Open source alternatives are Cassandra, Elasticsearch, InfluxDB - but these are not purpose built for distributed tracing. Grafana Tempo is build for tracing but its query performance is not good.

# 4. Data Storage Strategies

2 possible strategies - Row Based and Column Based. For observability domain, rows are the individual telemetry events and columns are the fields or attributes of that events.

Which ones to use? Both have trade offs.

Google's Big Table is a row based approach where the DB inserts the Rows in order. This adds to write performance, but not to the read performance.

Some problems in update, and compact that I did not understand.

# 5 Honeycombs Retriever

In a distributed system, events regularly come out of order. One assumption is to treat data out-of-order events will come close enough so that they can be sorted at read time.

- Honeycomb follows a segmented pattern where it updates in batches.

- Columnar DB.

- More features.
