import './PetDetailsModal.css';
import React, {useState} from 'react';
import { LostPet } from './MainContent';

interface PetDetailsModalProps {
    pet: LostPet | null;
    onClose: () => void;
}

const PetDetailsModal: React.FC<PetDetailsModalProps> = ({ pet, onClose }) => {
    const [imageIndex, setImageIndex] = useState(0);
    if (!pet) return null;
    const handleLeft=()=>{
        setImageIndex((imageIndex - 1 + pet.images.length)%pet.images.length);
    };
    const handleRight=()=>{
        setImageIndex((imageIndex+1)%pet.images.length);
    };
    const datum = pet.dateTimeMissing.substring(0, 10);
    const vrijeme=pet.dateTimeMissing.substring(11, pet.dateTimeMissing.length);

    return (
        <div className="modal-background" >
            <div className="modal-content">
                <img src={pet.images[imageIndex].image} alt={pet.petName} />
                <div>
                    <button onClick={handleLeft}><i className="bi bi-chevron-left"></i></button>
                    <button onClick={handleRight}><i className="bi bi-chevron-right"></i></button>

                </div>
                <h3>{pet.petName}</h3>
                <p>Species: {pet.speciesName}</p>
                <p>Has colors : {pet.colors.map(boja=>boja+" ")}</p>
                <p>Date Lost: {datum} at {vrijeme}</p>
                <p>Age : {pet.petAge}</p>
                <p>Description: {pet.description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PetDetailsModal;
