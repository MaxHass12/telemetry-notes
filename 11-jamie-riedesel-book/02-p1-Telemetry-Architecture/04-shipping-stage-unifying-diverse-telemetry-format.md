In large systems, moving telemetry around can be quite complex, involving telemetry systems owned and controlled by different teams.

The shipping stge needs to deal with whatever formats the Emitting stage can handle in diverse environemtns.

Shipping stage also needs to support markup and enrichment. Markup and Enrichment is end-to-end ie it can happen during emitting, shipping and presentation stage.

# 1. Shipping Locally-emitted telemetry

# 1.1 Shipping telemetry from a log file

Filebeat program made by Elastic.co is used to move telemetry from log files to kafka based stream. Filebeat uses YAML as a config format.

[Filebeat is customized to move strings from files. Metricbeat pulls system-level metrics, Auditbear pulls security related info, Winlogbeat pulls Windows Event Log data, Journalbeat pulls telemetry from journald]

The idea of using third-party shipper to move telemetry data from log files is general.

Other such packages are Filebeat, Fluentd/Fluentbit, Logstash, Telegraf.

# 1.2 Shipping telmetry from systemlogger

For a company that's handling a fleet of highly mobile computers, using installed local agents to send to a SaaS provider makes a lot of sense.

**SumoLogic Collector** collects telemetry from each of the laptop and sends to company's SumoLogic account

# 1.3 Shipping telemetry from standard output

All the console.logs go to journald.

Journalbeat pulls the entire system's journal. Useful to get all the journald logs.

![alt text](<Screenshot 2025-03-02 at 10.04.49 PM.png>)

# 2. Unifying diverse emitting formats

Shipping stage is often charged with unifying telemetry formats for storage, especially in pipelines that involve hardware and SaaS systems with inflexible emission formats.

## 2.1 Encoding Telemetry into string

There are standard formats to encode (serialize) structured data in ways that are easy to translate back into structured data (deserialize)

### 2.1.1 Encoding into delimited formats

The most famous delimited format is CSV. General purpose Shipping Stage platforms like (Elastic's Logstash and FluentD) have parsers to handle these format.

Different types are

1. Comma OR Tab separated value lists.
2. Key Value pairs (delimited by =)
3. Position Delimited (used as a wrapper format for others using square brackets [], expecting that the string will be parsed more than one time)

Delimited formats are computationally cheap to parse, making them desirable. Also they are human readable.

However, if complex data structures are involved then they are not expressive enough.

When building a parsing stage for your shipping stage, it is worthwhile to test parsing speeds in various formats.

### 2.1.2 Object Encoding Format

JSON, XML, YAML

YAML makes sense if telemetry has lot of special characters.

Since JSON is ubiquitous, a lot of optimizations has been made to parse them.

## 2.2 Picking a shipping format

We can pick more than 1 format. It is more important for your telemetry to get into storage than it is for telemetry to be shipped in 1 true format.

In a large software system, there is all kids of metrics being generated from different sources. Truly big companies are often a bunch of smaller companies.

1. First we need to determine the emitting capabilities of existing systems to provide the baseline. Different parts provide telemetry in different formats.
2. Examine shipping stage capabilites to narrow sceop.
3. Negotiate standard formats to make a plan for change.

## 2.3 Designing with cardinality in mind

For syslog formats - the timestamp and messages with their 5 fields create high cardinalities.

Some DB, such as Elasticsearch are designed for this sort of full-text searching. Others such as InfluxDB and Prometheus, end up being terrible at handling such high cardinalities.

Main goal is to reduce the number of fields.

1. If traffic is dominated by a single generator of telemetry, your telemetry storage system will behave better if telemetry emitted by that generator is send to a separate index.

2. Many logging formats have a field for priority, so fi you can get all priority fields into the same data type, you will save field counts.
