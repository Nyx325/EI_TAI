import React from "react";
import AboutSection from "./AboutSection";
import TeamSection from "./TeamSection";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <main className="home">
      <AboutSection />
      <TeamSection />
    </main>
  );
};

export default Home;
