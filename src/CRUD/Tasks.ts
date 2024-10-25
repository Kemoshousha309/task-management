import { ref, push, onValue, update, remove } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { database, storage } from "../../firebaseConfig";
import { Task } from "../types";


export const createTask = async (task: Task) => {
  try {
    // First, upload the image to Firebase Storage and get the URL
    const image = task.image[0];
    const imageUrl = await uploadImage(image);

    if (!imageUrl) throw new Error("Image upload failed");

    // Now, create the task with the image URL
    const tasksRef = ref(database, "tasks");
    await push(tasksRef, { ...task, image: imageUrl });

  } catch (error) {
    console.error("Error creating task with image: ", error);
  }
};


export const fetchTasks = (setTasks: (tasks: Task[]) => void) => {
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
  updatedTask: Partial<Task>
) => {
  try {
    const taskRef = ref(database, `tasks/${taskId}`);
    await update(taskRef, updatedTask);
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
