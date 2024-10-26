import { useDrag } from "react-dnd";
import { TaskResponse } from "../types";
import { useNavigate } from "react-router-dom";
import { deleteTask } from "../CRUD/Tasks";

const TaskCard = ({ task }: { task: TaskResponse }) => {
  const { image, title, description, priority } = task;
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id, state: task.state },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const navigate = useNavigate();
  return (
    <div
      ref={dragRef}
      className={`bg-white cursor-pointer rounded-lg shadow-md p-4 mb-4 ${isDragging ? "opacity-50" : "opacity-100"}`}
      onClick={() => navigate(`/task/${task.id}`)}
    >
      <img src={image} alt={`${title} thumbnail`} className="w-full h-32 object-cover rounded-md mb-3" />
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit-task?id=${task.id}`)
            }}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id)
            }}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-gray-600">{description}</p>
      <p className="mt-2 text-sm font-medium text-blue-500">Priority: {priority}</p>
    </div>
  );
};

export default TaskCard;
