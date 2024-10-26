import { ref, push, onValue, update, remove, get } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { database, storage } from "../../firebaseConfig";
import { TaskResponse, TaskSchema } from "../types";

export const createTask = async (task: TaskSchema) => {
  try {
    // First, upload the image to Firebase Storage and get the URL
    let imageUrl: string | null = null;
    if (task.image) {
      const image = task.image[0];
      imageUrl = await uploadImage(image);

      if (!imageUrl) throw new Error("Image upload failed");
    }

    // Now, create the task with the image URL
    const tasksRef = ref(database, "tasks");
    await push(tasksRef, { ...task, image: imageUrl });
  } catch (error) {
    console.error("Error creating task with image: ", error);
  }
};

export const fetchTasks = (setTasks: (tasks: TaskResponse[]) => void) => {
  const tasksRef = ref(database, "tasks");
  onValue(tasksRef, (snapshot) => {
    const data = snapshot.val();
    const tasksArray = data
      ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      : [];
    setTasks(tasksArray); // Update the state with fetched tasks
  });
};

export const updateTask = async (
  taskId: string,
  updatedTask: Partial<TaskSchema>
) => {
  try {
    let imageUrl: string | null = null;

    // Check if there's a new image to upload
    if (updatedTask.image) {
      const image = updatedTask.image[0];
      imageUrl = await uploadImage(image);

      if (!imageUrl) throw new Error("Image upload failed");
    }

    // Prepare the task data to update
    const taskUpdates = {
      ...updatedTask,
      ...(imageUrl && { image: imageUrl }), // Only update the image if a new URL is available
    };

    const taskRef = ref(database, `tasks/${taskId}`);
    await update(taskRef, taskUpdates);
  } catch (error) {
    console.error("Error updating task: ", error);
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const taskRef = ref(database, `tasks/${taskId}`);
    await remove(taskRef);
  } catch (error) {
    console.error("Error deleting task: ", error);
  }
};

export const uploadImage = async (file: File) => {
  try {
    // Create a reference to where the image will be stored in Firebase Storage
    const ref = storageRef(storage, `tasks/${file.name}`);

    // Upload the image to Firebase Storage
    await uploadBytes(ref, file);

    // Get the image URL
    const downloadURL = await getDownloadURL(ref);

    return downloadURL; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image: ", error);
    return null;
  }
};

export const fetchTaskById = async (
  taskId: string
): Promise<TaskResponse | null> => {
  try {
    const taskRef = ref(database, `tasks/${taskId}`);
    const snapshot = await get(taskRef);

    if (snapshot.exists()) {
      const taskData = snapshot.val();
      return { id: taskId, ...taskData }; // Return the task with its ID
    } else {
      console.error("Task not found");
      return null; // Task does not exist
    }
  } catch (error) {
    console.error("Error fetching task by ID: ", error);
    return null; // Return null in case of error
  }
};
