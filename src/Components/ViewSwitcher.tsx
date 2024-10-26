import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { switchView, ViewType } from "../store/slices/ViewTasks";

const ViewSwitcher = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentView = useSelector((s: RootState) => s.ViewTasks.currentView)

  return (
    <div className="flex gap-3 items-center">
      <label className="whitespace-nowrap" htmlFor="view">
        select View
      </label>
      <select id="view" defaultValue={currentView} onChange={(e) => {
        dispatch(switchView(e.target.value as ViewType))
      }}>
        <option value="list">List</option>
        <option value="kanban">Kanban</option>={" "}
      </select>
    </div>
  );
};

export default ViewSwitcher;
