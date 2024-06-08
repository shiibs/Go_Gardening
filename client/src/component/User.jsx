import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../services/store/reducers/AuthSlice";

export default function User({ user }) {
  const [isOpen, setIsopen] = useState(false);

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
      <button onClick={toggleDropDown} className="text-white">
        {user.user.name}
      </button>

      {isOpen && (
        <div>
          <button
            onClick={toggleDropDown}
            className="absolute top-2 right-2 text-gray-500"
          >
            {" "}
            {/* Position close button absolutely */}
            <AiOutlineClose size={20} />
          </button>
          <h3>Gardens</h3>
          <ul>
            {user.garden.length === 0 && <p>---</p>}
            {user.garden.map((garden) => {
              <Link to={`/garden_layout/${garden.id}`} key={garden.id}>
                {garden.name}
              </Link>;
            })}
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
