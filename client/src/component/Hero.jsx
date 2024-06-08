import gardenpots from "../assets/gardenpots.jpg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="w-full h-screen relative">
      <img
        src={gardenpots}
        alt="planters"
        className="w-full h-full object-cover"
      />

      <div className="absolute w-full h-full top-0 left-0 bg-gray-800/50"></div>
      <div className="absolute top-0 w-full h-full flex flex-col text-white text-center justify-center p-4">
        <h1>Plan & Manage Your Home Garden.</h1>
        <p className="pt-4 text-xl">
          Create your garden layout, select your favorite vegetables and receive
          personalized gardening schedule.
        </p>
        {/* <div className="inline-block mt-6">
          <Link to="/garden-planner" className="button px-10">
            Start Now
          </Link>
        </div> */}
      </div>
    </div>
  );
}
