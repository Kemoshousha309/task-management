import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { switchView, ViewType } from "../store/slices/ViewTasks";

const ViewSwitcher = () => {
    const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex gap-3 items-center">
      <label className="whitespace-nowrap" htmlFor="view">
        select View
      </label>
      <select id="view" defaultValue={"list"} onChange={(e) => {
        dispatch(switchView(e.target.value as ViewType))
      }}>
        <option value="list">List</option>
        <option value="kanban">Kanban</option>={" "}
      </select>
    </div>
  );
};

export default ViewSwitcher;
