import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import OtraPagina from "./views/OtraPagina";
import Layout from "./components/Layout";
import { UserProvider } from "./components/UserContext";
import Login from "./views/Login";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Rutas que comparten el layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="apartado" element={<OtraPagina />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
