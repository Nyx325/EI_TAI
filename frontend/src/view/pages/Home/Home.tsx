import React from "react";
import AboutSection from "./AboutSection";
import TeamSection from "./TeamSection";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <>
      <AboutSection />
      <TeamSection />
    </>
  );
};

export default Home;
