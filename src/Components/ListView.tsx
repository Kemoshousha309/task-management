import React from "react";
import { PriorityEnum, StateEnum } from "../types";
import { deleteTask, updateTask } from "../API/Tasks";
import { useNavigate } from "react-router-dom";
import Priority from "./Priority";
import TaskState from "./TaskState";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ListView: React.FC = () => {
  const { filteredTasks } = useSelector((s: RootState) => s.ViewTasks);
  const tasks = filteredTasks!;
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">
              Title
            </th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">
              Description
            </th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">
              Priority
            </th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">
              State
            </th>
            <th className="px-6 py-4 text-left text-gray-700 font-semibold">
              Image
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              onClick={() => navigate(`/task/${task.id}`)}
              className="border-t border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <td className="px-6 py-4">{task.title}</td>
              <td className="px-6 py-4 truncate max-w-xs">
                {task.description}
              </td>
              <td>
                <Priority
                  priority={task.priority}
                  onChange={(e) => {
                    updateTask(task.id, {
                      priority: e.target.value as PriorityEnum,
                    });
                  }}
                />
              </td>
              <td>
                <TaskState
                  state={task.state}
                  onChange={(e) => {
                    e.stopPropagation();
                    updateTask(task.id, { state: e.target.value as StateEnum });
                  }}
                />
              </td>
              <td className="px-6 py-4">
                {task.image ? (
                  <img
                    src={task.image}
                    alt="Task"
                    className="h-12 w-12 rounded-lg shadow-md"
                  />
                ) : (
                  <span>No Image provided</span>
                )}
              </td>
              <td className="py-4 flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit-task?id=${task.id}`);
                  }}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
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
