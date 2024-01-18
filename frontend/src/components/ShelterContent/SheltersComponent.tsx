import React, { useEffect, useState } from 'react';
import './SheltersComponent.css';
import NavigationBar from '../MainContent/Bars/NavigationBar';
import {useNavigate} from 'react-router-dom';
import {Typography, Stack, Card} from "@mui/joy";

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

            <Stack
                spacing={2}
                sx={{
                    width: '100%',
                    margin: '0 auto'
                }}
            >
                <Card sx={{ p: 2, borderRadius: 2, boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
                    <Typography level="h1" sx={{ fontSize: '2rem', fontWeight: 'bold', color: '#2196F3', marginBottom: '1rem' }}>
                        All Shelters
                    </Typography>
                    <Card color="primary" className="shelter-container" sx={{ p: 2, borderRadius: 5, boxShadow: '0 0 10px rgba(0,0,0,0.2)'}}>
                        {shelters.map((shelter: Shelter) => (
                            <Typography
                                key={shelter.userId}
                                onClick={() => handleShelterClick(shelter.email)}
                                className="shelterUser-container"
                                level={'h3'}
                            >
                                {shelter.username}
                            </Typography>
                        ))}
                    </Card>
                </Card>
            </Stack>
        </main>
    );
};

export default ShelterComponent;
