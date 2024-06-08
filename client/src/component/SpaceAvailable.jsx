import { useState } from "react";
import VegetableList from "./VegetableList";

export default function SpaceAvailable({
  spaceUsed,
  totalSpace,
  apiData,
  handleAddVegetable,
  addedPlantList,
}) {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="m-4">
      <div className="flex justify-center items-center text-xl gap-5">
        <p>
          Space used: {spaceUsed}/{totalSpace}{" "}
        </p>
        <button onClick={togglePopup} className="button px-4 py-1">
          Add
        </button>
      </div>

      {showPopup && (
        <div className="flex justify-between ">
          <VegetableList
            togglePopup={togglePopup}
            apiData={apiData}
            handleAddVegetable={handleAddVegetable}
            addedPlantList={addedPlantList}
          />
        </div>
      )}
    </div>
  );
}
