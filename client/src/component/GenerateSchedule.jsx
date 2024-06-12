import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import axios from "axios";
import Login from "./Login";
import Spinner from "./Spinner";

export default function GenerateSchedule({
  handleConfirm,
  rows,
  columns,
  addedPlantList,
  loggedIn,
}) {
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate(); // Get history object
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveForm = async (formData, event) => {
    try {
      setLoading(true);
      const url = "http://localhost:8001/private/create_gardenLayout";
      const requestDate = {
        ...formData,
        rows: rows,
        columns: columns,
        addedPlantList: addedPlantList,
      };
      const response = await axios.post(url, requestDate, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      if (response.status === 201) {
        const id = response?.data.gardenId;
        setLoading(false);
        navigate(`/private/garden_layout/${id}`);
      }
    } catch (error) {
      console.log(error.response);
      navigate("/", {
        state: { type: "error", message: "Server error" },
      });
    }
  };

  return (
    <div>
      {loggedIn ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-md shadow-md max-w-3xl relative">
            {" "}
            {/* Apply relative positioning */}
            <button
              onClick={handleConfirm}
              className="absolute top-2 right-2 text-gray-500"
            >
              {" "}
              {/* Position close button absolutely */}
              <AiOutlineClose size={20} />
            </button>
            <form
              onSubmit={handleSubmit(saveForm)}
              className="text-center mt-5"
            >
              {" "}
              <label htmlFor="gardenName" className="pr-11">
                Garden Name
              </label>
              <input
                type="gardenName"
                id="gardenName"
                placeholder="Enter name"
                className={`inline-block border ${
                  errors.gardenName && "error"
                }`}
                {...register("gardenName", {
                  required: "Garden name cannot be empty",
                })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.gardenName.message}</p>
              )}
              <div className=" flex gap-2 pt-3">
                {" "}
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  id="startDate"
                  className={`inline-block border ${
                    errors.startDate && "error"
                  }`}
                  {...register("startDate", {
                    required: "Please Select a date",
                  })}
                />
                {errors.startDate && (
                  <p className="text-red-500">{errors.startDate.message}</p>
                )}
              </div>
              {loading && <Spinner />}
              <button
                type="submit"
                className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Generate Schedule
              </button>{" "}
              {/* Center the button */}
            </form>
          </div>
        </div>
      ) : (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-md shadow-md max-w-3xl relative">
            <button
              onClick={handleConfirm}
              className="absolute top-1 right-1 text-gray-500"
            >
              {" "}
              {/* Position close button absolutely */}
              <AiOutlineClose size={10} />
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
}
