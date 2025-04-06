import React from "react";

interface MapProps {
  lat: number;
  lng: number;
}

const SimpleMap: React.FC<MapProps> = ({ lat, lng }) => {
  const createIframeSrc = () => {
    const bbox = `${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&marker=${lat},${lng}&layer=mapnik`;
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <iframe
        title="Mapa de ubicación"
        width="100%"
        height="400"
        src={createIframeSrc()}
        style={{ border: "1px solid #ccc", borderRadius: "8px" }}
      />
      <small style={{ display: "block", textAlign: "right" }}>
        <a href="https://www.openstreetmap.org/#map=14/${lat}/${lng}">
          Ver mapa más grande
        </a>
      </small>
    </div>
  );
};

export default SimpleMap;
