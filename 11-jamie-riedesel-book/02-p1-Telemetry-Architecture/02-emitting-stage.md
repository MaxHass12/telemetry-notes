![alt text](<Screenshot 2025-03-01 at 9.12.56 PM.png>)

Each telemetry system follows the same general architecture

The data is shipped into a data store of some form - a relational DB, a NoSQL DB, a SaaS provider, etc.

Then it is presented in such a way that people can use processed telemetry to support decisions.

Along the way telemetry is _marked up_ with context-related details and then _enriched_ to pull out details encoded in telemetry.

The Emitting stage is the first state. Sources of telemetry can be:

1. Production code
2. Hardware system like Routers
3. A SaaS or IaaS platform like AWS

# 1. Emitting from Production Code

In emitting stage, the big difference between metrics and logs is in the format: numbers and some extra details versus strings.

![alt text](<Screenshot 2025-03-01 at 9.20.18 PM.png>)

Eg: A 100 person startup has multiple servers running on EC2.

There are 2 techniques of emitting:

1. Pure Emitting - That deliever telemetry to the same system startup is running on

2. Emitter / Shipper setup - that sends telemetry to a different system - a queue or a DB.

![alt text](<Screenshot 2025-03-01 at 9.23.30 PM.png>)

Most programming languages have structured loggers available. It has 3 components:

1. A _logger_ that acts as a callable items. This is where telemetry enters the emitting stage.
2. A _formatter_ which receives the telemetry in the format required by the shipper
3. A _writer_ which forwards the telemetry to the next step. In some logging framework, we may only log to a file. Other frameworks have more options.

There are 3 ways of emitting locally

1. Emitting into a log file.
2. Emitting into a system log file.
3. Emitting into stdout.

All programming languages have some loggers. `structlog` for Python, `twp/logging` gem for Ruby, `Winston` and `Bunyan` for nodejs.

## 1.1 Emitting Telemetry into Log File

The standard way is to use a dedicated library instead of custom writing it.

The same would be done for 6 instances and then the next part of telemetry software (the shipper) will read those files and ship them forward.

## 1.2 Emitting into System Log File

On Linux systems, syslog interfaces are present, but the systemd logging component named journald is likely to be running the system log.

The log files resolve to milliseconds, while the syslog resolved to second.

The benefit is that the running code no longer needs to create files or interact with service running on the same box.

This is much more capable to work in a serverless framework.

The concept of emitting to a centralized syslog server is core to integrating hardware led telemetry.

## 1.3 Emitting into stdout

In linux, `journald` will happily capture all the output and keep it in a place to go through it.

Other AWS lambda functions, Docker, k8s have way to trap stdout for further display.

`stdout` is a single channel. If several threads are emitting telemetry simultaneously, it can get jumbled up. Using logging library ensures that it does not happen.

`stderr` is different from `stdout`

## 1.4 Formatting telemetry for emission

When we are writing telemetry for our own system, we design our own format.

Hardware, installed third-party software, Saas and IaaS impose a format - HTTP + JSON for SaaS provider.

Input validation applies to telemetry function as much as regular function.

Shipping stage has to translate any emission into a format that's acceptable to the storage system, emitting system can help speed that system. Tips for that:

1. Telemetry must be emitted in a human readable format in dev environments and machine-readable everywhere else.

2. Use JSON, XML etc for complex object, not simple key value store.

3. Delimited formats are very flexible

# 2. Emitting From Hardware

With software we can format the telemetry in anyway we want, with harware there is a hard constraint.

Hardwre makers use standard-based emission methods like syslogs but sometimes SNMP.

# 2.1 What's SNMP

- A Polling Mode in which network management stations regularly polls the SNMP enable devices.
- In the modern era, SNMP is used solely for networking infra.

# 3. Emitting Telemetry from SaaS and IaaS

For SaaS systems, API and WebHooks.

For IaaS, AWS provides a way to send logs to S3. AWS also provides to send notifications through Simple Notification Service.

By these 2 methods, Telemetry provider can pull all the data from the system.
