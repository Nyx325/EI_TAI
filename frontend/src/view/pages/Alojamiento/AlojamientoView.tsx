import React, { useEffect, useState } from "react";
import alojamientoHttpController from "../../../controller/alojamiento.controller";
import { Alojamiento } from "../../../models/entities/alojamiento";
import { useAppContext } from "../../AppContext";
import "./AlojamientoView.css";
import MyMapComponent from "./MyMapComponent";

const AlojamientoView: React.FC = () => {
  const { appState } = useAppContext();
  const [alojamiento, setAlojamiento] = useState<Alojamiento | undefined>(
    undefined,
  );

  useEffect(() => {
    const searchAlojamiento = async () => {
      if (!appState.selectedAlojamiento) return;

      const alojamientoResult = await alojamientoHttpController.get(
        appState.selectedAlojamiento,
      );
      if (alojamientoResult.err || alojamientoResult.val === null)
        throw Error("Error al obtener alojamiento");

      setAlojamiento(alojamientoResult.val);
    };

    searchAlojamiento();
  }, [appState.selectedAlojamiento]);

  if (!alojamiento) return <p>Cargando...</p>;

  return (
    <article className="alojamiento-detail">
      <header className="alojamiento-header">
        <h1 className="alojamiento-title">{alojamiento.titulo}</h1>
        <span className="alojamiento-price">
          ${alojamiento.precio_por_noche} / noche
        </span>
      </header>

      <section className="alojamiento-description">
        <p>{alojamiento.descripcion}</p>
      </section>

      <section className="alojamiento-amenities">
        <h2>Características</h2>
        <ul>
          {alojamiento.banios > 0 && <li>🚽 {alojamiento.banios} Baño(s)</li>}
          {alojamiento.alberca && <li>🏊 Alberca</li>}
          {alojamiento.cocina && <li>🍳 Cocina</li>}
          {alojamiento.wifi && <li>📶 Wifi</li>}
          {alojamiento.television && <li>📺 Televisión</li>}
          {alojamiento.aire_acondicionado && <li>❄️ Aire acondicionado</li>}
        </ul>
      </section>

      <section className="alojamiento-location">
        <h2>Ubicación</h2>
        <MyMapComponent
          lat={alojamiento.latitud}
          lng={alojamiento.longitud}
          key={alojamiento.id}
        />
      </section>
    </article>
  );
};

export default AlojamientoView;
