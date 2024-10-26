import { Link } from 'react-router-dom';

const Navbar = () => {
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
