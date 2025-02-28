# 1. Fluentd

Open source data collector used to gather and process telemetry data (logs) from various sources to different storage and analysis systems.

Acts as logForwarder and processor - sends logs to ElasticSearch, Kafka, Amazon S3 etc.

# 2. Elasticsearch

Elasticsearch is a distributed search and analytics engine. Used to store the logs.

## Features

1. It has full-text search capability, makes it ideal for querying large datasets.
2. Distributed system (designed to scale horizontally)
3. Real Time Data Processing (minimal latency)
4. RESTful API
5. NoSQL Document Store

# 3. Kibana Server

- Its the backend component of Kibana that interacts with ElasticSearch to
  retrieve and visualize data.

- Core part of ELK stack (ie Elasticsearch, Logstash, and Kibana)

# 4. StatsD

- Lightweight Daemon that collects and aggregate application performance metrics. Used to measure API request counts, memory usage, response times, and Sets.
- Uses UDP so non blocking

# 4. StatsD

- Lightweight Daemon that collects and aggregate application performance metrics. Used to measure API request counts, memory usage, response times, and Sets.
- Uses UDP so non blocking
- Applications sends metrics over UDP, StatsD aggregates the metrics. The aggregated data is then send to backend (eg Prometheus)

# 5. Prometheus

- time series DB.

# 6. Graphana

- Open source dashboarding system

# 7. New Relic and Data Dog

- 2 leading observability, monitoring and telemetry platforms.

- New Relic is a Full-Stack Observability Platform, Datadog is a cloud monitoring and security.

# 8. Logstash

- Is an open source data processing pipeline that collects, processes and forwards logs, events, or structured data from various sources to destinations like Elasticsearch, databases or messaging queues.
