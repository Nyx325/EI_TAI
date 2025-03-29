// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { USER_STATUS, useUser } from "./UserContext";

const Header: React.FC = () => {
  const { user, status, logout } = useUser();
  return (
    <header>
      <section>
        <h1>Rêverie</h1>
      </section>
      <section>
        {status === USER_STATUS.LOGGED_IN && user ? (
          <>
            <span>
              Hola, {user.nombres} {user.apellidoP}
            </span>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>
        )}
      </section>
    </header>
  );
};

export default Header;
