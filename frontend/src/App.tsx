import "./App.css";
import { AppProvider, useAppContext, AppView } from "./view/AppContext";
import Header from "./view/components/layout/Header";
import SearchBar from "./view/components/layout/SearchBar";
import Home from "./view/pages/Home/Home";

const renderView = {
  [AppView.Idle]: <Home />,
  [AppView.Searching]: <h1>Searching</h1>,
  [AppView.AlojamientoSelected]: <h1>Alojamiento Selected</h1>,
  [AppView.Paying]: <h1>Paying</h1>,
  [AppView.Login]: <h1>Login</h1>,
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
