Observability is defined as how well internal state of system can be defined by its external output. In software, this would mean understanding the inner state without shipping any new custom code to handle it, no matter how bizzarre or novel the problem is.

# Observability versus Monitoring

Observability is not just metrics, log, and traces.

A upper bound exists beyond which you can not know anything with metrics and monitoring tool. The previous tools where based on certain assumptions about Monoliths.

Now the monoliths do not exist. Every request has to hop the network multiple times. Thus we have trends towards containerization, rise of container orchestration platforms, the shift to microservices, the common use of polyglot persistence, service mesh, ephemeral autoscaling instance, lambda functions, etc. A request may perform 20-30 hops before it reaches the edge function you control.

Hardest thing is finding where the problem code is. Aggregate monitoring and metrics is of no help. Monitoring is for known unknowns.

For debugging with observability, we need as much context around any given request, so that you can recreate the environment and circumstance that triggered the bug.

# The role of cardinality

High cardinality info is almast always the most usable. Unfortunately the metric based tooling system can deal only with low-cardinality dimension at any reasonable scale.

For collecting metrics, we need to decide in advance (before the bug occurs) of what to collect. What if bug happens due to something else? Now we need to start collecting a new set of metrics.

# The role of dimensionality

Refers to number of fields. With 6 high cardinality dimensions per event `time`,`app`, `host`, `user`, `endpoint`, and `status` we can create queries which are very insightful.

Now imagine we have 6000 fields. `detail`, `value`, `counter` or any other value which is considered useful for debugging. In modern telemetry, capturing only a few dimensions is not very useful. Apps must gather incredibly rich detail about things happening at the intersections of users, code and system.

# Modern Observability

Observability tools are designed to query against high dim and high cardinality data.

Now we need to interrogate our event data in a number of ways. A key function of modern observability systems is the ability to explore our system in open-ended ways, without shipping any code, no matter how novel or bizarre the problem is.

In contrast, traditional monitoring is a reactive approach. When the causes of problems are known, we can just look at possible causes of failure.
