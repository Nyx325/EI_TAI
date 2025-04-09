import "./App.css";
import { AppProvider, useAppContext, AppView } from "./view/AppContext";
import Header from "./view/components/layout/Header";
import SearchBar from "./view/components/layout/SearchBar";
import Home from "./view/pages/Home/Home";
import SearchingPage from "./view/pages/Search/SearchingPage";
import AlojamientoView from "./view/pages/Alojamiento/AlojamientoView";
import Login from "./view/pages/Auth/Login";
import Register from "./view/pages/Auth/Register";
import RAlojamientos from "./view/pages/CrudAlojamientos/RAlojamientos";

const renderView = {
  [AppView.Idle]: <Home />,
  [AppView.Searching]: <SearchingPage />,
  [AppView.AlojamientoSelected]: <AlojamientoView />,
  [AppView.Paying]: <h1>Paying</h1>,
  [AppView.Login]: <Login />,
  [AppView.Registering]: <Register />,
  [AppView.AdminAlojamiento]: <RAlojamientos />,
};

const AppContent: React.FC = () => {
  const { appState } = useAppContext();
  return (
    <>
      <Header />
      <SearchBar />
      <main>{renderView[appState.view]}</main>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
