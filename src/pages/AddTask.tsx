import { useState } from "react";
import { createTask } from "../CRUD/Tasks";
import { useNavigate } from "react-router-dom";
import TaskForm from "../Components/TaskForm";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [state, setState] = useState("pending");
  const [image, setImage] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
    }

    const task = {
      title,
      description,
      priority,
      state,
    };

    // Call the function to create a task with an image
    await createTask(task, image);
    navigate("/");
  };

  return (
    <main className="p-4">
      <h1>Add Task</h1>
      <TaskForm />
    </main>
  );
};

export default AddTask;
