import React, { useState, useEffect, useCallback } from "react";
import { API_URL } from "../../config";
import { useSearchContext } from "../../context/SearchContext";
import "./SearchBar.css";
import Alert, { AlertType } from "../common/Alert";

type SelectData = {
  estado: string[];
  ciudad: string[];
};

const SearchBar: React.FC = () => {
  const { searchState, setSearchState } = useSearchContext();

  const [errors, setErrors] = useState<string | string[] | undefined>(
    undefined,
  );
  const [selectData, setSelectData] = useState<SelectData>({
    estado: [],
    ciudad: [],
  });
  const [input, setInput] = useState({
    llegada: "",
    salida: "",
    estado: "",
    ciudad: "",
  });

  const handleInputChange =
    (field: keyof typeof input) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setInput((prev) => ({ ...prev, [field]: e.target.value }));
    };

  // Cargar estados al montar el componente
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch(`${API_URL}/estados`);
        if (!response.ok) throw new Error("Error cargando estados");

        const data = await response.json();
        const estados = Array.isArray(data.search.result)
          ? data.search.result.map((v: any) => `${v.nombre}`)
          : [];

        setSelectData((prev) => ({ ...prev, estado: estados }));
      } catch (error) {
        setErrors("Error al obtener estados, intente más tarde");
        console.error("Error fetching estados:", error);
        setSelectData((prev) => ({ ...prev, estado: [] }));
      }
    };

    fetchEstados();
  }, []);

  // Cargar ciudades cuando cambia el estado seleccionado
  useEffect(() => {
    const fetchCiudades = async () => {
      if (!input.estado) {
        setSelectData((prev) => ({ ...prev, ciudad: [] }));
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/ciudad?nombre=${input.estado}`,
        );

        if (!response.ok) throw new Error("Error cargando ciudades");

        const data = await response.json();
        const ciudades = Array.isArray(data.search.result)
          ? data.search.result.map((v: any) => `${v.nombre}`)
          : [];

        setSelectData((prev) => ({ ...prev, ciudad: ciudades }));
        setInput((prev) => ({ ...prev, ciudad: "" })); // Resetear ciudad al cambiar estado
      } catch (error) {
        setErrors("Error al obtener las ciudades, intente más tarde");
        console.error("Error fetching ciudades", error);
        setSelectData((prev) => ({ ...prev, ciudad: [] }));
      }
    };

    fetchCiudades();
  }, [input.estado]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const response = await fetch(`${API_URL}/`);
    },
    [input],
  );

  const handleErrors = (errors: string | string[]): string => {
    if (Array.isArray(errors)) return errors.join(", ");
    return errors;
  };

  return (
    <nav>
      <div>
        <form className="searchbar-container" onSubmit={handleSubmit}>
          {/* Selector de Estado */}
          <select
            className="searchbar-select"
            value={input.estado}
            onChange={handleInputChange("estado")}
            required
          >
            <option value="">Selecciona un estado</option>
            {selectData.estado.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>

          {/* Selector de Ciudad */}
          <select
            className="searchbar-select"
            value={input.ciudad}
            onChange={handleInputChange("ciudad")}
            disabled={!input.estado}
            required
          >
            <option value="">Selecciona una ciudad</option>
            {selectData.ciudad.map((ciudad) => (
              <option key={ciudad} value={ciudad}>
                {ciudad}
              </option>
            ))}
          </select>

          {/* Inputs de fecha */}
          <input
            className="searchbar-input"
            type="date"
            placeholder="Llegada"
            value={input.llegada}
            onChange={handleInputChange("llegada")}
            required
          />
          <input
            className="searchbar-input"
            type="date"
            placeholder="Salida"
            value={input.salida}
            onChange={handleInputChange("salida")}
            required
          />

          <button className="searchbar-button">Buscar</button>
        </form>
      </div>
      <div>
        {errors && (
          <Alert message={handleErrors(errors)} type={AlertType.DANGER} />
        )}
      </div>
    </nav>
  );
};

export default SearchBar;
