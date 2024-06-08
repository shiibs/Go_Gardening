import { useState } from "react";
import { useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";
import GardenPlanner from "./GardenPlanner";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { loggedIn, user } = useSelector((state) => state.auth);
  return (
    <div>
      <Header isHomePage={true} loggedIn={loggedIn} user={user} />
      <Hero />
      <GardenPlanner loggedIn={loggedIn} />
      <Features />
      <Footer />
    </div>
  );
}
