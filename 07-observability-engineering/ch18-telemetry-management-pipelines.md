Case Study of Slack Telemetry Pipeline which handle millions of events per second.

As organizations grow, telemetry observability systems tend to evolve from a simple system in which applications and service producers, produce events directly to telemetry backend, to more complex use cases.

# Attributes of Telemetry Pipelines

## 1. Routing

Eg - Trace data stream to a tracing backend, and log data stream to a logging backend. Some part of data goes to an Elastic Search Cluster to do real time analytics.

## 2. Security

No passwords, personal info etc comes out of the production system

## 3. Workload Isolation

Different kind of datasets required for different needs. Some applicatons generate huge logs of data - they should be separated from apps that create low logs of data.

## 4. Data Buffering

If observability system is out, we need to buffer data in Kafka or RabbitMQ.

Also, telemetry data can have large spikes in volume. Buffers help with that. DLQ might be required. (Kafka used in Slack)

## 5. Capacity Management

Telemetry data follows user data. After some usage, to prevent cost, either drop data aka **rate limiting**, or start **random sampling** instead of saving or **queueing**.

[An outage could cause a lot of error logs]

## 6. Data Filtering and Augmentation

In case of metrics, an engineer may accidently add high cardinality data. Metric system are not designed to handle high cardinality data. Such data need to be dropped or sanitized.

Often, telemetry data is enriched with metadata, like regional info

## 7. Data Transformation

Telemetry data is a combination of both structured and unstructured data. All that needs to be transformed into a single format.

## 8. Ensuring Data Quality and Consistency

# Challenges of a Telemetry Pipeline

Apart from performance, availability, reliability, one particular problem is of freshness.

How to ensure that the data is fresh?

Slack adds synthetics logs to log streams at the rate of N messages per minute. Then they periodically query the stored data to see whether all those synthetic logs are getting stored.

This synthetic data should be filtered out before using the metrics.

# Telemetry Management at Stack

## Metrics Aggregation

Prometheus is the primary system for metrics at slack. Since Prometheus has a pull model, slack emits metrics per request to a local daemon written in Go.

This local daemon collects the metrics and exposes an endpoint, from where data in pulled by Slack.

## Logs and Trace Events

**Murron** is Slack's in house application for telemetry pipeline.

![alt text](<Screenshot 2025-03-03 at 8.20.37 PM.png>)

To facilitate routing, Murron wraps all messages in a custom received envelope.

In Open Telemetry specs, trace is a DAG of linked event called spans. These DS are wrapped in higher level API to produce traces. Slack invented a new SpanEvent that is easier to produce and consume.

They also built custom SpanEvent libraries for different modals.

Wallace, based on Murron, is a receiver and processor that operates independently from their cloud infra.

## Data Store

All this data ultimately goes into 3 databases

### 1. Elasticsearch

Eventstore that allows them to display events on a dashboard (Grafana) (Upto 7 days)

### 2. Datawarehouse

Secor (an open source project) to transform the data from Kafka and upload it to Amazon S3 to be ingested to Presto Database ( Long term storage, SQL DB)

### 3. Honeycomb

(Upto 60 days)

# Open Source Tools

Timber / Logstash / Fluentd / rsyslog to transport logs to receivers

Prometheus / Pushgateway / M3 Aggregator to aggregate metrics.

Refinery to filter, sample, and process trace data.

The next steps are to write these existing tools in more reliable languages like C.
