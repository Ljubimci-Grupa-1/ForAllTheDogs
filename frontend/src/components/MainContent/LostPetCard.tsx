import React from "react";
import {LostPet} from "./MainContent.tsx";
import "./LostPetCard.css";

interface LostPetCardProps {
    pet: LostPet;
    onDetailsClick: () => void;
}

const LostPetCard: React.FC<LostPetCardProps> = ({ pet, onDetailsClick }) => {
    const datum = pet.dateTimeMissing.substring(0, 10);
    const vrijeme=pet.dateTimeMissing.substring(11, pet.dateTimeMissing.length);
    return (
        <div className="lost-pet-card">
            {pet.images && pet.images[0] && <img src={pet.images[0].image} alt={pet.petName} />}
            <h3>{pet.petName}</h3>
            <p>Species: {pet.speciesName}</p>
            <p>Date Lost: {datum} at {vrijeme}</p>
            <p>Description: {pet.description}</p>
            <button onClick={onDetailsClick}>View Details</button>
        </div>
    );
};

export default LostPetCard;