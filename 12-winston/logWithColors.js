const winston = require("winston");

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.colorize(), // Add colors to console logs
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/errors.log", level: "error" }), // Only errors go here
  ],
});

logger.debug("Debugging details");
logger.info("General info log");
logger.warn("Warning message");
logger.error("Error encountered!");

