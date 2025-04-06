import React from "react";
import { AppView, useAppContext } from "../../AppContext";
import "./Header.css";

const Header: React.FC = () => {
  const { appState, setAppState } = useAppContext();

  const handleLogout = () => {
    // Lógica para cerrar sesión
    setAppState((prev) => ({ ...prev, cliente: undefined }));
  };

  const handleLogin = () => {
    setAppState((prev) => ({ ...prev, view: AppView.Login }));
  };

  const handleRegister = () => {
    setAppState((prev) => ({ ...prev, view: AppView.Registering }));
  };

  const handleMainPage = () => {
    setAppState((prev) => ({ ...prev, view: AppView.Idle }));
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="title clickable" onClick={handleMainPage}>
          Rêverie
        </h1>
        <div className="actions">
          {!appState.cliente ? (
            <>
              <button className="btn" onClick={handleLogin}>
                Iniciar sesión
              </button>
              <button className="btn secondary" onClick={handleRegister}>
                Registrarse
              </button>
            </>
          ) : (
            <>
              <span className="greeting">Hola {appState.cliente.nombres}</span>
              <button className="btn" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
