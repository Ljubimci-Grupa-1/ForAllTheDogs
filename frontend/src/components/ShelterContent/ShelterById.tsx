// ShelterById.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Shelter {
    userId: number;
    name: string;
    email: string;
    // Add other shelter properties as needed
}

interface Ad {
    adId: number;
    userId: number;
    // Add other ad properties as needed
}

interface ShelterByIdProps {
    // Add any other props you need
}

const ShelterById: React.FC<ShelterByIdProps> = () => {
    const { id } = useParams(); // Get the id from the URL params
    const [shelterData, setShelterData] = useState<Shelter | null>(null);
    const [ads, setAds] = useState<Ad[]>([]);

    useEffect(() => {
        const fetchShelters = async () => {
            try {
                const responseShelter = await fetch(`http://localhost:8080/user/shelter/all`);
                const dataShelter = await responseShelter.json();

                // Find the shelter with the specific id
                const specificShelter = dataShelter.find((shelter: Shelter) => shelter.userId === parseInt(id, 10));

                // Set the shelter data
                setShelterData(specificShelter);

                if (specificShelter) {
                    // Fetch ads based on userId
                    const responseAds = await fetch(`http://localhost:8080/ad/all`);
                    const dataAds = await responseAds.json();

                    // Set the ads data
                    setAds(dataAds);
                }
            } catch (error) {
                console.error('Error fetching shelters and ads:', error);
            }
        };

        fetchShelters();
    }, [id]);

    return (
        <div>
            <h2>Shelter by ID: {id}</h2>
            {shelterData ? (
                <div>
                    <p>Name: {shelterData.name}</p>
                    <p>Email: {shelterData.email}</p>
                    {/* Add other shelter details as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}

            <h3>Ads from this shelter:</h3>
            <ul>
                {ads
                    .filter((ad) => ad.userId === shelterData?.userId)
                    .map((ad) => (
                        <li key={ad.adId}>
                            {/* Display ad details here */}
                            <p>Ad ID: {ad.adId}</p>
                            {/* Add other ad details as needed */}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default ShelterById;
