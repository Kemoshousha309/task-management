import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ViewTasks from "./pages/ViewTasks";
import AddTask from "./pages/AddTask";
import { Provider } from "react-redux";
import { store } from "./store/store";
import EditTask from "./pages/EditTask";
import TaskDetail from "./pages/TaskDetails";
import Layout from "./Components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout for all routes
    children: [
      {
        index: true, // Default route for "/"
        element: <ViewTasks />,
      },
      {
        path: "add-task",
        element: <AddTask />,
      },
      {
        path: "edit-task",
        element: <EditTask />,
      },
      {
        path: "task/:taskId",
        element: <TaskDetail />,
      },
    ],
  },
]);


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
