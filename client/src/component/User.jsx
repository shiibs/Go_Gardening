import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import axios from "axios";

export default function User({ userDetails, setUserDetails }) {
  const [isOpen, setIsopen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8001/logout");

      if (response.status === 200) {
        setUserDetails({
          gardens: [],
          userName: "",
          loginStatus: false,
        });
        navigate("/", {
          state: { type: "success", message: "logged out" },
        });
      }
    } catch (error) {
      navigate("/", {
        state: { type: "error", message: "Internal error" },
      });
    }
  };

  const toggleDropDown = () => {
    setIsopen(!isOpen);
  };
  return (
    <div>
      {!isOpen && (
        <button onClick={toggleDropDown} className="text-white">
          {userDetails.userName}
        </button>
      )}

      {isOpen && (
        <div className="garden_list">
          <button
            onClick={toggleDropDown}
            className="absolute top-6 right-6 text-gray-300"
          >
            {" "}
            {/* Position close button absolutely */}
            <AiOutlineClose size={20} />
          </button>
          <h3>Gardens</h3>
          <ul className="my-2">
            {userDetails.gardens.length === 0 && <p>---</p>}
            {userDetails.gardens.map((garden) => (
              <li key={garden.id}>
                <Link to={`private/garden_layout/${garden.id}`}>
                  {garden.name}
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={handleLogout} className="button2 m-3 px-3">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
