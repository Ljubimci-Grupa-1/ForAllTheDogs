import React, { useState, useEffect } from 'react';
import './MainContent.css';
import PetDetailsModal from './PetDetailsModal';
import LostPetCard from './LostPetCard';

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
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        document.title = "For All The Dogs";
    }, []);

    const handleModalClose = () => {
        setModalOpen(false);
        setCurrentPet(null);
    };

    const filteredPets = lostPets.filter(pet =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main>
            <p>Welcome to For All The Dogs, a platform to help find lost pets...</p>
            <input
                type="text"
                placeholder="Search for pets or shelters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
