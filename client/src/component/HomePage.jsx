import { useState } from "react";
import { useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";
import GardenPlanner from "./GardenPlanner";
import { useSelector } from "react-redux";

export default function HomePage({ userDetails, setUserDetails }) {
  return (
    <div>
      <Header
        isHomePage={true}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
      <Hero />
      <GardenPlanner
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
      <Features />
      <Footer />
    </div>
  );
}
