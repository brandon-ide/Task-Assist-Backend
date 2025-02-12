import * as functions from "firebase-functions";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import taskRouter from "./routes/taskRouter.js";
import { getClient } from "./db.js"; 
// Ensure DB connection on startup
getClient().catch(console.error);

// Create an instance of Express
const app = express();

// Enable CORS and logging
app.use(cors());
app.use(morgan("dev"));

// Allow JSON request bodies
app.use(express.json());

// Use your existing routes
//app.use("/", taskRouter); having minor issues with the routing.
app.use("/tasks", taskRouter);


// Export the Express app as a Firebase Function
export const api = functions.https.onRequest(app);
