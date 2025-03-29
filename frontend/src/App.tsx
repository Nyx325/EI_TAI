import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import OtraPagina from "./views/OtraPagina";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/otraPagina" element={<OtraPagina />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
