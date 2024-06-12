import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import GardenLayout from "./component/GardenLayout";
import HomePage from "./component/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./services/store/reducers/AuthSlice";
import GardenPage from "./component/GardenPage";

function App() {
  const { loggedIn, user } = useSelector((state) => state.auth);
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
      console.log(userData.user);
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
            <HomePage loggedIn={loggedIn} user={user} />
          </div>
        }
      />
      <Route
        path="private/garden_layout/:id"
        element={<GardenPage loggedIn={loggedIn} user={user} />}
      />
    </Routes>
  );
}

export default App;
