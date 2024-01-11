import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SheltersComponent.css';
import NavigationBar from '../MainContent/Bars/NavigationBar';

interface ShelterComponentProps {
    handleLoggedIn: () => void;
    handleLoggedOut: () => void;
    setMainContentState: (state: boolean) => void;
    mainContentState: boolean; // You should replace 'string' with the actual type of mainContentState
}

const ShelterComponent: React.FC<ShelterComponentProps> = ({
                                                               handleLoggedIn,
                                                               handleLoggedOut,
                                                               setMainContentState,
                                                               mainContentState
                                                           }) => {
    const [shelters, setShelters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/user/shelter/all');
                const data = await response.json();
                console.log(data); // Log shelter objects
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
                setMainContentState={setMainContentState}
                mainContentState={mainContentState}
            />
            <h2>Shelter Usernames</h2>
            <div className="shelter-container">
                {shelters.map((shelter) => (
                    <Link to={`/shelters/${shelter.userId}`} key={shelter.userId}>
                        <div className="shelterUser-container">{shelter.username}</div>
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default ShelterComponent;
