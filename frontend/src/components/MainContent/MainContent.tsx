import { useState, useEffect } from 'react';
import './MainContent.css';
import PetDetailsModal from './PetDetailsModal';
import LostPetCard from './LostPetCard';
import FilterBar from "./Bars/FilterBar.tsx";
import NavigationBar from "./Bars/NavigationBar.tsx";
import {adUser, locationData} from "./AddNewModal.tsx";

export interface LostPet {
    adId:number;
    activityName:string;
    petId: number;
    petName: string;
    age:number;
    speciesName: string;
    dateTimeMissing: string;
    colors:string[];
    images: string[];
    description: string;
    location:locationData;
    user:adUser;
    // Other properties related to a lost pet
}
interface PetData {
    pet: LostPet;
    // Other properties from the API response
}
interface MainContentProps{
    handleLoggedInAppC:()=>void;
    handleLoggedOutAppC:()=>void;
}

const MainContent= ({handleLoggedInAppC, handleLoggedOutAppC}:MainContentProps) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPet, setCurrentPet] = useState<LostPet | null>(null);
    const [filterName, setFilterName] = useState('');
    const [filterSpecies, setFilterSpecies] = useState('');
    const [filterDateLost, setFilterDateLost] = useState('');
    const [lostPets, setLostPets] = useState<LostPet[]>([]);
    const [lostPetsUserProfile, setLostPetsUserProfile] = useState<LostPet[]>([]);
    const [lostPetsInactive, setLostPetsInactive] = useState<LostPet[]>([]);
    const [lostPetsInactiveUserProfile, setLostPetsInactiveUserProfile] = useState<LostPet[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<adUser>({
        email:"", name:"", telephoneNumber:""
    });
    //const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [menuState, setMenuState] = useState<{ [key: string]: boolean }>({}); // Menu state dictionary
    const [go, setGo] = useState(true);
    useEffect(() => {
        document.title = "For All The Dogs";
        fetch('http://localhost:8080/ad/all')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                const petsData: LostPet[] = data.map((item: PetData) => {
                    const pet: LostPet = item.pet;
                    // Assuming images is available in your data, replace 'images' with the actual property name
                    const images = item.images; // Replace 'images' with the actual property name
                    return { ...pet, images };
                });
                for (let i = 0; i < petsData.length; i++) {
                    if (data[i] && data[i].adId !== undefined) {
                        petsData[i].adId = data[i].adId;
                        petsData[i].activityName = data[i].activityName;
                        petsData[i].user=data[i].user
                    }
                }
                console.log("SAD USER", currentUser.email)
                const filtrirani:LostPet[]=[];
                for (let i = 0; i < petsData.length; i++) {
                    if (petsData[i].user.email===currentUser.email) {
                        console.log("j")
                        filtrirani.push(petsData[i]);
                    }
                }
                const separatedArrays = petsData.reduce<{
                    activeAds: LostPet[];
                    inactiveAds: LostPet[];
                }>(
                    (result, currentObject) => {
                        if (currentObject.activityName === 'Za ljubimcem se traga') {
                            result.activeAds.push(currentObject);
                        } else {
                            result.inactiveAds.push(currentObject);
                        }
                        return result;
                    },
                    { activeAds: [], inactiveAds: [] }
                );

                const activeAds = separatedArrays.activeAds;
                const inactiveAds = separatedArrays.inactiveAds;
                console.log("FILTER", filtrirani)

                const separatedArraysUserProfile = filtrirani.reduce<{
                    activeAdsUserProfile: LostPet[];
                    inactiveAdsUserProfile: LostPet[];
                }>(
                    (result, currentObject) => {
                        if (currentObject.activityName === 'Za ljubimcem se traga') {
                            result.activeAdsUserProfile.push(currentObject);
                        } else {
                            result.inactiveAdsUserProfile.push(currentObject);
                        }
                        return result;
                    },
                    { activeAdsUserProfile: [], inactiveAdsUserProfile: [] }
                );

                const activeAdsUserProfile = separatedArraysUserProfile.activeAdsUserProfile;
                const inactiveAdsUserProfile = separatedArraysUserProfile.inactiveAdsUserProfile;

                console.log(filteredPetsUserProfile);
                console.log("wtf se dogada", activeAdsUserProfile);
                console.log(inactiveAdsUserProfile);
                console.log(activeAds)
                setLostPetsUserProfile(activeAdsUserProfile);
                setLostPetsInactiveUserProfile(inactiveAdsUserProfile);
                setLostPets(activeAds);
                setLostPetsInactive(inactiveAds);
            })
            .catch((error) => {
                console.error('Error fetching lost pets:', error);
            });
    }, [currentUser]);

    useEffect(() => {
        // ... (existing code)

        // Initialize menu state for each card
        const initialMenuState: { [key: string]: boolean } = {};
        lostPets.forEach((pet) => {
            initialMenuState[pet.petId.toString()] = false;
        });
        setMenuState(initialMenuState);
    }, [lostPets]);

    const handleMainContentStateChange = () => {
        setGo(false);
    };

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

    const filteredPetsInactive = lostPetsInactive ? lostPetsInactive.filter((pet) => {
        const nameMatch = pet.petName.toLowerCase().includes(filterName.toLowerCase());
        const speciesMatch = pet.speciesName.toLowerCase().includes(filterSpecies.toLowerCase());
        const dateLostMatch = pet.dateTimeMissing.includes(filterDateLost);

        return nameMatch && speciesMatch && dateLostMatch;
    }) : [];

    const filteredPetsUserProfile = lostPetsUserProfile ? lostPetsUserProfile.filter((pet) => {
        const nameMatch = pet.petName.toLowerCase().includes(filterName.toLowerCase());
        const speciesMatch = pet.speciesName.toLowerCase().includes(filterSpecies.toLowerCase());
        const dateLostMatch = pet.dateTimeMissing.includes(filterDateLost);

        return nameMatch && speciesMatch && dateLostMatch;
    }) : [];
    const filteredPetsInactiveUserProfile = lostPetsInactiveUserProfile ? lostPetsInactiveUserProfile.filter((pet) => {
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
    const handleLoggedIn=(user:adUser)=>{
        setIsLoggedIn(true);
        handleLoggedInAppC();
        setCurrentUser(user);
    };
    const handleLoggedOut=()=>{
        setIsLoggedIn(false);
        handleLoggedOutAppC();
        setModalOpen(false);

        setCurrentUser({
            email:"", name:"", telephoneNumber:""
        });
        setMenuState({}); // Clear menu state when logging out
    };
    const handleMenuToggle = (cardId: string) => {
        setMenuState((prevMenuState) => ({
            ...prevMenuState,
            [cardId]: !prevMenuState[cardId],
        }));
    };

    return (
        <main className="main">
            <p>Welcome to For All The Dogs, a platform to help find lost pets...</p>

            <NavigationBar handleLoggedIn={handleLoggedIn} handleLoggedOut={handleLoggedOut} setMainContentState={handleMainContentStateChange}/>

            <FilterBar
                onNameChange={handleNameChange}
                onSpeciesChange={handleSpeciesChange}
                onDateLostChange={handleDateLostChange}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
            />
            {go&&<div className="lost-pets-list" >
                {filteredPets.map((pet) => (
                    <LostPetCard
                        klasa={"lost-pet-card"}
                        currUser={currentUser}
                        key={pet.petId}
                        pet={pet}
                        isLoggedIn={isLoggedIn}
                        onDetailsClick={() => {
                            setCurrentPet(pet);
                            setModalOpen(true);
                        }}

                        cardId={pet.petId.toString()} // Use petId as the card identifier
                        menuState={menuState}
                        onMenuToggle={handleMenuToggle}
                    />
                ))}
                {isLoggedIn&&filteredPetsInactive.map((pet) => (
                    <LostPetCard
                        klasa={"lost-pet-card-inactive"}
                        currUser={currentUser}
                        key={pet.petId}
                        pet={pet}
                        isLoggedIn={isLoggedIn}
                        onDetailsClick={() => {
                            setCurrentPet(pet);
                            setModalOpen(true);
                        }}

                        cardId={pet.petId.toString()} // Use petId as the card identifier
                        menuState={menuState}
                        onMenuToggle={handleMenuToggle}
                    />
                ))}
            </div>}
            {
                !go&&<div className="lost-pets-list" >
                    {filteredPetsUserProfile.map((pet) => (
                        <LostPetCard
                            klasa={"lost-pet-card"}
                            currUser={currentUser}
                            key={pet.petId}
                            pet={pet}
                            isLoggedIn={isLoggedIn}
                            onDetailsClick={() => {
                                setCurrentPet(pet);
                                setModalOpen(true);
                            }}

                            cardId={pet.petId.toString()} // Use petId as the card identifier
                            menuState={menuState}
                            onMenuToggle={handleMenuToggle}
                        />
                    ))}
                    {isLoggedIn&&filteredPetsInactiveUserProfile.map((pet) => (
                        <LostPetCard
                            klasa={"lost-pet-card-inactive"}
                            currUser={currentUser}
                            key={pet.petId}
                            pet={pet}
                            isLoggedIn={isLoggedIn}
                            onDetailsClick={() => {
                                setCurrentPet(pet);
                                setModalOpen(true);
                            }}

                            cardId={pet.petId.toString()} // Use petId as the card identifier
                            menuState={menuState}
                            onMenuToggle={handleMenuToggle}
                        />
                    ))}
                </div>
            }
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
