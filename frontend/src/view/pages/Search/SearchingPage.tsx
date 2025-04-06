import React, { useEffect, useState } from "react";
import alojamientoHttpController from "../../../controller/alojamiento.controller";
import { Alojamiento } from "../../../models/entities/alojamiento";
import { useAppContext } from "../../AppContext";
import AlojamientoCard from "../../components/common/AlojamientoCard";

type PaginationState = {
  data: Alojamiento[];
  currentPage: number;
  totalPages: number;
};

const SearchingPage: React.FC = () => {
  const { appState, setAppState } = useAppContext();
  const [pageState, setPageState] = useState<PaginationState>({
    data: [],
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    if (!appState.searching) return;

    const getAlojamientos = async () => {
      const searchResult = await alojamientoHttpController.getBy(
        {
          ciudadId: appState.input.ciudad,
        },
        1,
      );

      if (searchResult.err || searchResult.val === null) {
        if (searchResult.err)
          console.error("No se pudo recuperar los alojamientos");
        setPageState((prev) => ({ ...prev, data: [] }));
        return;
      }

      const { totalPages, currentPage, result } = searchResult.val;
      setPageState({
        currentPage,
        totalPages,
        data: result,
      });
    };

    getAlojamientos();
    setAppState((prev) => ({ ...prev, searching: false }));
  }, [appState.searching]);

  return (
    <>
      {pageState.data.map((a) => (
        <AlojamientoCard key={a.id} alojamiento={a} data-key={a.id} />
      ))}
    </>
  );
};

export default SearchingPage;
