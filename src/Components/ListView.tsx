import React from "react";
import { TaskResponse } from "../types";
import { deleteTask } from "../CRUD/Tasks";
import { useNavigate } from "react-router-dom";


interface TaskTableProps {
  tasks: TaskResponse[];
}

const ListView: React.FC<TaskTableProps> = ({ tasks }) => {
    const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Title</th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Description</th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Priority</th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">State</th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">Image</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-t border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <td className="px-6 py-4">{task.title}</td>
              <td className="px-6 py-4 truncate max-w-xs">{task.description}</td>
              <td
                className={`px-6 py-4 font-semibold ${
                  task.priority === "high"
                    ? "text-red-500"
                    : task.priority === "medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {task.priority}
              </td>
              <td
                className={`px-6 py-4 font-semibold ${
                  task.state === "todo"
                    ? "text-gray-500"
                    : task.state === "doing"
                    ? "text-blue-500"
                    : "text-green-500"
                }`}
              >
                {task.state}
              </td>
              <td className="px-6 py-4">
                <img src={task.image} alt="Task" className="h-12 w-12 rounded-lg shadow-md" />
              </td>
              <td className="px-6 py-4 flex space-x-2">
                <button
                onClick={() => navigate(`/edit-task?id=${task.id}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
