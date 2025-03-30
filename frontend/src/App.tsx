import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./components/layout/Layout";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Rutas que comparten el layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
