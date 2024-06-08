import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GardenLayoutTable from "./GardenLayoutTable";

export default function GardenLayout() {
  const { id } = useParams();
  const [garden, setGarden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  useEffect(() => {
    const fetchGardenLayout = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/garden_layout/${id}`
        );
        setGarden(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGardenLayout();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {garden && (
        <>
          <h1>{garden.name}</h1>
          <p>Start date: {formatDate(garden.startDate)}</p>
          <p>
            Planting: Pre-soaking of seeds in warm water overnight before
            planting them helps to soften the seed coat and speed up the seed
            germination. The seed should be planted 1/4 inch deep. Sow the seeds
            in moist soil, but the soil should not be over damp or soil dripping
            with water. Don't expose it to direct sunlight until the seeds get
            germinated. Maintaining a warm temperature leads to faster
            germination than very cold or scorching weather.
          </p>
          <p>
            Or If you want to germinate the seeds separately in a tray use the
            same soil mix sow the seed in moist soil. Pre-soaking of seeds in
            warm water overnight before planting them helps to soften the seed
            coat and speed up the seed germination. Sow the seeds in moist soil,
            but the soil should not be over damp or soil dripping with water.
            Don't expose the germination trays or grow bags in direct sunlight
            until the seeds get germinated. Maintaining a warm temperature leads
            to faster germination than very cold or scorching weather. Replant
            as soon as the seedlings break the surface and come out. And follow
            the planting process.
          </p>
          <GardenLayoutTable gardenLayout={garden.gardenLayout} />
          <p>
            Watering: Keep the soil moist always by slightly sprinkling the
            water over that area in the morning and evening.
          </p>
          <p>
            Fertilizer: Usage of organic growth promoters like cow dung manure,
            bone meal & fish meal monthly usage help in improved flowering and
            overall health of the plant.
          </p>
          <p>
            Pest control: Neem oil stands out as an excellent organic solution
            for your garden. Additionally, incorporating marigold plants into
            your garden not only adds vibrant colors but also serves as an
            effective natural pest repellent.
          </p>
        </>
      )}
    </div>
  );
}