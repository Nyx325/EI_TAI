import React from "react";
import { Link } from "react-router-dom";
import { USER_STATUS, useUser } from "../../context/UserContext";
import "./Header.css"; // Importa los estilos

const Header: React.FC = () => {
  const { user, status, logout } = useUser();

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
          <Link to="/login" className="link">
            <button className="button">Iniciar sesión</button>
          </Link>
        )}
      </section>
    </header>
  );
};

export default Header;
