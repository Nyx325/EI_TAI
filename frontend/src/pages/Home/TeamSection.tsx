import React from "react";
import "./TeamSection.css";

const teamMembers = [
  {
    name: "Janis",
    role: "Cofundador",
    img: "/images/janis.jpg",
  },
  {
    name: "Les",
    role: "Cofundador",
    img: "/images/les.jpg",
  },
  {
    name: "Ane",
    role: "Cofundador",
    img: "/images/ane.jpg",
  },

  {
    name: "Maricarmen",
    role: "Project Manager",
    img: "/images/maricarmen.jpg",
  },
  {
    name: "Gabino",
    role: "Chalán",
    img: "/images/gabino.jpg",
  },
  {
    name: "Omar",
    role: "Lienciado CISCO",
    img: "/images/omar.jpg",
  },
];

const TeamSection: React.FC = () => {
  return (
    <section className="team-section">
      <h2>Nosotros</h2>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.img} alt={`Foto de ${member.name}`} />
            <p className="name">{member.name}</p>
            <p className="role">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
