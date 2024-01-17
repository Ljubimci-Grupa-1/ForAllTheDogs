import React, { useEffect, useState } from 'react';
import './SheltersComponent.css';
import NavigationBar from '../MainContent/Bars/NavigationBar';
import {useNavigate} from 'react-router-dom';

interface ShelterComponentProps {
    handleLoggedIn: () => void;
    handleLoggedOut: () => void;
    setMainContentState: (state: boolean) => void;
    mainContentState: boolean; // You should replace 'string' with the actual type of mainContentState
    handleShelterAdsShow:(state:boolean)=>void;
    shelterAdsShow:boolean;
}

interface Shelter{
    userId:number;
    username:string;
    email:string;
}

const ShelterComponent: React.FC<ShelterComponentProps> = ({
                                                               handleLoggedIn,
                                                               handleLoggedOut,
                                                               setMainContentState,
                                                               mainContentState,
                                                               handleShelterAdsShow,
                                                               shelterAdsShow
                                                           }) => {
    const [shelters, setShelters] = useState([]);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        setMainContentState(true);
        handleShelterAdsShow(false);
        const fetchData = async () => {
            try {
                const response = await fetch('https://forallthedogs.onrender.com/user/shelter/all');
                const data = await response.json();
                console.log(data); // Log shelter objects
                setShelters(data);
            } catch (error) {
                console.error('Error fetching shelters:', error);
            }
        };

        fetchData();
    }, []);

    const handleShelterClick = (shelterId: string) => {
        // Use navigate function to navigate and pass state
        handleShelterAdsShow(true);
        navigate('/', { state: { shelterId: shelterId } });
    };



    return (
        <main className="main">
            <NavigationBar
                handleLoggedIn={handleLoggedIn}
                handleLoggedOut={handleLoggedOut}
                setMainContentState={setMainContentState}
                mainContentState={mainContentState}
                shelterAdsShow={shelterAdsShow}
                handleShelterAdsShow={handleShelterAdsShow}
            />
            <h2>Shelter Usernames</h2>
            <div className="shelter-container">
                {shelters.map((shelter: Shelter) => (
                    <div
                        onClick={() => handleShelterClick(shelter.email)}
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
