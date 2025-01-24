import { ObjectId } from "mongodb";

export default interface Tasks {
[x: string]: any;

_id: ObjectId;
taskName: string;
dateOfEntry: Date;
taskCategory: string;
taskPriority: string;
dueDate?: Date;

}