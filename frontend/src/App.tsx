import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Auth/Login";
import { AppProvider, useAppContext } from "./context/AppContext";

export enum AppState {
  HOME = "home",
  LOGIN = "login",
}

const renderView = {
  [AppState.HOME]: <Home />,
  [AppState.LOGIN]: <Login />,
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
