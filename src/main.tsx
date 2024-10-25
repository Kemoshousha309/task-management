import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ViewTasks from "./pages/ViewTasks";
import AddTask from "./pages/AddTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ViewTasks />,
  },
  {
    path: "/add-task",
    element: <AddTask />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
