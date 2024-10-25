import { useEffect, useState } from "react";
import TaskForm from "../Components/TaskForm";
import { fetchTaskById } from "../API/Tasks";
import { useQuery } from "../hooks/useQuery";
import { TaskResponse } from "../types";
import Spinner from "../Components/Spinner";


const EditTask = () => {
  const query = useQuery();

  const taskId = query.get("id"); // Replace 'paramName' with your query parameter name
  const [task, setTask] = useState<TaskResponse | null>(null);
  useEffect(() => {
    if (taskId) {
      fetchTaskById(taskId).then((task) => {
        setTask(task);
      });
    }
  }, [taskId]);
  if (!task) {
    return <div className="w-fit mx-auto my-40 "><Spinner /></div>;
  }
  return (
    <main className="p-4">
      <h1>Edit Task</h1>
      <TaskForm defaultValues={task} type="edit" />
    </main>
  );
};

export default EditTask;
