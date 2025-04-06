import React from "react";
import { Alojamiento } from "../../../models/entities/alojamiento";
import { AppView, useAppContext } from "../../AppContext";
import "./AlojamientoCard.css";

interface Props {
  alojamiento: Alojamiento;
}

const AlojamientoCard: React.FC<Props> = ({ alojamiento }) => {
  const { setAppState } = useAppContext();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const keyStr = (e.currentTarget as HTMLElement).getAttribute("data-key");
    const key = keyStr ? Number(keyStr) : undefined;

    setAppState((prev) => ({
      ...prev,
      selectedAlojamiento: key,
      view: AppView.AlojamientoSelected,
    }));
  };

  return (
    <div
      className="alojamiento-card clickable"
      data-key={alojamiento.id}
      onClick={handleCardClick}
    >
      <div className="card-header">
        <h3 className="descripcion">{alojamiento.titulo}</h3>
        <span className="precio">${alojamiento.precio_por_noche} / noche</span>
      </div>

      <div className="amenidades">
        {<span>🚽 {alojamiento.banios} Baño(s)</span>}
        {alojamiento.cocina && <span>🍳 Cocina</span>}
        {alojamiento.wifi && <span>📶 Wifi</span>}
      </div>
    </div>
  );
};

export default AlojamientoCard;
