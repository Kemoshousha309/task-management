import { useState } from "react";
import { createTask } from "../CRUD/Tasks";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [state, setState] = useState("pending");
    const [image, setImage] = useState<File | null>(null);
    
    const  navigate = useNavigate()

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
      navigate("/")
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
  
        {/* Input for Image */}
        <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
  
        <button type="submit">Create Task</button>
      </form>
    );
}

export default AddTask
