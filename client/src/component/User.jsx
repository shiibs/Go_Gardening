import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../services/store/reducers/AuthSlice";
import axios from "axios";

export default function User({ loggedIn, user }) {
  const [isOpen, setIsopen] = useState(false);
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:8001/private/get_gardens";
        if (loggedIn) {
          const response = await axios.get(url, {
            headers: {
              token: window.localStorage.getItem("token"),
            },
          });

          if (response.status == 200) {
            setApiData(response.data["gardens"]);
          }
        }
      } catch (error) {
        console.log("error", error.response);
      }
    };

    fetchData();
    return () => {};
  }, []);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    // Remove token
    window.localStorage.removeItem("token");

    // Remove user from redux store
    dispatch(logout());
  };

  const toggleDropDown = () => {
    setIsopen(!isOpen);
  };
  return (
    <div>
      {!isOpen && (
        <button onClick={toggleDropDown} className="text-white">
          {user.user.userName}
        </button>
      )}

      {isOpen && (
        <div className="pt-8 pr-4">
          <button
            onClick={toggleDropDown}
            className="absolute top-2 right-2 text-gray-300"
          >
            {" "}
            {/* Position close button absolutely */}
            <AiOutlineClose size={20} />
          </button>
          <h3>Gardens</h3>
          <ul>
            {apiData.length === 0 && <p>---</p>}
            {apiData.map((garden) => (
              <li key={garden.id}>
                <Link to={`private/garden_layout/${garden.id}`}>
                  {garden.name}
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
