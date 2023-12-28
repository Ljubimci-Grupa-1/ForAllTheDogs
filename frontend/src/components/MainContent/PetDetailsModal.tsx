import './PetDetailsModal.css';
import React, {useState} from 'react';
import { LostPet } from './MainContent';
import UserDetails from "./UserDetails.tsx";

interface PetDetailsModalProps {
    pet: LostPet | null;
    onClose: () => void;
}

const PetDetailsModal: React.FC<PetDetailsModalProps> = ({ pet, onClose }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [userDetailsVisibility, setUserDetailsVisibility] = useState(false)
    if (!pet) return null;
    const handleLeft=()=>{
        setImageIndex((imageIndex - 1 + pet.images.length)%pet.images.length);
    };
    const handleRight=()=>{
        setImageIndex((imageIndex+1)%pet.images.length);
    };
    const datum = pet.dateTimeMissing.substring(0, 10);
    const vrijeme=pet.dateTimeMissing.substring(11, pet.dateTimeMissing.length);
    const handleShowUserDetails=()=>{
        setUserDetailsVisibility(true)
    };

    return (
        <div className="modal-background" >
            <div className="modal-content">
                <button onClick={handleShowUserDetails}><i className="bi bi-person-plus-fill"></i></button>
                {userDetailsVisibility&&<UserDetails user={pet.user}></UserDetails>}
                <img src={pet.images[imageIndex].image} alt={pet.petName} />
                <div>
                    <button onClick={handleLeft}><i className="bi bi-chevron-left"></i></button>
                    <button onClick={handleRight}><i className="bi bi-chevron-right"></i></button>

                </div>
                <h3>{pet.petName}</h3>
                <p>Species: {pet.speciesName}</p>
                <p>Has colors : {pet.colors.map(boja=>boja+" ")}</p>
                <p>Date Lost: {datum} at {vrijeme}</p>
                <p>Age : {pet.age}</p>
                <p>Description: {pet.description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PetDetailsModal;
