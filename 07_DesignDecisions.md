# 1. Decoupling Telemetry And Production

- Telemetry system should be decoupled from the production system. Say `console.log` is blocking. At scale, it can start blocking the execution in production.

- If the telemetry system is down, it should have no effect on the production system.

## 1.1 Shipping telemetry without blocking the production

- DataDog provides this service.
- This can be a probable usecase for our project.

# 2. Problem of Cardinality in Telemetry Data

- When a system needs to process and store **high number of unique values** in logs, metrics, or traces. Can lead to performance issues, storage costs, system overload.

# 3. Unifying different Telemetry Format

- Telemetry data is emitted from all kind of sources. Hardware, Network Defice, SaaS, IaaS.

- **syslong message format**

# 4. How to design a multitenant Telemetry system
