import React, { createContext, useContext, useState } from "react";
import { Cliente } from "../models/entities/cliente";

export enum AppView {
  Idle = "idle",
  Login = "login",
  Searching = "searching",
  AlojamientoSelected = "alojamientoSelected",
  Paying = "paying",
  Registering = "registering",
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
  const [appState, setAppState] = useState<AppState>({
    view: AppView.Idle,
    input: {
      llegada: "",
      salida: "",
    },
    searching: false,
  });

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
