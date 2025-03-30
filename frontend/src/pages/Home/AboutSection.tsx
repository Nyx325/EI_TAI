import React from "react";
import "./AboutSection.css";
// Si las imágenes están en public/images, usa la ruta absoluta
// Si están en src/assets, importalas: import alojamientoImg from '../../assets/imagen-alojamiento.jpg';

const AboutSection: React.FC = () => {
  return (
    <section className="about-section">
      <h2>¿Qué es Rêverie?</h2>
      <div className="about-content">
        <div className="text-img">
          <p>
            En Rêverie te ofrecemos alojamientos propios, cuidadosamente
            seleccionados para garantizarte la mejor experiencia de viaje.
            Olvídate de intermediarios y reserva directamente con nosotros para
            disfrutar de servicios personalizados, seguridad y calidad.
          </p>
          <img src="/images/alojamiento1.jpg" alt="Alojamiento" width={10}/>
        </div>
        <div className="img-text">
          <p>
            Nuestra misión es transformar cada viaje en una experiencia inolvidable,
            combinando comodidad, autenticidad y atención al detalle para que encuentre
            un espacio de descanso especial mientras explora nuevos lugares.
          </p>
          <img src="/images/alojamiento2.webp" alt="Experiencia de viaje" height={400}/>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
