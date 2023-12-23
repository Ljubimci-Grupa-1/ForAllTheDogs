import React, { useState, useEffect } from 'react';
import './MainContent.css';
import PetDetailsModal from './PetDetailsModal';
import LostPetCard from './LostPetCard';
import FilterBar from "./Bars/FilterBar.tsx";
import NavigationBar from "./Bars/NavigationBar.tsx";

interface LostPet {
    petId: number;
    petName: string;
    speciesName: string;
    dateTimeMissing: string;
    images: string[];
    description: string;
    // Other properties related to a lost pet
}
interface PetData {
    pet: LostPet;
    // Other properties from the API response
}
interface MainContentProps {}
const MainContent: React.FC<MainContentProps> = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPet, setCurrentPet] = useState<LostPet | null>(null);
    const [filterName, setFilterName] = useState('');
    const [filterSpecies, setFilterSpecies] = useState('');
    const [filterDateLost, setFilterDateLost] = useState('');
    const [lostPets, setLostPets] = useState<LostPet[]>([]);

    useEffect(() => {
        document.title = "For All The Dogs";
        fetch('http://localhost:8080/ad/all')
            .then((response) => response.json())
            .then((data) => {
                const petsData: LostPet[] = data.map((item: PetData) => {
                    const pet: LostPet = item.pet;
                    // Assuming images is available in your data, replace 'images' with the actual property name
                    const images = item.images; // Replace 'images' with the actual property name
                    return { ...pet, images };
                });
                setLostPets(petsData);
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

    return (
        <main className="main">
            <p>Welcome to For All The Dogs, a platform to help find lost pets...</p>

            <NavigationBar />

            <FilterBar
                onNameChange={handleNameChange}
                onSpeciesChange={handleSpeciesChange}
                onDateLostChange={handleDateLostChange}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
            />

            <div className="lost-pets-list">
                {filteredPets.map((pet) => (
                    <LostPetCard
                        key={pet.petId}
                        pet={pet}
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
export { LostPet };
export default MainContent;
