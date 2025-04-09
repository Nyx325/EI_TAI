import React, { createContext, useContext, useEffect, useState } from "react";
import { Cliente } from "../models/entities/cliente";

export enum AppView {
  Idle = "idle",
  Login = "login",
  Searching = "searching",
  AlojamientoSelected = "alojamientoSelected",
  Paying = "paying",
  Registering = "registering",
  AdminAlojamiento = "adminAlojamiento",
}

export interface SearchInput {
  ciudad?: number;
  llegada: string;
  salida: string;
}

export interface AppState {
  view: AppView;
  input: SearchInput;
  searching: boolean;
  cliente?: Cliente;
  selectedAlojamiento?: number;
}

interface AppContextProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appState, setAppState] = useState<AppState>(() => {
    const storedCliente = localStorage.getItem("cliente");
    let cliente: Cliente | undefined;

    if (storedCliente) {
      const parsedCliente = JSON.parse(storedCliente);
      cliente = {
        ...parsedCliente,
        fecha_nacimiento: new Date(parsedCliente.fecha_nacimiento),
      };
    }

    return {
      view: AppView.Idle,
      input: { llegada: "", salida: "" },
      searching: false,
      cliente,
    };
  });

  useEffect(() => {
    if (appState.cliente) {
      localStorage.setItem("cliente", JSON.stringify(appState.cliente));
    } else {
      localStorage.removeItem("cliente");
    }
  }, [appState.cliente]);

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
};
