import React, { createContext, useContext, useState } from "react";
import { Cliente } from "../models/entities/cliente";

export enum AppView {
  Idle = "idle",
  Login = "login",
  Searching = "searching",
  AlojamientoSelected = "alojamientoSelected",
  Paying = "paying",
}

export interface SearchInput {
  ciudad?: number;
  llegada: string;
  salida: string;
}

export interface AppState {
  view: AppView;
  cliente?: Cliente;
  input: SearchInput;
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
