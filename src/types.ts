import * as Yup from "yup";
import { InferType } from "yup";
 
export enum PriorityEnum {
  low = "LOW",
  medium = "MEDIUM",
  high = "HIGH"
}
 
export enum StateEnum {
  todo = "TO DO",
  doing = "DOING",
  done = "DONE",
}
// Define validation schema with Yup
export const taskSchema = Yup.object().shape({
  title: Yup.string().required("Task title is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string()
    .oneOf([PriorityEnum.low, PriorityEnum.medium, PriorityEnum.high])
    .required("Priority is required"),
  state: Yup.string()
    .oneOf([StateEnum.todo, StateEnum.doing, StateEnum.done])
    .required("state is required"),
  image: Yup.mixed<FileList>(),
});

export type TaskSchema = InferType<typeof taskSchema>;
export interface TaskResponse extends Omit<TaskSchema, "image"> {
  id: string; // Include ID in the response
  image: string; // Image as a string (e.g., URL or base64) in the response
}

