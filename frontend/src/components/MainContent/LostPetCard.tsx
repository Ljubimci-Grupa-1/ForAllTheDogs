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
            <img src={pet.imageUrl} alt={pet.name} />
            <h3>{pet.name}</h3>
            <p>Species: {pet.species}</p>
            <p>Date Lost: {pet.dateLost}</p>
            <p>Description: {pet.description}</p>
            <button onClick={onDetailsClick}>View Details</button>
        </div>
    );
};

export default LostPetCard;