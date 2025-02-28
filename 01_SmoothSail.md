- Its a feature flag tool. Allows developers to enable, disable, or modify features in real-time without deploying new code.

- How it works in telemetry?

1. **Feature RollOut and Control** Developers use feature flags to gradually roll out features to a subset of users. They can quickly disable a feature if an issue arises.

2. **Data Collection and Analysis** Collect's data on feature's performance, user engagement and system impact - like error rates, latency, resource use, feedback.

3. **Experimentation and A/B Testing** 2 or more variations of a feature, webpage or product experience are shown to different user groups to determine which one does better. A (control group ie the existing version), B (test group or the modified version)

4. **Issue Detection and Rollback**

- Popular Feature Flag Tools with Telemetry Integration

1. Launch Darkly (Integrates with observability tools like DataDog, NewRelic)
2. Flagr(by OpenFeature) - Open Source Feature Flagging with analytics
3. Split.io - Provides detailed feature performance tracking
4. Unleash - Open Source Feature toggling with event tracking

- How to decouple Deployment and Release ?

1. Classic Canary Deployment is done with 2 production environemnts and a load balancer - use to redirect traffic in desired proportion to old and new production environment.

2. Blue Green Deployment Strategy involves 2 production environment and a load balancer but all the traffic is directed to the new one. In case of problem, the traffic is redirected to old one. (What happens to users who are logged in)

- The above 2 require resources. Feature Flags allow the release of new features to be completely detatched from the deployment decisions.

- There are multiple strategies by which we determine users for which the flag is to be enabled.

[An **SDK** is a collection of tools, libraries, documentation and code sample that help developers build applications for a specific platform, framework or service]

- SmoothSail Architecture is made of 4 major parts

1. Manager Platform - handles flag data, performs authentication and manages SDK keys
2. SDK service establishes and maintains SSE connections with authenticated SDK.
3. NATS Jestream facilitates reliable communication between the Manager and the SDK service
4. SDK is used in dev's backend application and responsible for connecting toSDK service
