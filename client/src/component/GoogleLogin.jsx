import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function GoogleLogin() {
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/auth/callback${location.search}`,
          { withCredentials: true }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user info", error);
      }
    };
    fetchData();
  }, [location.search]);
  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:8001/api/auth/login", {
        withCredentials: true,
      });
      window.location.href = response.data;
    } catch (error) {
      console.log("Error during login", error);
    }
  };
  <div>
    <button onClick={handleLogin}>Login with Google</button>
  </div>;
}
