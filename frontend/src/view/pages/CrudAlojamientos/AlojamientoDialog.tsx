import React, { useState } from "react";
import { Alojamiento } from "../../../models/entities/alojamiento";
import "./AlojamientoDialog.css";

type AlojamientoDialogProps = {
  data: Alojamiento;
  onSave: (updatedData: Alojamiento) => void;
  onClose: () => void;
};

const AlojamientoDialog: React.FC<AlojamientoDialogProps> = ({
  data,
  onSave,
  onClose,
}) => {
  const [inputData, setInputData] = useState<Alojamiento>(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, type } = e.target;
    let value: string | number | boolean;

    if (e.target instanceof HTMLInputElement && type === "checkbox") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }

    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(inputData);
  };

  return (
    <dialog open className="dialog">
      <form onSubmit={handleSubmit} className="dialog-form">
        <div className="form-row">
          <label className="label">Título:</label>
          <input
            type="text"
            name="titulo"
            className="input"
            value={inputData.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label className="label">Descripción:</label>
          <textarea
            name="descripcion"
            className="input"
            value={inputData.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label className="label">Baños:</label>
          <input
            type="number"
            name="banios"
            className="input"
            value={inputData.banios}
            onChange={handleChange}
          />
        </div>

        <div className="form-row checkbox-row">
          <label className="label">Servicios:</label>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                name="alberca"
                className="checkbox-input"
                checked={inputData.alberca}
                onChange={handleChange}
              />
              <label className="checkbox-label">Alberca</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                name="cocina"
                className="checkbox-input"
                checked={inputData.cocina}
                onChange={handleChange}
              />
              <label className="checkbox-label">Cocina</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                name="wifi"
                className="checkbox-input"
                checked={inputData.wifi}
                onChange={handleChange}
              />
              <label className="checkbox-label">WiFi</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                name="television"
                className="checkbox-input"
                checked={inputData.television}
                onChange={handleChange}
              />
              <label className="checkbox-label">Televisión</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                name="aire_acondicionado"
                className="checkbox-input"
                checked={inputData.aire_acondicionado}
                onChange={handleChange}
              />
              <label className="checkbox-label">Aire Acondicionado</label>
            </div>
          </div>
        </div>

        <div className="form-row">
          <label className="label">Precio por Noche:</label>
          <input
            type="number"
            name="precio_por_noche"
            className="input"
            value={inputData.precio_por_noche}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label className="label">Latitud:</label>
          <input
            type="text"
            name="latitud"
            className="input"
            value={inputData.latitud}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label className="label">Longitud:</label>
          <input
            type="text"
            name="longitud"
            className="input"
            value={inputData.longitud}
            onChange={handleChange}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn-primary">
            Guardar
          </button>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default AlojamientoDialog;
