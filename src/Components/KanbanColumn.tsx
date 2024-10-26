import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { StateEnum, TaskResponse } from "../types";
import { updateTask } from "../CRUD/Tasks";

type KanbanColumnProps = {
  stage: StateEnum;
  tasks: TaskResponse[];
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ stage, tasks }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "TASK",
    drop: (item: { id: string }) => {
      updateTask(item.id, { state: stage });
      return { moved: true }; // Return an object here
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={`flex-1 min-w-[300px] bg-gray-100 rounded-lg p-4 ${
        isOver ? "bg-blue-100" : ""
      }`}
    >
      <h2 className="text-xl font-bold text-center mb-4">{stage}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default KanbanColumn;
