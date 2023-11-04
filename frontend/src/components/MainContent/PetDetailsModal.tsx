// PetDetailsModal.tsx

import React from 'react';
import { LostPet } from './MainContent'; // Ensure this path is correct

interface PetDetailsModalProps {
    pet: LostPet | null;
    onClose: () => void;
}

const PetDetailsModal: React.FC<PetDetailsModalProps> = ({ pet, onClose }) => {
    if (!pet) return null;

    return (
        <div className="modal-background">
            <div className="modal-content">
                <img src={pet.imageUrl} alt={pet.name} />
                <h3>{pet.name}</h3>
                <p>Species: {pet.species}</p>
                <p>Date Lost: {pet.dateLost}</p>
                <p>Description: {pet.description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PetDetailsModal;
