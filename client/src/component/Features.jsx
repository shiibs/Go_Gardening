import { Link } from "react-router-dom";

export default function Features() {
  return (
    <div>
      <h2 className="font-bold text-center text-2xl py-6 text-gray-800">
        Key Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 px-10 gap-5 mx-4 text-gray-500 pb-10">
        <div className="feature">
          <h3>Interactive garden planner</h3>
          <p>
            Design your garden layout effortlessly and visualize your garden
            beds with precision.
          </p>
        </div>

        <div className="feature">
          <h3>Plant Selection</h3>
          <p>
            Explore a vast database of vegetables and herbs. Select your
            favorite plants with optimal number of plants per square foot, along
            with weekly yield projections.
          </p>
        </div>
        <div className="feature">
          <h3>Personalized Gardening Schedule</h3>
          <p>
            Receive personalized gardening schedules tailored to your
            preferences. Prepare your garden beds with our step-by-step guide.
          </p>
        </div>

        <div className="feature">
          <h3>Garden Care Schedule</h3>
          <p>
            Receive timely reminders for fertilization, pest inspections,
            pruning, and more, tailored to your garden's needs.
          </p>
        </div>

        <div className="feature">
          <h3>Automatic calendar integration</h3>
          <p>
            Sync your gardening schedule with your calendar to receive reminders
            on your preferred devices.
          </p>
        </div>

        <div className="feature">
          <h3>Replant schedule</h3>
          <p>
            Optimize your garden's productivity with a replant schedule that
            ensures a steady supply of fresh produce throughout the year.
          </p>
        </div>
      </div>
    </div>
  );
}
