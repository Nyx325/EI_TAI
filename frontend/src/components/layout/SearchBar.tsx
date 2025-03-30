import React, { useState } from "react";
import { AppState, useAppContext } from "../../context/AppContext";

const SearchBar: React.FC = () => {
  const { setAppState } = useAppContext();
  const [input, setInput] = useState({
    estado: "",
    ciudad: "",
    llegada: "",
    salida: "",
  });

  const handleInputChange =
    (field: keyof typeof input) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <nav>
      <input
        type="text"
        placeholder="Estado"
        value={input.estado}
        onChange={handleInputChange("estado")}
      />
    </nav>
  );
};

export default SearchBar;
