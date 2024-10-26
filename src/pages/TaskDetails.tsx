import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask, fetchTaskById } from "../API/Tasks";
import { TaskResponse } from "../types";
import Spinner from "../Components/Spinner";

const TaskDetail = () => {
  const navigate = useNavigate();

  const [task, setTask] = useState<TaskResponse | null>(null);
  const { taskId } = useParams<{ taskId: string }>();
  useEffect(() => {
    if (taskId) {
      fetchTaskById(taskId).then((task) => {
        setTask(task);
      });
    }
  }, [taskId]);
  if (!task) {
    return (
      <div className="w-fit mx-auto my-40 ">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md m-4">
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      {task.image && (
        <img
          src={task.image}
          alt={task.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}
      <div className="mb-4">
        <span className="text-gray-500 font-semibold">Description:</span>
        <p className="mt-2 text-gray-700">{task.description}</p>
      </div>
      <div className="mb-4">
        <span className="text-gray-500 font-semibold">Priority:</span>
        <p
          className={`mt-2 text-${
            task.priority === "HIGH"
              ? "red-500"
              : task.priority === "MEDIUM"
              ? "yellow-500"
              : "green-500"
          }`}
        >
          {task.priority}
        </p>
      </div>
      <div className="mb-4">
        <span className="text-gray-500 font-semibold">State:</span>
        <p
          className={`mt-2 text-${
            task.state === "TO DO"
              ? "gray-500"
              : task.state === "DOING"
              ? "blue-500"
              : "green-500"
          }`}
        >
          {task.state}
        </p>
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => {
            navigate(`/edit-task?id=${task.id}`);
          }}
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => {
            deleteTask(task.id);
            navigate(`/`);
          }}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;
