import TaskForm from "../Components/TaskForm";

const AddTask = () => {
  return (
    <main className="p-4">
      <h1>Add Task</h1>
      <TaskForm type="add" />
    </main>
  );
};

export default AddTask;
