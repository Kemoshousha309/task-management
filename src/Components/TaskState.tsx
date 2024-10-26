import { ChangeEvent } from "react";
import { StateEnum } from "../types";

const TaskState = ({
  state,
  onChange
  
}: {
  state: StateEnum;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}) => {

  return (
    <select id="state" defaultValue={state} onChange={onChange}>
      <option value={StateEnum.todo}>To Do</option>
      <option value={StateEnum.doing}>Doing</option>
      <option value={StateEnum.done}>Done</option>
    </select>
  );
};

export default TaskState;
