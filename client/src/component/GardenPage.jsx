import Footer from "./Footer";
import GardenLayout from "./GardenLayout";
import Header from "./Header";

export default function GardenPage({ loggedIn, user }) {
  return (
    <div>
      <Header isHomePage={false} loggedIn={loggedIn} user={user} />
      <GardenLayout loggedIn={loggedIn} user={user} />
      <Footer />
    </div>
  );
}
