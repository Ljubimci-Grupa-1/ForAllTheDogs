import React, { useState, useEffect } from 'react';
import './MainContent.css';
import PetDetailsModal from './PetDetailsModal';
import LostPetCard from './LostPetCard';
import FilterBar from "./Bars/FilterBar.tsx";
import NavigationBar from "./Bars/NavigationBar.tsx";
import {locationData} from "./AddNewModal.tsx";

export interface LostPet {
    adId:number;
    activityName:string;
    petId: number;
    petName: string;
    petAge:number;
    speciesName: string;
    dateTimeMissing: string;
    colors:string[];
    images: string[];
    description: string;
    location:locationData;
    // Other properties related to a lost pet
}
interface PetData {
    pet: LostPet;
    // Other properties from the API response
}
interface MainContentProps {
    isLoggedIn:boolean;
}
const MainContent: React.FC<MainContentProps> = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPet, setCurrentPet] = useState<LostPet | null>(null);
    const [filterName, setFilterName] = useState('');
    const [filterSpecies, setFilterSpecies] = useState('');
    const [filterDateLost, setFilterDateLost] = useState('');
    const [lostPets, setLostPets] = useState<LostPet[]>([]);
    const [lostPetsInactive, setLostPetsInactive] = useState<LostPet[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        document.title = "For All The Dogs";
        fetch('http://localhost:8080/ad/all')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                const petsData: LostPet[] = data.map((item: PetData) => {
                    const pet: LostPet = item.pet;
                    // Assuming images is available in your data, replace 'images' with the actual property name
                    const images = item.images; // Replace 'images' with the actual property name
                    return { ...pet, images };
                });
                for (let i = 0; i < petsData.length; i++) {
                    if (data[i] && data[i].adId !== undefined) {
                        petsData[i].adId = data[i].adId;
                        petsData[i].activityName = data[i].activityName;
                    }
                }
                const separatedArrays = petsData.reduce(
                    (result, currentObject) => {
                        if (currentObject.activityName === 'Za ljubimcem se traga') {
                            result.activeAds.push(currentObject);
                        } else {
                            result.inactiveAds.push(currentObject);
                        }
                        return result;
                    },
                    { activeAds: [], inactiveAds: [] }
                );

                const activeAds = separatedArrays.activeAds;
                const inactiveAds = separatedArrays.inactiveAds;

                console.log('activeAds', activeAds);
                console.log('inactiveAds', inactiveAds);
                console.log(petsData);
                setLostPets(activeAds);
                setLostPetsInactive(inactiveAds);
            })
            .catch((error) => {
                console.error('Error fetching lost pets:', error);
            });
    }, []);

    const handleModalClose = () => {
        setModalOpen(false);
        setCurrentPet(null);
    };

    const filteredPets = lostPets ? lostPets.filter((pet) => {
        const nameMatch = pet.petName.toLowerCase().includes(filterName.toLowerCase());
        const speciesMatch = pet.speciesName.toLowerCase().includes(filterSpecies.toLowerCase());
        const dateLostMatch = pet.dateTimeMissing.includes(filterDateLost);

        return nameMatch && speciesMatch && dateLostMatch;
    }) : [];

    const filteredPetsInactive = lostPetsInactive ? lostPetsInactive.filter((pet) => {
        const nameMatch = pet.petName.toLowerCase().includes(filterName.toLowerCase());
        const speciesMatch = pet.speciesName.toLowerCase().includes(filterSpecies.toLowerCase());
        const dateLostMatch = pet.dateTimeMissing.includes(filterDateLost);

        return nameMatch && speciesMatch && dateLostMatch;
    }) : [];

    const handleNameChange = (name: string) => {
        setFilterName(name);
    };

    const handleSpeciesChange = (species: string) => {
        setFilterSpecies(species);
    };

    const handleDateLostChange = (dateLost: string) => {
        setFilterDateLost(dateLost);
    };

    const handleApplyFilters = () => {
        // API call ovdje
    };

    const handleClearFilters = () => {
        setFilterName('');
        setFilterSpecies('');
        setFilterDateLost('');
    };
    const handleLoggedIn=()=>{
        setIsLoggedIn(true);
    };
    const handleLoggedOut=()=>{
        setIsLoggedIn(false);
    };
    return (
        <main className="main">
            <p>Welcome to For All The Dogs, a platform to help find lost pets...</p>

            <NavigationBar handleLoggedIn={handleLoggedIn} handleLoggedOut={handleLoggedOut}/>

            <FilterBar
                onNameChange={handleNameChange}
                onSpeciesChange={handleSpeciesChange}
                onDateLostChange={handleDateLostChange}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
            />

            <div className="lost-pets-list" >
                {filteredPets.map((pet) => (
                    <LostPetCard
                        key={pet.petId}
                        pet={pet}
                        isLoggedIn={isLoggedIn}
                        onDetailsClick={() => {
                            setCurrentPet(pet);
                            setModalOpen(true);
                        }}
                    />
                ))}
                {isLoggedIn&&filteredPetsInactive.map((pet) => (
                    <LostPetCard
                        key={pet.petId}
                        pet={pet}
                        isLoggedIn={isLoggedIn}
                        onDetailsClick={() => {
                            setCurrentPet(pet);
                            setModalOpen(true);
                        }}
                    />
                ))}
            </div>
            {isModalOpen && (
                <PetDetailsModal
                    pet={currentPet}
                    onClose={handleModalClose}
                />
            )}
        </main>
    );
};
export default MainContent;
