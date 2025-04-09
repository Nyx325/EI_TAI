import React from "react";
import { TipoCliente } from "../../../models/entities/cliente";
import { AppView, useAppContext } from "../../AppContext";
import "./Header.css";

const Header: React.FC = () => {
  const { appState, setAppState } = useAppContext();

  const handleLogout = () => {
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

  const handlePanelAdmin = () => {
    setAppState((prev) => ({ ...prev, view: AppView.AdminAlojamiento }));
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
          {appState.cliente && appState.cliente.tipo === TipoCliente.ADMIN && (
            <>
              <button className="btn" onClick={handlePanelAdmin}>
                Administrar alojamientos
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
