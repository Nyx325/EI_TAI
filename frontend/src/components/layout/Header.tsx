import React from "react";
import { USER_STATUS, useUser } from "../../context/UserContext";
import { AppState } from "../../App";
import "./Header.css";
import { useAppContext } from "../../context/AppContext";


const Header: React.FC = () => {
  const { user, status, logout } = useUser();
  const {setAppState} = useAppContext();

  return (
    <header className="header">
      <section className="logo-section">
        <h1 className="logo">Rêverie</h1>
      </section>

      <section className="nav-section">
        {status === USER_STATUS.LOGGED_IN && user ? (
          <div className="user-container">
            <span className="greeting">
              Hola, {user.nombres} {user.apellidoP}
            </span>
            <button onClick={logout} className="button">
              Cerrar sesión
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAppState(AppState.LOGIN)}
            className="button"
          >
            Iniciar sesión
          </button>
        )}
      </section>
    </header>
  );
};

export default Header;
