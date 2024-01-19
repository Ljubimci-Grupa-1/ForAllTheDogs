import './PetDetailsModal.css';
import React, {useState} from 'react';
import { LostPet } from './MainContent';
import UserDetails from "./UserDetails.tsx";
import MessageBoardModal from "./MessageBoardModal";
import {adUser} from "./AddNewModal";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import {ButtonGroup} from "@mui/joy";
import {Icon} from "leaflet";

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
        setUserDetailsVisibility(!userDetailsVisibility)
    };

    const modalContentClass = `modal-content${messageBoardVisibility ? ' shifted' : ''}`;

    const customIcon = new Icon({
        iconUrl: "https://cdn0.iconfinder.com/data/icons/creatype-pet-shop-outline/64/1_pin_gps_paw_pet_animal_map-512.png",
        iconSize: [50, 50],
        iconAnchor: [12.5, 12.5],
        popupAnchor: [0, 0]
    });


    return (
        <div className="modal-background" >
            <div className={modalContentClass}>
                <Card className="cardContainer" sx={{mx: 'auto', mb: 2 }}>
                    <CardContent>
                        <ButtonGroup spacing={0.5} aria-label="spacing button group" sx={{ mb: 2 }}>
                            <Button onClick={handleShowUserDetails}>
                                <i className="bi bi-person-plus-fill"></i>
                            </Button>
                            {userDetailsVisibility && <UserDetails user={pet.user} />}
                            <Button onClick={() => setMessageBoardVisibility(true)}>Open Message Board</Button>
                        </ButtonGroup>

                        {messageBoardVisibility && (
                            <MessageBoardModal onClose={() => setMessageBoardVisibility(false)} adId={pet.adId} currUser={currUser} />
                        )}

                        <img src={// @ts-ignore
                            pet.images[imageIndex].image} alt={pet.petName} style={{ width: '100%', maxWidth: '100%',borderRadius: '10px'}} />

                        <div>
                            <Button onClick={handleLeft}>
                                <i className="bi bi-chevron-left"></i>
                            </Button>
                            <Button onClick={handleRight}>
                                <i className="bi bi-chevron-right"></i>
                            </Button>
                        </div>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth:'300px',
                                maxWidth:'100%'
                            }}
                        >
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography level="h3">{pet.petName}</Typography>
                                    <Typography>
                                        <span style={{ fontWeight: 'bold' }}>Species:</span> {pet.speciesName}
                                    </Typography>
                                    <Typography>
                                        <span style={{ fontWeight: 'bold' }}>Has colors:</span> {pet.colors.map((boja) => boja + ' ')}
                                    </Typography>
                                    <Typography>
                                        <span style={{ fontWeight: 'bold' }}>Date Lost:</span> {datum} at {vrijeme}
                                    </Typography>
                                    <Typography>
                                        <span style={{ fontWeight: 'bold' }}>Age:</span> {pet.age}
                                    </Typography>
                                    <Typography className="description">
                                        <span style={{ fontWeight: 'bold' }}>Description:</span> {pet.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>

                        <MapContainer
                            center={[pet.location.latitude, pet.location.longitude]}
                            zoom={13}
                            // @ts-ignore
                            style={{ height: '300px', width: '100%', marginTop: '16px', mb: 2 }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[pet.location.latitude, pet.location.longitude]} icon={customIcon}>
                                <Popup>{pet.location.cityName}, {pet.location.countyName}</Popup>
                            </Marker>
                        </MapContainer>

                        <Button onClick={onClose} sx={{ marginTop: '16px' }}>
                            Close
                        </Button>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export default PetDetailsModal;
