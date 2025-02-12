import express from "express";
import { ObjectId, Collection } from "mongodb";
import * as functions from "firebase-functions";
import Task from "../models/taskModel.js";
import { getClient } from "../db.js"; // ✅ Use shared MongoDB client

const taskRouter = express.Router();

// Get MongoDB Collection
const getCollection = async (): Promise<Collection<Task>> => {
  const db = await getClient();
  return db.collection<Task>("tasks");
};

const errorResponse = (error: any, res: any) => {
  functions.logger.error("Error:", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// Get all tasks
taskRouter.get("/tasks", async (_req, res) => {
  try {
    const tasksCollection = await getCollection();
    const tasks = await tasksCollection.find().toArray();
    res.status(200).json(tasks);
  } catch (err) {
    errorResponse(err, res);
  }
});

// Get a single task by ID
taskRouter.get("/tasks/:id", async (req, res) => {
  try {
    const _id = new ObjectId(req.params.id);
    const tasksCollection = await getCollection();
    const task = await tasksCollection.findOne({ _id });

    task ? res.status(200).json(task) : res.status(404).send("Task not found");
  } catch (err) {
    errorResponse(err, res);
  }
});

// Create a new task
taskRouter.post("/tasks", async (req, res) => {
  try {
    const newTask: Task = { ...req.body, _id: new ObjectId() };
    const tasksCollection = await getCollection();
    const result = await tasksCollection.insertOne(newTask);

    res.status(201).json({ ...newTask, _id: result.insertedId });
  } catch (err) {
    errorResponse(err, res);
  }
});

// Update an existing task
taskRouter.put("/tasks/:id", async (req, res) => {
  try {
    const _id = new ObjectId(req.params.id);
    const tasksCollection = await getCollection();
    const updateResult = await tasksCollection.updateOne(
      { _id },
      { $set: req.body }
    );

    updateResult.matchedCount
      ? res.status(200).send(`Task with ID ${_id} updated.`)
      : res.status(404).send("Task not found");
  } catch (err) {
    errorResponse(err, res);
  }
});

// Delete a task by ID
taskRouter.delete("/tasks/:id", async (req, res) => {
  try {
    const _id = new ObjectId(req.params.id);
    const tasksCollection = await getCollection();
    const deleteResult = await tasksCollection.deleteOne({ _id });

    deleteResult.deletedCount
      ? res.sendStatus(204)
      : res.status(404).send("Task not found");
  } catch (error) {
    errorResponse(error, res);
  }
});

export default taskRouter;
