import React, { useEffect, useState } from "react";
import ciudadHttpController from "../../../controller/ciudad.controller";
import estadoHttpController from "../../../controller/estado.controller";
import { Ciudad } from "../../../models/entities/ciudad";
import { Estado } from "../../../models/entities/estado";
import { AppView, useAppContext } from "../../AppContext";
import "./SearchBar.css";
import Alert from "../common/Alert";

type SelectData = {
  estados: Estado[];
  ciudades: Ciudad[];
};

const SearchBar: React.FC = () => {
  const { appState, setAppState } = useAppContext();
  const [errors, setErrors] = useState<string | undefined>(undefined);
  const [selectData, setSelectData] = useState<SelectData>({
    estados: [],
    ciudades: [],
  });

  const handleFiltroClick = () => {
    // Lógica para mostrar modal o menú lateral de filtros
    console.log("Mostrar modal o menú lateral de filtros");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setAppState((prev) => ({
      ...prev,
      view: AppView.Searching,
    }));
  };

  const handleInputChange =
    (field: keyof Omit<typeof appState.input, "estado" | "ciudad">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setAppState((prev) => ({
        ...prev,
        input: { ...prev.input, [field]: e.target.value },
      }));
    };

  const handleEstadoChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectElement = e.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const keyStr = selectedOption.getAttribute("data-key");
    const key = keyStr ? Number(keyStr) : undefined;

    if (!key) {
      setSelectData((prev) => ({ ...prev, ciudades: [] }));
      return;
    }

    try {
      let lastP = 1;
      let page = 1;
      const ciudades: Ciudad[] = [];

      do {
        const searchResult = await ciudadHttpController.getBy(
          {
            estadoId: key,
          },
          page,
        );

        if (searchResult.err) {
          throw Error("Cannot get ciudades from controller");
        }

        const search = searchResult.val;
        if (search === null) {
          setSelectData((prev) => ({ ...prev, ciudades: [] }));
          break;
        }

        ciudades.push(...search.result);
        page++;
        lastP = search.totalPages;
      } while (page <= lastP);

      setSelectData((prev) => ({ ...prev, ciudades }));
    } catch (error) {
      console.error("Error fetching estados:", error);
      setSelectData((prev) => ({ ...prev, ciudades: [] }));
    }
  };

  const handleCiudadChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectElement = e.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const key = selectedOption.getAttribute("data-key");

    setAppState((prev) => ({
      ...prev,
      input: {
        ...prev.input,
        ciudad: Number.parseInt(key as string),
      },
    }));
  };

  useEffect(() => {
    const fetchEstados = async () => {
      const estados: Estado[] = [];
      try {
        let lastP = 1;
        let page = 1;

        do {
          const searchResult = await estadoHttpController.getBy({}, page);

          if (searchResult.err) {
            throw Error("Cannot get estados from controller");
          }

          const search = searchResult.val;
          if (search === null) {
            setSelectData((prev) => ({ ...prev, estados: [] }));
            break;
          }

          estados.push(...search.result);
          page++;
          lastP = search.totalPages;
        } while (page <= lastP);

        setSelectData((prev) => ({ ...prev, estados }));
      } catch (error) {
        console.error("Error fetching estados:", error);
        setSelectData((prev) => ({ ...prev, estados: [] }));
      }
    };

    fetchEstados();
  }, []);

  return (
    <nav className="search-bar-container">
      <form className="search-bar" onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            onChange={handleEstadoChange}
            required
          >
            <option value="">Selecciona Estado</option>
            {selectData.estados.map((estado) => (
              <option
                key={estado.id}
                value={estado.nombre}
                data-key={estado.id}
              >
                {estado.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="ciudad">Ciudad</label>
          <select
            id="ciudad"
            name="ciudad"
            onChange={handleCiudadChange}
            required
          >
            <option value="">Selecciona Ciudad</option>
            {selectData.ciudades.map((ciudad) => (
              <option
                key={ciudad.id}
                value={ciudad.nombre}
                data-key={ciudad.id}
              >
                {ciudad.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fecha-leyenda">Llegada</label>
          <input
            id="fecha-llegada"
            name="fechaLlegada"
            type="date"
            onChange={handleInputChange("llegada")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha-salida">Salida</label>
          <input
            id="fecha-salida"
            name="fechaSalida"
            type="date"
            onChange={handleInputChange("salida")}
            required
          />
        </div>
        <div className="form-group">
          <button
            type="button"
            className="btn filtros"
            onClick={handleFiltroClick}
          >
            Filtros
          </button>
        </div>
        <div className="form-group">
          <button type="submit" className="btn buscar">
            Buscar
          </button>
        </div>
      </form>
    </nav>
  );
};

export default SearchBar;
