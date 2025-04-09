import React, { useCallback, useEffect, useState } from "react";
import alojamientoHttpController from "../../../controller/alojamiento.controller";
import { Alojamiento } from "../../../models/entities/alojamiento";
import Pagination from "../../components/common/Pagination";
import AlojamientoDialog from "./AlojamientoDialog";
import "./RAlojamientos.css";

type ViewData = {
  alojamientos: Alojamiento[];
  currentPage: number;
  totalPages: number;
};

enum ModalState {
  HIDDEN,
  VISIBLE,
  SENDING,
}

const newAlojamiento = (): Alojamiento => {
  return {
    id: 0,
    titulo: "",
    descripcion: "",
    banios: 1,
    alberca: false,
    cocina: false,
    wifi: false,
    television: false,
    aire_acondicionado: false,
    precio_por_noche: 0,
    latitud: 0,
    longitud: 0,
  };
};

const RAlojamientos: React.FC = () => {
  const [modalState, setModalState] = useState<ModalState>(ModalState.HIDDEN);
  const [selectedAlojamiento, setSelectedAlojamiento] =
    useState<Alojamiento | null>(null);

  const [viewData, setViewData] = useState<ViewData>({
    alojamientos: [],
    currentPage: 1,
    totalPages: 1,
  });

  const handlePageChange = (page: number) => {
    setViewData((prev) => ({ ...prev, currentPage: page }));
  };

  const fetchAlojamientos = useCallback(async () => {
    try {
      const validation = await alojamientoHttpController.getBy(
        {},
        viewData.currentPage,
      );

      if (validation.err) throw new Error("Error al obtener alojamientos");

      if (validation.val) {
        const { result, currentPage, totalPages } = validation.val;
        setViewData((prev) => ({
          ...prev,
          alojamientos: result,
          currentPage, // O actualizar solo si es necesario
          totalPages,
        }));
      } else {
        setViewData((prev) => ({
          ...prev,
          alojamientos: [],
          totalPages: 1,
          currentPage: 1,
        }));
      }
    } catch (error) {
      console.error(error);
      setViewData((prev) => ({
        ...prev,
        alojamientos: [],
        totalPages: 1,
        currentPage: 1,
      }));
    }
  }, [viewData.currentPage]);

  // Efecto que se ejecuta cuando cambia currentPage
  useEffect(() => {
    fetchAlojamientos();
  }, [fetchAlojamientos]);

  // Handler para eliminar usando useCallback
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      const key = e.currentTarget.dataset.key;
      if (!key) throw Error("Error al obtener data-key");

      await alojamientoHttpController.delete(Number(key));
      await fetchAlojamientos();
    },
    [fetchAlojamientos],
  );

  const handleOpenModal: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(async (e) => {
      const key = e.currentTarget.dataset.key;
      if (!key) throw Error("Error al obtener data-key");

      const record = await alojamientoHttpController.get(Number(key));
      if (record.err || !record.val) throw Error("Error al obtener registro");

      setSelectedAlojamiento(record.val);
      setModalState(ModalState.VISIBLE);
    }, []);

  const handleCloseModal = () => {
    setModalState(ModalState.HIDDEN);
    setSelectedAlojamiento(null);
  };

  const handleSubmit = async (a: Alojamiento) => {
    if (!a) throw new Error("No se seleccionó un registro");
    const { id, precio_por_noche, longitud, latitud, banios, ...restA } = a;

    try {
      if (a.id === 0) {
        const validation = await alojamientoHttpController.add({
          ...restA,
          precio_por_noche: Number(precio_por_noche),
          longitud: Number(longitud),
          latitud: Number(latitud),
          banios: Number(banios),
        });
        if (validation.err) {
          console.error(validation.val);
        } else {
          handleCloseModal();
          await fetchAlojamientos();
        }
      } else {
        const validation = await alojamientoHttpController.update({
          ...restA,
          id,
          precio_por_noche: Number(precio_por_noche),
          longitud: Number(longitud),
          latitud: Number(latitud),
          banios: Number(banios),
        });
        if (validation.err) {
          console.error(validation.val);
        } else {
          handleCloseModal();
          await fetchAlojamientos();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="alojamientos-container">
      <h1>Alojamientos</h1>

      <button
        className="button"
        onClick={() => {
          setSelectedAlojamiento(newAlojamiento());
          setModalState(ModalState.VISIBLE);
        }}
      >
        Nuevo Alojamiento
      </button>

      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Precio</th>
            <th>Longitud</th>
            <th>Latitud</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {viewData.alojamientos.map((record) => {
            return (
              <tr key={record.id}>
                <th>{record.titulo}</th>
                <th>{record.precio_por_noche}</th>
                <th>{record.longitud}</th>
                <th>{record.latitud}</th>
                <th>
                  <button
                    className="modify-btn"
                    data-key={record.id}
                    onClick={handleOpenModal}
                  >
                    Modificar
                  </button>
                  <button
                    className="delete-btn"
                    data-key={record.id}
                    onClick={handleDelete}
                  >
                    Eliminar
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>

      {modalState === ModalState.VISIBLE && selectedAlojamiento && (
        <AlojamientoDialog
          data={selectedAlojamiento}
          onSave={handleSubmit}
          onClose={handleCloseModal}
        />
      )}

      <Pagination
        totalPages={viewData.totalPages}
        currentPage={viewData.currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default RAlojamientos;
