import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import GardenLayout from "./component/GardenLayout";
import HomePage from "./component/HomePage";
import { useDispatch } from "react-redux";
import { setUser } from "./services/store/reducers/AuthSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to parse cookie string and return cookie value by name
    const getCookie = (name) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      if (match) return match[2];
    };

    // Retrieve user data cookie
    const userDataCookie = getCookie("userData");

    if (userDataCookie) {
      // Parse the user data cookie
      const userData = JSON.parse(userDataCookie);
      localStorage.setItem("token", userData.token);
      console.log(userData);
      // Dispatch action to update Redux store with user data
      dispatch(setUser(userData));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <HomePage />
          </div>
        }
      />
      <Route path="/garden_layout/:id" element={<GardenLayout />} />
    </Routes>
  );
}

export default App;
