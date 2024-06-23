import Footer from "./Footer";
import GardenLayout from "./GardenLayout";
import Header from "./Header";

export default function GardenPage({ userDetails, setUserDetails }) {
  return (
    <div>
      <Header
        isHomePage={false}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
      <GardenLayout userDetails={userDetails} setUserDetails={setUserDetails} />
      <Footer />
    </div>
  );
}
