import { ObjectId } from "mongodb";

export default interface Task {
[x: string]: any;

_id: ObjectId;
taskName: string;
dateOfEntry: Date;
taskCategory: string;
taskPriority: string;
dueDate?: Date;
}