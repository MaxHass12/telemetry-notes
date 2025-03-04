The shipping stage receives telemetry from the Emitting stage,
optionally marks them and enriches it, and stores it for use in
the production stage.

While the Emitting Stage is entirely within the production code,
the shipping state can be combined with the Emitting stage to make and emitter/shipper.

A shipping stage must:

1. Move telemetry between the components of the Shipping Stage and ultimately into Storage.
2. Transform Telemetry through both markup (adding context) and enrichment (bring out details)

# 1. Emitter / Shipper Function

A tradeoff between whether to emit to a file and have something else move the telemetry off the system OR have the production system moving the telemetry.

1. By writing to a file, a dedicated program can handle the complexity of moving the telemetry. It does not block code path if queue or stream is down.

2. By emitting directly from production code to somewhere else, telemetry spends the least time in the production system.

## 1.1 Shipping Directly Into Storage

The simplest shipping system is when the emitter emits directly to the storage when the production code is running in one place.

But, at one time you cant just keep logs in the k8s. Then you might want to send logs to an Elasticsearch cluster maintained by their cloud provider.

![alt text](<Screenshot 2025-03-02 at 7.42.10 PM.png>)

So instead of logging in files or Syslog, this code injects docs into Elasticsearch index. There are many options for DB compared to Elasticsearch. (Prometheus, Kairos, Influx)

## 1.2 Shipping Through Queues and Streams

Having vast majority of production system writing to a DB can be woefully inefficient and hard for DB.

How to centralize the flow of telemetry to allow downstream components to bulk insert into your storage system?

The most popular ways to accomplish this task are to use queues and streams (called event buses)

- A _queue_ is FIFO

- A _stream_ adds the concept of a consumer group. All consumer groups see the same data and the stream system keep each item of data in a stream untill all consumer groups have seen it.

By adding more stage, we take load of the database.

### Using Queues in a shipping pipeline

Instead of pushing directly to Elasticsearch, we can push to the redis_client.

Later we would use a **bulk-writer** to write to Elasticsearch.

As telemetry systems grow in size, the neeed to queue or other batch_updates grow as well. If the emitting system can't buffer updates internally, the performance of production system may be harmed.

### Using Streams in a Shipping System

Streams (aka _event buses_) are modifications of the queue idea, but the items in the stream are not removed after they are served.

Redis calls it streaming objects a _stream_, Kafka calls them _topics_.

The shipper does not care about the consumer, all it cares is appending data to the stream.

## 1.3 Shipping to a SaaS

Small startups have too much going on to waste time building a telemetry syte, so paying someone else do the work makes sense.

For eg, to use Honeycomb, the company needs to add Honeycomb SDK to its codbase, and start instrumenting its functions.

All telemetry SaaS vendors charge on volume. They give an option of adding a sample rate ie how many events of a certain type to keep. 25% is a decent starting point. Once the Software Team has a solid understanding of how the function works, it can reduce it further.

# 2. Shipping Between SaaS system

What if the startup is not writing code, but using SaaS. Then it needs another SaaS for its telemetry need.

2 ways for this - push via HTTP or polling from telemetry SaaS

Services such as SumoLogic, Loggly, and Splunk offers diverse methods of getting telemetry into their system.

The telemetry syles that aim at understanding software systemsS telemetry.

# 3. Tipping Points in Shipping Stage Architecture

When is change require

The size of the orgnization grows, merger with another department, new compliance framework, software end of life, patches to fix vulnerabilities

# Important

Telemetry Systems should follow 1 big rule - Telemetry system outages should not cause production system outages. The telemetry system should be build in such a way that outages in the pipeline will not materially affect the production system.

For eg: When the writing function is Synchronous, execution in the processing thread will pause. In case of Redis, what if the Redis system is at full memory. There are only less bad choices here.
