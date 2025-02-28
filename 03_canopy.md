- Real Time open source monitoring framework designed specifically for use with the Amazon CloudFront CDN.

- The primary way to monitor the CDN is through the analysis of logs data. CDNs currently handle 72% of all internet traffic.

- Data pipelines for telemetry data are essential to software monitoring - It allows to collect, visualize and analyze log data for software monitoring and analysis.

- It is very easy to have GBs per day of CDN logs. Large volume of logs emitted by CDNs represent a challenge at every stage of logging pipeline.

- SaaS platforms providing this out of the box are DataDog or NewRelic.

- Grafana powered real time dashboards.

- Need to search the differences between Elasticsearch, Time-Series and Columnar Database.
  - Elasticsearch indexes the full contents of stored documents.
  - Timeseries databases index data over time.
  - A columnar database stores data in columns, as opposed to rows. Its power lies in the ability to read and write data by columns.
