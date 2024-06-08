import { useEffect } from "react";

export default function AddedVegetableList({
  addedPlantList,
  setAddedPlantList,
  setNotification,
  spaceUsed,
  setSpaceUsed,
  totalSpace,
}) {
  const handleIncrement = (id) => {
    if (spaceUsed < totalSpace) {
      const updatedPlantList = addedPlantList.map((plant) =>
        plant.id === id ? { ...plant, count: plant.count + 1 } : plant
      );
      setAddedPlantList(updatedPlantList);
      setSpaceUsed(spaceUsed + 1);
    } else {
      setNotification({ type: "error", message: "No space left" });
    }
  };

  const handleDecrement = (id) => {
    const updatedPlantList = addedPlantList.map((plant) =>
      plant.id === id && plant.count > 0
        ? { ...plant, count: plant.count - 1 }
        : plant
    );
    setAddedPlantList(updatedPlantList.filter((plant) => plant.count > 0));
    setSpaceUsed(spaceUsed - 1);
  };

  return (
    <div>
      {addedPlantList.length > 0 && // Check if apiData is not empty
        addedPlantList.map((plant) => (
          <h4
            key={plant.id}
            className="hover:text-blue-700 cursor-pointer py-1 px-4"
          >
            <div className="border-b mb-2">
              <div className="flex justify-between">
                <p>{plant.name} </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecrement(plant.id)}
                    className="border rounded-lg  px-2 py-1 border-green-600"
                  >
                    -
                  </button>{" "}
                  <span className="py-1">{plant.count}</span>{" "}
                  <button
                    onClick={() => handleIncrement(plant.id)}
                    className="border rounded-lg  px-2 py-1 border-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-sm pb-2 ">
                Total projection per week{" "}
                <span>{plant.producePerSquare * plant.count}kgs</span>
              </p>
              <p className="text-sm pb-3">
                Expected Harvesting week {plant.harvestingWeek}
              </p>
            </div>
          </h4>
        ))}
    </div>
  );
}
