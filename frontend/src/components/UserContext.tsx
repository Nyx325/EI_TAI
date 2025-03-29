import React, { createContext, useContext, useState } from "react";
import { User } from "../models/entities/user";

// Enum para el estado del usuario
export enum USER_STATUS {
  GUEST = "guest",
  LOGGED_IN = "logged_in",
}

// Definir la estructura del contexto
interface UserContextType {
  user: User | null; // `null` significa que no ha iniciado sesión
  status: USER_STATUS;
  login: (user: User) => void;
  logout: () => void;
}

// Crear el contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Proveedor de usuario
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<USER_STATUS>(USER_STATUS.GUEST);

  const login = (userData: User) => {
    setUser(userData);
    setStatus(USER_STATUS.LOGGED_IN);
  };

  const logout = () => {
    setUser(null);
    setStatus(USER_STATUS.GUEST);
  };

  return (
    <UserContext.Provider value={{ user, status, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe estar dentro de UserProvider");
  }
  return context;
};
