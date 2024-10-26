import { ChangeEvent } from "react";
import { PriorityEnum } from "../types";

const Priority = ({
  priority,
  onChange,
}: {
  priority: PriorityEnum;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <select id="priority" defaultValue={priority} onChange={onChange} onClick={(e) => e.stopPropagation()}>
      <option value={PriorityEnum.low}>Low</option>
      <option value={PriorityEnum.medium}>Medium</option>
      <option value={PriorityEnum.high}>High</option>
    </select>
  );
};

export default Priority;
