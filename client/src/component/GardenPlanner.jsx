import { useEffect, useState } from "react";
import Footer from "./Footer";

import Header from "./Header";
import NumberDropdown from "./NumberDropdown";
import SpaceAvailable from "./SpaceAvailable";
import axios from "axios";
import AddedVegetableList from "./AddedVegetableList";
import Notification from "./Notification";
import GenerateSchedule from "./GenerateSchedule";

export default function GardenPlanner({ userDetails }) {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [spaceUsed, setSpaceUsed] = useState(0);
  const [totalSpace, setTotalSpace] = useState(100);
  const [apiData, setApiData] = useState([]);
  const [addedPlantList, setAddedPlantList] = useState([]);
  const [notification, setNotification] = useState({});
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8001/get_plants");

        if (response.data) {
          // Check if response.data exists
          setApiData(response.data["plant_list"]);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newTotalSpace = rows * columns;
    setTotalSpace(newTotalSpace);
  }, [rows, columns]);

  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      setNotification(null);
    }, 3000);
    return () => clearTimeout(notificationTimer);
  }, [notification]);

  const handleSelectChangeRows = (e) => {
    setRows(e.target.value);
  };

  const handleSelectChangeColumns = (e) => {
    setColumns(e.target.value);
  };

  const handleAddVegetable = (id) => {
    if (spaceUsed < totalSpace) {
      const selectedPlant = apiData.find((plant) => plant.id === id);
      const newPlant = { ...selectedPlant, count: 1 };
      setAddedPlantList([...addedPlantList, newPlant]);
      setSpaceUsed(spaceUsed + 1);
    } else {
      setNotification({ type: "error", message: "No space left" });
    }
  };

  const handleConfirm = () => {
    setConfirm(!confirm);
  };

  return (
    <div className="mb-10">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}

      {/* <Header isHomePage={false} /> */}
      <div className="bg-gray-50 py-4">
        <h3 className="text-center text-2xl pb-4 pt-3">Start now</h3>
        <div className=" flex gap-3 justify-center text-xl">
          <label className="pr-2">Space in Square foot</label>
          <NumberDropdown
            identifier="rows"
            onSelectChange={handleSelectChangeRows}
            defaultValue={rows}
          />
          <NumberDropdown
            identifier="columns"
            onSelectChange={handleSelectChangeColumns}
            defaultValue={columns}
          />
        </div>
        <SpaceAvailable
          spaceUsed={spaceUsed}
          totalSpace={totalSpace}
          apiData={apiData}
          handleAddVegetable={handleAddVegetable}
          addedPlantList={addedPlantList}
        />
      </div>
      <AddedVegetableList
        addedPlantList={addedPlantList}
        setAddedPlantList={setAddedPlantList}
        setNotification={setNotification}
        spaceUsed={spaceUsed}
        setSpaceUsed={setSpaceUsed}
        totalSpace={totalSpace}
      />

      {addedPlantList.length > 0 && (
        <div className="flex justify-center my-3">
          <button onClick={handleConfirm} className="button py-2 px-4">
            Confirm
          </button>
        </div>
      )}

      {confirm && (
        <GenerateSchedule
          handleConfirm={handleConfirm}
          rows={rows}
          columns={columns}
          addedPlantList={addedPlantList}
          userDetails={userDetails}
        />
      )}
    </div>
  );
}
