import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import taskRouter from "./routes/taskRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", taskRouter);
export const api = functions.https.onRequest(app);