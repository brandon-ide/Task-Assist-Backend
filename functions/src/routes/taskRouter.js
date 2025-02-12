"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const taskRouter = express_1.default.Router();
const tasks = [
    { _id: new mongodb_1.ObjectId(), taskName: "First Entry", dateOfEntry: new Date('01/22/2025'), taskCategory: 'personal', taskPriority: 'High', dueDate: new Date('02/01/2025') },
    { _id: new mongodb_1.ObjectId(), taskName: "Second Entry", dateOfEntry: new Date('01/22/2025'), taskCategory: 'personal', taskPriority: 'Medium', dueDate: new Date('02/15/2025') },
    { _id: new mongodb_1.ObjectId(), taskName: "Third Entry", dateOfEntry: new Date('01/22/2025'), taskCategory: 'personal', taskPriority: 'High', dueDate: new Date('02/01/2025') },
    { _id: new mongodb_1.ObjectId(), taskName: "Fourth Entry", dateOfEntry: new Date('01/22/2025'), taskCategory: 'personal', taskPriority: 'Medium', dueDate: new Date('02/15/2025') },
    { _id: new mongodb_1.ObjectId(), taskName: "Fifth Entry", dateOfEntry: new Date('01/22/2025'), taskCategory: 'personal', taskPriority: 'High', dueDate: new Date('02/01/2025') },
    { _id: new mongodb_1.ObjectId(), taskName: "Sixth Entry", dateOfEntry: new Date('01/22/2025'), taskCategory: 'personal', taskPriority: 'Medium', dueDate: new Date('02/15/2025') },
    { _id: new mongodb_1.ObjectId(), taskName: "Seventh Entry", dateOfEntry: new Date('01/22/2025'), taskCategory: 'personal', taskPriority: 'Medium', dueDate: new Date('02/15/2025') },
];
const errorResponse = (error, res) => {
    console.error("Fail", error);
    res.status(500).json({ message: "Internal Server Error" });
};
taskRouter.get("/tasks", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json(tasks);
    }
    catch (err) {
        errorResponse(err, res);
    }
}));
taskRouter.get("/tasks/:id", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = new mongodb_1.ObjectId(_req.params.id);
        const result = tasks.find((item) => { var _a; return (_a = item._id) === null || _a === void 0 ? void 0 : _a.equals(_id); });
        if (result) {
            res.status(200);
            res.json(result);
        }
        else {
            res.status(404).send(`Task not found`);
        }
    }
    catch (err) {
        errorResponse(err, res);
    }
}));
taskRouter.post("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTask = req.body;
        newTask._id = new mongodb_1.ObjectId();
        tasks.push(newTask);
        res.status(201).json(newTask);
    }
    catch (err) {
        errorResponse(err, res);
    }
}));
//Update a task
taskRouter.put("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = new mongodb_1.ObjectId(req.params.id);
        const { taskName, taskCategory, taskPriority, dueDate } = req.body;
        const index = tasks.findIndex((item) => { var _a; return (_a = item._id) === null || _a === void 0 ? void 0 : _a.equals(_id); });
        if (index !== -1) {
            tasks[index] = Object.assign(Object.assign({}, tasks[index]), { taskName, taskCategory, taskPriority, dueDate });
            res.status(200).send(`Task with ID ${_id} updated.`);
        }
        else {
            res.status(404);
        }
    }
    catch (err) {
        errorResponse(err, res);
    }
}));
//Delete by task name
taskRouter.delete("/tasks/:taskName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskName } = req.params;
        const index = tasks.findIndex((item) => item.taskName === taskName);
        if (index !== -1) {
            tasks.splice(index, 1);
            res.sendStatus(204);
        }
        else {
            res.status(404).send("Task not found");
        }
    }
    catch (error) {
        errorResponse(error, res);
    }
}));
taskRouter.delete("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = new mongodb_1.ObjectId(req.params.id);
        const index = tasks.findIndex((item) => { var _a; return (_a = item._id) === null || _a === void 0 ? void 0 : _a.equals(_id); });
        if (index !== -1) {
            tasks.splice(index, 1);
            res.sendStatus(204);
        }
        else {
            res.status(404);
            res.send("Task not found");
        }
    }
    catch (error) {
        errorResponse(error, res);
    }
}));
exports.default = taskRouter;
