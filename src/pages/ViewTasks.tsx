import { useEffect, useState } from 'react'
import { Task } from '../types';
import { fetchTasks } from '../CRUD/Tasks';


const ViewTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks(setTasks); // Fetch tasks on component mount
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.state}</p>
          {task.image && <img src={task.image} alt={task.title} style={{ width: "100px", height: "100px" }} />}
        </div>
      ))}
    </div>
  ); 
}

export default ViewTasks
