import './PetDetailsModal.css';
import React from 'react';
import { LostPet } from './MainContent';

interface PetDetailsModalProps {
    pet: LostPet | null;
    onClose: () => void;
}

const PetDetailsModal: React.FC<PetDetailsModalProps> = ({ pet, onClose }) => {
    if (!pet) return null;

    return (
        <div className="modal-background">
            <div className="modal-content">
                <img src={pet.imageUrl} alt={pet.petName} />
                <h3>{pet.petName}</h3>
                <p>Species: {pet.speciesName}</p>
                <p>Date Lost: {pet.dateTimeMissing}</p>
                <p>Description: {pet.description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PetDetailsModal;
