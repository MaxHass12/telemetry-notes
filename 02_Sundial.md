- Sundial is a self-hosted, open-source cron job monitoring and management system that users can operate across one or multiple nodes.

- Common cron job issues are knowing whether or not the cron job started, was it complete, is schedule correct, where to find logs.

- 1 problem is when the scheduled interval for the job is shorter than the duration of the job itself. Results in concurrent execution, known as overlapping jobs, can potentially deplete system resources.

- Logs related to cron job outputs are not saved anywhere by default.

- The challenge lies in monitoring cron jobs running in different nodes.
