import React, { createContext, useContext, useState } from "react";

export interface SearchState {
  llegada: string;
  salida: string;
  estado: string;
  ciudad: string;
}

interface SearchContextProps {
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchState, setSearchState] = useState<SearchState>({
    salida: "",
    ciudad: "",
    estado: "",
    llegada: "",
  });

  return (
    <SearchContext.Provider value={{ searchState, setSearchState }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext debe usarse dentro de un SearchProvider");
  }
  return context;
};
