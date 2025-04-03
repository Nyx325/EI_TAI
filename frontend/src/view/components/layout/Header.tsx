import React from "react";
import { USER_STATUS, useUser } from "../../context/UserContext";
import "./Header.css";
import { useAppContext, AppState } from "../../context/AppContext";

const Header: React.FC = () => {
  const { user, status, logout } = useUser();
  const { setAppState } = useAppContext();

  return (
    <>
      <header className="header">
        <section className="logo-section">
          <div className="logo" onClick={() => setAppState(AppState.HOME)}>
            Rêverie
          </div>
        </section>

        <section className="nav-section">
          {status === USER_STATUS.LOGGED_IN && user ? (
            <div className="user-container">
              <span className="greeting">
                Hola, {user.nombres} {user.apellidoP}
              </span>
              <button onClick={logout} className="button button--primary">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setAppState(AppState.LOGIN)}
                className="button button--outline"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => setAppState(AppState.REGISTER)}
                className="button button--primary"
              >
                Registrarse
              </button>
            </>
          )}
        </section>
      </header>
    </>
  );
};

export default Header;
