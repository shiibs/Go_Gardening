import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import GardenLayout from "./component/GardenLayout";
import HomePage from "./component/HomePage";
import { useDispatch, useSelector } from "react-redux";

import GardenPage from "./component/GardenPage";
import axios from "axios";

function App() {
  const [userDetails, setUserDetails] = useState({
    gardens: [],
    userName: "",
    loginStatus: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/private/get_user_data",
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          const user = response.data.gardens;
          console.log(user);
          setUserDetails({
            gardens: response.data["gardens"],
            userName: response.data.userName,
            loginStatus: true,
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <HomePage
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          </div>
        }
      />
      <Route
        path="private/garden_layout/:id"
        element={
          <GardenPage
            userDetails={userDetails}
            setUserDetails={setUserDetails}
          />
        }
      />
    </Routes>
  );
}

export default App;
