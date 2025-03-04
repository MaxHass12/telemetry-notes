Distributed traces has become an indispensible troubleshooting tools for SWE teams. Distributed traces are interrelated series of events.

Distrbuted tracing systems provide packaged libraries that "automagically" create and manage the work of tracking those relationships.

# Distributed tracing

It is the method of tracking the progression of a single request as it is handled by various services that make up an application.

Distributed because a single request must often traverse (not travels) process, machine and network boundaries. Dovetails with microservice architecture.

Several approaches and competing standards have evolved. 2 notable open source ones are - Twitter's Zipkins and Ubers jaegar. Other commercial solutions are Honeycomb or lightstep.

Modern distributed systems have a tendency to scale into a tangled knot of dependencies. Distributed tracing clearly shows the relationship between various service components.

# The components of Tracing

Waterfall visualization show how an initial value is affected by a series of intermediate values, leading in the final cumulative value.

Each chunk of this waterfall is called a trace span. Within any given
