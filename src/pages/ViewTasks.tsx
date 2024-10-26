import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterForm, { Filters } from "../Components/FilterForm";
import ListView from "../Components/ListView";
import { fetchTasks } from "../CRUD/Tasks";
import { filterTasks, updateTasks } from "../store/slices/ViewTasks";
import { AppDispatch, RootState } from "../store/store";

const ViewTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, filteredTasks } = useSelector((s: RootState) => s.ViewTasks);

  useEffect(() => {
    fetchTasks((tasks) => {
      dispatch(updateTasks(tasks));
    });
  }, []);

  const handleFilter = (filters: Filters) => {
    dispatch(filterTasks(filters));
  };

  if (!tasks || !filteredTasks) {
    return "loading";
  }
  return (
    <main className="">
      <h1 className="p-4 ">Task List</h1>
      <FilterForm onFilter={handleFilter} />
      <ListView tasks={filteredTasks} />
    </main>
  );
};

export default ViewTasks;
