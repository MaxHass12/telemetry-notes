Metrics do not retain the context of the event, simply an aggregate measurement of what happened at that time.

# 1. Debugging With Structured Events

An event is a record of everything that occurred when a particular request interacted with your service.

If we take a request and add all the data related to unique Ids, variable values, headers, params passed by request, execution time, etc. The data should be organized and formatted ie structured - aka structured events.

These events can be arbitrarily wide.

# 2. Limitation of Metrics

Metrics mean the scalar values representing system state. The behaviour of all requests that were active during the period are aggregated into 1 numerical value. The individual details are lost in the aggregate.

The aggregate numerical representation of predefined relationships over predefined periods of time, server as only 1 narrow view of the system. Their granularity is too large.

# 3. The limitations of traditional logs as building blocks

They are unstructured and meant to be human readable. They are essential part of debugging applications.

Searching through millions of lines of logs can be accompalished using log parsers. With unstructured data parsing gets difficult because different formatting rules apply for different types of log files.

Structured logs can be usable.

# 4. Why are Events useful

Structured events are record of everything that occurred when one particular request interacted with your service. Necessary for debugging no matter how novel the problem is.

The backend data store for an observable system must allow for your events to be arbitrarily wide. Fields keep on getting added. It is common for events to have 300-400 fields.

Data store should be able to handle high cardinality. Because the problems are unknown unknowns. Many of dimensions which are most useful have high cardinalities.

For eg: the query can be "all Canadian users, running iOS11 version 11.0.4, using the French language pack, who installed the app last Tuesday, running firmware version 1.4.101, who are storing photos on shard3 in region us-west-1."

Using schemas or other strict limitations on data types or shapes are orthogonal to goals of observability.
