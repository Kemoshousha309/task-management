import Navbar from "./NavBar"; // Adjust the import path as needed
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar /> {/* Include the Navbar */}
        <Outlet /> {/* Renders the matching child route */}
    </div>
  );
};

export default Layout;
