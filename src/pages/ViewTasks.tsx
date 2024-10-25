import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../CRUD/Tasks";
import { updateTasks } from "../store/slices/ViewTasks";
import { AppDispatch, RootState } from "../store/store";
import ListView from "../Components/ListView";

const ViewTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((s: RootState) => s.ViewTasks);

  useEffect(() => {
    fetchTasks((tasks) => {
      dispatch(updateTasks(tasks));
    });
  }, []);

  if (!tasks) {
    return "loading";
  }
  return (
    <main className="">
      <h1 className="p-4 ">Task List</h1>
      <ListView tasks={tasks} />
    </main>
  );
};

export default ViewTasks;
