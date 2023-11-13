import React, { useState, useEffect } from 'react';
import './MainContent.css';
import PetDetailsModal from './PetDetailsModal';
import LostPetCard from './LostPetCard';
import FilterBar from "./FilterBar.tsx";

export interface LostPet {
    id: number;
    name: string;
    species: string;
    description: string;
    dateLost: string;
    imageUrl: string;
}

interface MainContentProps {
    lostPets: LostPet[];
}

const MainContent: React.FC<MainContentProps> = ({ lostPets = [] }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPet, setCurrentPet] = useState<LostPet | null>(null);
    const [filterName, setFilterName] = useState('');
    const [filterSpecies, setFilterSpecies] = useState('');
    const [filterDateLost, setFilterDateLost] = useState('');

    useEffect(() => {
        document.title = "For All The Dogs";
    }, []);

    const handleModalClose = () => {
        setModalOpen(false);
        setCurrentPet(null);
    };

    const filteredPets = lostPets.filter((pet) => {
        const nameMatch = pet.name.toLowerCase().includes(filterName.toLowerCase());
        const speciesMatch = pet.species.toLowerCase().includes(filterSpecies.toLowerCase());
        const dateLostMatch = pet.dateLost.includes(filterDateLost);

        return nameMatch && speciesMatch && dateLostMatch;
    });


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
        <main>
            <p>Welcome to For All The Dogs, a platform to help find lost pets...</p>

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
                        key={pet.id}
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

export default MainContent;