import * as Yup from "yup";
import { InferType } from "yup";

// Define validation schema with Yup
export const taskSchema = Yup.object().shape({
  title: Yup.string().required("Task title is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string()
    .oneOf(["low", "medium", "high"])
    .required("Priority is required"),
  state: Yup.string()
    .oneOf(["todo", "doing", "done"])
    .required("state is required"),
  image: Yup.mixed<FileList>().required("An image is required"),
});

export type TaskSchema = InferType<typeof taskSchema>;
export interface TaskResponse extends Omit<TaskSchema, "image"> {
  id: string; // Include ID in the response
  image: string; // Image as a string (e.g., URL or base64) in the response
}
