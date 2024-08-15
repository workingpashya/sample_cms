import "dotenv/config";

const { PORT } = process.env;
import express from "express";
import moment from "moment-timezone";
import { initRoutes } from "./routes/index.js";
import { connectDB } from "./config/db.config.js";
import { DEFAULT_TIME_ZONE } from "./utils/constants.js";

const app = express();

// set default timezone
moment.tz.setDefault(DEFAULT_TIME_ZONE);

// connect db
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// initialize routes
initRoutes(app);

// list server on specified port
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
