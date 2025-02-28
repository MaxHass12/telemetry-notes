- Monitoring and Observability looks very different for self hosted LLMs. Then we need to track hardware usage as well.

Goal of telemetry is to mitigate risks and discover opportnities.

# Metrics

MTTD - Mean Time To Detection
MTTR - Mean Time To Response
CFR - Change Failure Rate

1 important metric is the number of input and output tokens, cache's hit rate.

The easiest kind of failures to track are format failures. ie if you expect JSON ouputs, how many types you got wrong output.

Some easy metrics in Open Ended AI that can be tracked are:

1. How often do users stop a generation halfway.
2. Whats the average number of turns per conversations.
3. Whats the average number of tokens per request.
4. Whats the average number of tokens per output.
5. Whats the model's output token distribution.

Every component in an appliction has its own metrics. It is useful to measure how these metrics correlate to each other and especially to the main business metric

1. Daily Active User
2. Session Duration (The length of the time user spends actively engaged with the application)
3. Subscription.

We track latency and costs.

Each component of an AI application can generate metrics. We need to record them so they can be broken down on relevant axes.

# Logs and Traces

Metrics are generally aggregated. They condense information. Logs are append only records of events.

A general rule of thumb is log everything. Logs can grow in size quickly. Many tools for automated log analysis and log anomaly detection are powered by AI.

## LangSmith is a unified platform for debugging, testing, evaluating and monitoring AI applications.

# Drift Detection

- AI Models needs to be continuously trained after deployment.

- Prompt Changes
- User Behavior Change

# User Feedback

Early Termination, Error Correction, Complaints, Sentiments
