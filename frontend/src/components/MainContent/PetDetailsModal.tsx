import './PetDetailsModal.css';
import React, {useState} from 'react';
import { LostPet } from './MainContent';
import UserDetails from "./UserDetails.tsx";
import MessageBoardModal from "./MessageBoardModal";
import {adUser} from "./AddNewModal";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

interface PetDetailsModalProps {
    pet: LostPet | null;
    onClose: () => void;
    currUser:adUser;
}

const PetDetailsModal: React.FC<PetDetailsModalProps> = ({ pet, onClose, currUser }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [userDetailsVisibility, setUserDetailsVisibility] = useState(false);
    const [messageBoardVisibility, setMessageBoardVisibility] = useState(false);
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
    const handleOpenMessageBoard = () => {
        setMessageBoardVisibility(true);
    };

    const modalContentClass = `modal-content${messageBoardVisibility ? ' shifted' : ''}`;

    return (
        <div className="modal-background" >
            <div className={modalContentClass}>
                <button onClick={handleShowUserDetails}><i className="bi bi-person-plus-fill"></i></button>
                {userDetailsVisibility&&<UserDetails user={pet.user}></UserDetails>}
                <button onClick={handleOpenMessageBoard}>Open Message Board</button>
                {messageBoardVisibility && <MessageBoardModal onClose={() => setMessageBoardVisibility(false)} adId={pet.adId} currUser={currUser}/>}
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
                <div>
                    <MapContainer
                        center={[pet.location.latitude, pet.location.longitude]}
                        zoom={13}
                        style={{ height: "300px", width: "100%" }}                    >
                        {/* Add a TileLayer for the map */}
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {/* Add a Marker for the pet's location */}
                        <Marker position={[pet.location.latitude, pet.location.longitude]}>
                            {/* Add a Popup with location details */}
                            <Popup>
                                {pet.location.cityName}, {pet.location.countyName}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PetDetailsModal;
