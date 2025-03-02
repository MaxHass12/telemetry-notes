const express = require("express");
const morgan = require("morgan");
const winston = require("winston");

const app = express();
const PORT = 3000;

// Create Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

// Morgan middleware for request logging
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));

// Sample routes
app.get("/", (req, res) => {
  res.send("Hello, Winston with Express!");
});

app.get("/error", (req, res) => {
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

