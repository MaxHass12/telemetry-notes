Telemetry is the feedback you get from your production systems that tells you what is going on there.

Software Telemetry is about the systems that bring you telemetry and display it in a way that will help taking decision. Everything we run gives some indication of how it is running. Those indications are telemetry.

![alt text](<Screenshot 2025-03-01 at 7.06.24 PM.png>)

What is the architecture common to all telemetry systems?

1. Emitting Stage - Receives telemetry from the production and forwards it to shipping stage
2. Shipping Stage - Processes and ultimately stores telemetry
3. Presentation Stage - Where people search and work with telemetry

Emitting and Shipping stage can apply **context related markup** to the telemetry. The Shipping and Presentation Stage can **transform telemetry** to such as deserializing JSON or parsing sring.

![alt text](<Screenshot 2025-03-01 at 7.12.00 PM.png>)

4 Major Styles of Telemetry Are:

1. Centralized Logging : Takes text based logs out of the production system and centralize it for easy searching.

2. Metrics : Focuses on numbers rather than text. Requires less data than logs, allow much longer timeframe to be kept online and searchable.

3. Distributed Tracing : Focuses on tracking events across many components of a distributed system.o

(Logs, Metrics, and Traces are also called 3 pillars of observability)

4. Security Information Event Management : A specialized telemetry for use by Security and Compliance teams.

Telemetry systems face much more disasters than production systems. (Interesting)

# 1. Styles of Telemetry

## 1.1 Centralized Logging

![alt text](<Screenshot 2025-03-01 at 7.18.16 PM.png>)

For example - a centralized logging system can use **Fluentd**, **ElasticSearch** and **Kibana** as their major components. Telemetry is emitted by production, centralized in Fluentd, stored in ElasticSearch and then Searched by Kibana.

Centralized logging supports both software and hardware telemetry.

`syslog` is the standard protocol. The levels of error like `info`, `error`, `warn` originated from syslogs. Nearly all loggers use these vocab. (The concept of log level is the most basic kind of context that telemetry has)

## 1.2

Metrics style telemetry is about using numbers (counters, timers, rates) to get feedback about what's going on in the production system.

![alt text](<Screenshot 2025-03-01 at 7.30.29 PM.png>)

For eg: Production Software emits metrics to to Prometheus StatsD, OS has a monitoring package collectd collecting system metric to Prometheus Graph - these 2 store eventually in Prometheus and Grafana server acts as the interface point.

Prometheus is a DB for time-series data.

We always markup metrics telemetry with additional details. Additional fields can be added, but this increases the index complexity.

**Cardinality** is the term for index complexity. Cardinality is the number of unique combinations the field in the index may produce. Cardinality significantly affects search performance.

Cardinality is a big reason why metric-based telemetry became popular than log-based telemetry. Centralized logging has highest cardinality and takes up the most resources by far.

Compared to centralized logging, metric based system can keep years worth of telemetry searchable at a fraction of cost.

## 1.3 Distributed Tracing

- A union of log and metrics. Logging shows events as they happened, metrics give you number about how the system is performing - tracing gives a linked view of execution making it easier for people to investigate interesting places.

- Open Telemetry Project is an effort by US Tech Cos to provide standards for communication and data format for tracing telemetry.

![alt text](<Screenshot 2025-03-01 at 7.43.40 PM.png>)

In this, Open Telemetry SDK sends events to system running Jaegar Open Source Training System. Then the Jaegar collector stores the events in a DB.

- **Application Performance Monitoring** are one-stop-shop platforms which provide all 3 pillars of observability. (New Relic, Data Dog)

## 1.4 SIEM Systems

Track all login, logout events. Track all use of admin priviledge, Track all access to sensitive files and records, etc. Tracks compliance with password, etc.

# 2.

How Different Teams consume telemetry - Not very interesting.

# 3. Challenges to Telemetry

1. Lack of investment because of ignorance. (No need to fix what ain't broke, Centralized Logging is all we need, features! features! features!)

2. Lack of standardization.

- Different teams have different needs. Customer Support Team needs very recent data, Security Teams needs 7-10 years, distributed systems need to sample their data statistically (?), Centralized logging systems takes most memory - sometimes even week long is too much.

- Different systems emit telemetry in different forms.
  - Hardware emits in 2 standard formats. **syslogs** and **SNMP**
  - Telemetry SaaS provider SDKs might not have support for emitting telemetry through HTTP proxies - a requirement in many production environments
  - Platform services such as VMware vCenter have their own telemetry handling system
  - Infrastructure providers such as AWS and DO provide Telemetry in their own formats and own locations, leaving it up to you how to fetch and process it
  - Operating Systems provide telemetry in their own format.
  - The programming languages can prevent you from accessing SDKs to get distributed tracing

3. Information spills.

- We never want privacy or health related data in telemetry system

Major sources of info leaks are:

1. Exception logging with params. Software Engineers dont bother about thinking of exceptions as needing in code redaction. (We need structured logger for this)
2. Unthinking inclusion of IP address and email address in logging system
3. Inclusion of any user submitted data of any kind
