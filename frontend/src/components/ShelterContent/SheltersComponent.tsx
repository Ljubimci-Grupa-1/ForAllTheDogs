import React, { useEffect, useState } from 'react';
import './SheltersComponent.css';
import NavigationBar from '../MainContent/Bars/NavigationBar';

interface ShelterComponentProps {
    handleLoggedIn: () => void;
    handleLoggedOut: () => void;
    setMainContentState: (state: string) => void;
    mainContentState: string; // You should replace 'string' with the actual type of mainContentState
}

const ShelterComponent: React.FC<ShelterComponentProps> = ({
                                                               handleLoggedIn,
                                                               handleLoggedOut,
                                                           }) => {
    const [shelters, setShelters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/user/shelter/all');
                const data = await response.json();
                setShelters(data);
            } catch (error) {
                console.error('Error fetching shelters:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="main">
            <NavigationBar
                handleLoggedIn={handleLoggedIn}
                handleLoggedOut={handleLoggedOut}
            />
            <h2>Shelter Usernames</h2>
            <ul>
                {shelters.map((shelter) => (
                    <li key={shelter.id}>{shelter.username}</li>
                ))}
            </ul>
        </main>
    );
};

export default ShelterComponent;
