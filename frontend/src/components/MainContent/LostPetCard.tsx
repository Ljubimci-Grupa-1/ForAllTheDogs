import React from "react";
import {LostPet} from "./MainContent.tsx";
import "./LostPetCard.css";

interface LostPetCardProps {
    pet: LostPet;
    onDetailsClick: () => void;
}

const LostPetCard: React.FC<LostPetCardProps> = ({ pet, onDetailsClick }) => {
    return (
        <div className="lost-pet-card">
            {pet.images && pet.images[0] && <img src={pet.images[0].image} alt={pet.petName} />}
            <h3>{pet.petName}</h3>
            <p>Species: {pet.speciesName}</p>
            <p>Date Lost: {pet.dateTimeMissing}</p>
            <p>Description: {pet.description}</p>
            <button onClick={onDetailsClick}>View Details</button>
        </div>
    );
};

export default LostPetCard;