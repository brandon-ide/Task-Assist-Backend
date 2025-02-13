import { ObjectId } from "mongodb";

export default interface Task {
  _id: ObjectId;
  taskName: string;
  dateOfEntry: Date;
  taskCategory: string;
  taskPriority: string;
  dueDate?: Date;
}
