import React from 'react';
import './MainContent.css';

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
    return (
        <main>
            <p>Welcome to For All The Dogs, a platform to help find lost pets...</p>
            <input type="text" placeholder="Search for pets or shelters..." />

            <div className="lost-pets-list">
                {lostPets.map((pet) => (
                    <LostPetCard key={pet.id} pet={pet} />
                ))}
            </div>
        </main>
    );
};

interface LostPetCardProps {
    pet: LostPet;
}

const LostPetCard: React.FC<LostPetCardProps> = ({ pet }) => {
    return (
        <div className="lost-pet-card">
            <img src={pet.imageUrl} alt={pet.name} />
            <h3>{pet.name}</h3>
            <p>Species: {pet.species}</p>
            <p>Date Lost: {pet.dateLost}</p>
            <p>Description: {pet.description}</p>
            <button>View Details</button>
        </div>
    );
};

export default MainContent;
