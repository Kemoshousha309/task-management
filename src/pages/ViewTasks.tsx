import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterForm from "../Components/FilterForm";
import KanbanView from "../Components/KanbanView";
import ListView from "../Components/ListView";
import Spinner from "../Components/spinner";
import ViewSwitcher from "../Components/ViewSwitcher";
import { fetchTasks } from "../CRUD/Tasks";
import { updateTasks } from "../store/slices/ViewTasks";
import { AppDispatch, RootState } from "../store/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ViewTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, filteredTasks, currentView } = useSelector(
    (s: RootState) => s.ViewTasks
  );

  useEffect(() => {
    fetchTasks((tasks) => {
      dispatch(updateTasks(tasks));
    });
  }, []);

  if (!tasks || !filteredTasks) {
    return (
      <div className="w-fit mx-auto my-40 ">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="">
      <h1 className="p-4 ">Task List</h1>
      <div className="flex justify-between px-2">
        <FilterForm />
        <ViewSwitcher />
      </div>
      {currentView == "list" && <ListView />}
      {currentView == "kanban" && (
        <DndProvider backend={HTML5Backend}>
          <div className="p-8">
            <KanbanView />
          </div>
        </DndProvider>
      )}
    </main>
  );
};

export default ViewTasks;
