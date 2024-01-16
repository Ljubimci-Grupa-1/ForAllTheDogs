import React, { useEffect, useState } from 'react';
import './SheltersComponent.css';
import NavigationBar from '../MainContent/Bars/NavigationBar';
import {useNavigate} from 'react-router-dom';

interface ShelterComponentProps {
    handleLoggedIn: () => void;
    handleLoggedOut: () => void;
    setMainContentState: (state: boolean) => void;
    mainContentState: boolean; // You should replace 'string' with the actual type of mainContentState
}

interface Shelter{
    userId:number;
    username:string;

}

const ShelterComponent: React.FC<ShelterComponentProps> = ({
                                                               handleLoggedIn,
                                                               handleLoggedOut,
                                                               setMainContentState,
                                                               mainContentState
                                                           }) => {
    const [shelters, setShelters] = useState([]);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

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

    const handleShelterClick = (shelterId: number) => {
        // Use navigate function to navigate and pass state
        navigate('/', { state: { shelterId: shelterId } });
    };



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
                {shelters.map((shelter: Shelter) => (
                    <div
                        onClick={() => handleShelterClick(shelter.userId)}
                        key={shelter.userId}
                        className="shelterUser-container">
                        {shelter.username}
                    </div>
                ))}

            </div>
        </main>
    );
};

export default ShelterComponent;
