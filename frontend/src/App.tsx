import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { AppProvider, useAppContext, AppState } from "./context/AppContext";

const renderView = {
  [AppState.HOME]: <Home />,
  [AppState.LOGIN]: <Login />,
  [AppState.REGISTER]: <Register />,
};

const AppContent: React.FC = () => {
  const { appState } = useAppContext();
  return (
    <UserProvider>
      <Header />
      {renderView[appState]}
      <Footer />
    </UserProvider>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
