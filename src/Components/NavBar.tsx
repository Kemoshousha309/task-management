import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { logout } from "../API/Auth";

const Navbar = () => {
  const { user } = useSelector((s: RootState) => s.Auth);
  const navigate = useNavigate();
  return (
    <nav className=" p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className=" text-2xl font-bold max-sm:hidden">Task Manager</h1>
        <div className="space-x-4">
          <Link to="/" className=" hover:text-gray-400">
            Tasks
          </Link>
          <Link to="/add-task" className=" hover:text-gray-400">
            Add New Task
          </Link>
          {user ? (
            <button onClick={() => logout().then(() => navigate("/signup"))}>
              logout
            </button>
          ) : (
            <Link to="/signup" className=" hover:text-gray-400">
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
