import { Outlet } from "react-router-dom";
import Navbar from "./Components/NavBar";
import { useEffect } from "react";
import { authState } from "./API/Auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { updateAuth } from "./store/slices/Auth";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    authState((user) => {
      if(!user) {
        dispatch(updateAuth(null))
        return;
      };
      const {displayName, email, uid} = user;
      dispatch(updateAuth({displayName, email, uid}));
    });
  }, []);
  return (
    <div>
      <Navbar /> {/* Include the Navbar */}
      <Outlet /> {/* Renders the matching child route */}
    </div>
  );
};

export default App;
