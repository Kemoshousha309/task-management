
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { StateEnum } from "../types";
import KanbanColumn from "./KanbanColumn";



const KanbanBoard = () => {
  const stages: StateEnum[] = [StateEnum.todo, StateEnum.doing, StateEnum.done];
  const { filteredTasks } = useSelector((s: RootState) => s.ViewTasks);
  const tasks = filteredTasks!;
  return (
    <div className="flex gap-4 overflow-x-auto">
      {stages.map((stage) => (
        <KanbanColumn
          key={stage}
          stage={stage}
          tasks={tasks.filter((task) => task.state === stage)}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
