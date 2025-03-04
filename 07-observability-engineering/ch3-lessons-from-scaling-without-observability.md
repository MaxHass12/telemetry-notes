# Case Study of Parse

Parse was a Mobile Backend as a Service (mBaaS) platform providing mobile-app developers a way to link their apps to backend cloud storage systems, and APIs to the backend systems.

Ruby-on-Rails backend, MongoDB database. Initially the optimized for speed, and as a result they took some choices that they later had to do and redo.

When their app took off, they had scaling issues. When something went slow, everything went slow. They solved the initial problem by learning about MongoDB and generate custom dashboards for a particular app.

But their mBaaS service continued to grow. Every day a new app skyrocketing into top 10%. Gave users the ability to launch mobile apps very easily. Those Parse-hosted apps would push notifications, save game state, perform complex geolocation queries.

At this stage, the problems of their architecture was evident.

[Aside: A complex case study of how overall site reliability was 99.9%, but the 0.1% failure was not evenly distributed. That 0.1% translated to 1 shard being 100% down]

# Rule of thumbs while scaling

If you can solve your problem with LAMP stack, you should. ie most of the time you should choose boring technology because their edge cases and failure scenarios are well understood.

With monolothic app, there grows a hero culture. The longest serving engineer intuitively knows the most about the system and is looked down as a hero to solve problems.
