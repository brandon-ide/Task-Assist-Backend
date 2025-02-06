import express from "express";
import { ObjectId } from "mongodb";
import Task from "../models/taskModel";
import { getClient } from "../db";

const taskRouter = express.Router();

const tasks: Task[] = [
  { _id: new ObjectId(), taskName: "Sample First Entry", dateOfEntry: new Date('01/22/2025'), taskCategory: 'personal', taskPriority: 'High', dueDate: new Date('02/01/2025') },
  { _id: new ObjectId(), taskName: "Sample Second Entry", dateOfEntry: new Date('01/22/2025'), taskCategory: 'personal', taskPriority: 'Medium', dueDate: new Date('02/15/2025') }, 
];

const errorResponse = (error: any, res: any) => {
  console.error("Fail", error);
  res.status(500).json({ message: "Internal Server Error" });
};

taskRouter.get("/tasks", async (_req, res) => {
  try {
    res.status(200).json(tasks);
  } catch (err) {
    errorResponse(err, res);
  }
})

//eg:walk the dog id: 67985a319930e9e4c77c17fe
taskRouter.get("/tasks/:id", async (_req, res) => {
  try {
    const _id: ObjectId = new ObjectId(_req.params.id);
    const client = await getClient();
    const result = await client.db().collection<Task>("tasks").findOne({_id});
    // const result: Task | undefined = tasks.find((item) =>
    //   item._id?.equals(_id)
    // );
    if (result) {
      res.status(200);
      res.json(result);
    } else {
      res.status(404).send(`Task not found`);
    }
  }

  catch (err) {
    errorResponse(err, res);
  }
});

taskRouter.post("/tasks", async (req, res) => {
  try {
    const newTask: Task = req.body;
    newTask._id = new ObjectId();
    tasks.push(newTask);
    res.status(201).json(newTask);
  }

  catch (err) {
    errorResponse(err, res);
  }
});

//Update a task
taskRouter.put("/tasks/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);

    const { taskName, taskCategory, taskPriority, dueDate } = req.body;
    const index: number = tasks.findIndex((item: { _id: { equals: (arg0: ObjectId) => any; }; }) => item._id?.equals(_id));
    if (index !== -1) {
      tasks[index] = { ...tasks[index], taskName, taskCategory, taskPriority, dueDate };
      res.status(200).send(`Task with ID ${_id} updated.`);
    } else {
      res.status(404);
    }

  } catch (err) {
    errorResponse(err, res);
  }
});

//Delete by task name
taskRouter.delete("/tasks/:taskName", async (req, res) => {
  try {
    const { taskName } = req.params;

    const index: number = tasks.findIndex((item) => item.taskName === taskName);

    if (index !== -1) {
      tasks.splice(index, 1);
      res.sendStatus(204);
    } else {
      res.status(404).send("Task not found");
    }

  } catch (error) {
    errorResponse(error, res);
  }
});

taskRouter.delete("/tasks/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const index: number = tasks.findIndex((item) => item._id?.equals(_id));
    if (index !== -1) {
      tasks.splice(index, 1);
      res.sendStatus(204);
    } else {
      res.status(404);
      res.send("Task not found");
    }

  } catch (error) {
    errorResponse(error, res);
  }
});

export default taskRouter;