import { useState, useEffect } from 'react';
import './MainContent.css';
import PetDetailsModal from './PetDetailsModal';
import LostPetCard from './LostPetCard';
import FilterBar from "./Bars/FilterBar.tsx";
import NavigationBar from "./Bars/NavigationBar.tsx";
import {adUser, locationData} from "./AddNewModal.tsx";

{/*
HELP
1.go-if set to true, all ads are shown, if set to false, only user's ads are shown. 2 buttons (user in circle and left arrow in circle)
next to sign out button toggle the "go" state, user leads user to his own ads and left arrow leads user back to main page.
go needs to be passed to the NavigationBar component because based on the go state, only one button is displayed;
handleMainContentStateChange also needs to be passed because the toggle happens there.

2.handleLoggedInAppC and handleLoggedOutAppC are props because MainComponent's parent component (App) needs to have information about
the login state so it can pass it down to Map component because different ads are shown on map based on the login state.

3.lostPets=all ACTIVE ads, lostPetsUserProfile=all user's ACTIVE ads,
lostPetsInactive=all INACTIVE ads, lostPetsInactiveUserProfile=all user's INACTIVE ads

4.menuState-map with petId as key, representing the current clicked ad and the boolean value representing if it's menu is
currently open (3 dots are clicked, showing 3 possible actions with user's ad).
handleMenuToggle-toggles the menu state of clicked ad, needs to be passed to LostPetCard component

5.areFiltersApplied-represents if filters are applied
*/}
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
}
interface PetData {
    pet: LostPet;
    //images:string[];
}
interface MainContentProps{
    handleLoggedInAppC:()=>void;
    handleLoggedOutAppC:()=>void;
    handleMainContentStateChange:()=>void;
    mainContentState:boolean;
}

const MainContent= ({handleLoggedInAppC, handleLoggedOutAppC, handleMainContentStateChange, mainContentState}:MainContentProps) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPet, setCurrentPet] = useState<LostPet | null>(null);
    const [areFiltersApplied, setAreFiltersApplied] = useState(false);
    const [filterName, setFilterName] = useState('');
    const [filterSpecies, setFilterSpecies] = useState('');
    const [filterDateLost, setFilterDateLost] = useState('');
    const [filterCounty, setFilterCounty] = useState('');
    const [filterCity, setFilterCity] = useState('');
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
    const [categoriesVisibility, setCategoriesVisibility] = useState<{ [key: string]: boolean }>({});
    useEffect(() => {
        document.title = "For All The Dogs";
        fetch('http://localhost:8080/ad/all')
            .then((response) => response.json())
            .then((data) => {
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
                const filtrirani:LostPet[]=[];
                for (let i = 0; i < petsData.length; i++) {
                    if (petsData[i].user.email===currentUser.email) {
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

                setLostPetsUserProfile(activeAdsUserProfile);
                setLostPetsInactiveUserProfile(inactiveAdsUserProfile);
                console.log(activeAds)
                setLostPets(activeAds);
                setLostPetsInactive(inactiveAds);
            })
            .catch((error) => {
                console.error('Error fetching lost pets:', error);
            });
    }, [currentUser]);

    useEffect(() => {

        const initialMenuState: { [key: string]: boolean } = {};
        lostPets.forEach((pet) => {
            initialMenuState[pet.petId.toString()] = false;
        });
        setMenuState(initialMenuState);

        const initialCategoriesVisibility: { [key: string]: boolean } = {};
        lostPets.forEach((pet) => {
            initialCategoriesVisibility[pet.petId.toString()] = false;
        });
        setCategoriesVisibility(initialCategoriesVisibility);
    }, [lostPets]);


    const handleModalClose = () => {
        setModalOpen(false);
        setCurrentPet(null);
    };

    const filteredPets = lostPets ? lostPets.filter((pet) => {
        const nameMatch = pet.petName.toLowerCase().includes(filterName.toLowerCase());
        const speciesMatch = pet.speciesName.toLowerCase().includes(filterSpecies.toLowerCase());
        const dateLostMatch = pet.dateTimeMissing.includes(filterDateLost);
        const countyMatch = pet.location.countyName.includes(filterCounty);
        const cityMatch = pet.location.cityName.includes(filterCity);

        if (areFiltersApplied){
            return nameMatch && speciesMatch && dateLostMatch && countyMatch && cityMatch;
        }
        else{
            return lostPets;
        }
    }) : [];

    const filteredPetsInactive = lostPetsInactive ? lostPetsInactive.filter((pet) => {
        const nameMatch = pet.petName.toLowerCase().includes(filterName.toLowerCase());
        const speciesMatch = pet.speciesName.toLowerCase().includes(filterSpecies.toLowerCase());
        const dateLostMatch = pet.dateTimeMissing.includes(filterDateLost);
        const countyMatch = pet.location.countyName.includes(filterCounty);
        const cityMatch = pet.location.cityName.includes(filterCity);

        if (areFiltersApplied){
            return nameMatch && speciesMatch && dateLostMatch && countyMatch && cityMatch;
        }
        else{
            return lostPetsInactive;
        }
    }) : [];

    const filteredPetsUserProfile = lostPetsUserProfile ? lostPetsUserProfile.filter((pet) => {
        const nameMatch = pet.petName.toLowerCase().includes(filterName.toLowerCase());
        const speciesMatch = pet.speciesName.toLowerCase().includes(filterSpecies.toLowerCase());
        const dateLostMatch = pet.dateTimeMissing.includes(filterDateLost);
        const countyMatch = pet.location.countyName.includes(filterCounty);
        const cityMatch = pet.location.cityName.includes(filterCity);

        if (areFiltersApplied){
            return nameMatch && speciesMatch && dateLostMatch && countyMatch && cityMatch;
        }
        else{
            return lostPetsUserProfile;
        }
    }) : [];

    const filteredPetsInactiveUserProfile = lostPetsInactiveUserProfile ? lostPetsInactiveUserProfile.filter((pet) => {
        const nameMatch = pet.petName.toLowerCase().includes(filterName.toLowerCase());
        const speciesMatch = pet.speciesName.toLowerCase().includes(filterSpecies.toLowerCase());
        const dateLostMatch = pet.dateTimeMissing.includes(filterDateLost);
        const countyMatch = pet.location.countyName.includes(filterCounty);
        const cityMatch = pet.location.cityName.includes(filterCity);

        if (areFiltersApplied){
            return nameMatch && speciesMatch && dateLostMatch && countyMatch && cityMatch;
        }
        else{
            return lostPetsInactiveUserProfile;
        }
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

    const handleCountyChange=(county : string)=>{
        setFilterCounty(county);
    };

    const handleCityChange=(city : string)=>{
        setFilterCity(city);

    };

    const handleApplyFilters = () => {
        // API call ovdje
        setAreFiltersApplied(true);
    };
    const handleClearFilters = () => {
        setFilterName('');
        setFilterSpecies('');
        setFilterDateLost('');
        setFilterCounty('');
        setFilterCity('');
        setAreFiltersApplied(false);
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
        setCategoriesVisibility({});
    };
    const handleMenuToggle = (cardId: string) => {
        setMenuState((prevMenuState) => ({
            ...prevMenuState,
            [cardId]: !prevMenuState[cardId],
        }));
    };

    const handleCategoriesToggle=(cardId:string, state:boolean)=>{
        setCategoriesVisibility((prevCategoriesVisibility) => ({
            ...prevCategoriesVisibility,
            [cardId]: state,
        }));
    };

    return (
        <main className="main">
            <p>Welcome to For All The Dogs, a platform to help find lost pets...</p>

            <NavigationBar handleLoggedIn={handleLoggedIn}
                           handleLoggedOut={handleLoggedOut}
                           setMainContentState={handleMainContentStateChange}
                           mainContentState={mainContentState}
            />

            <FilterBar
                onNameChange={handleNameChange}
                onSpeciesChange={handleSpeciesChange}
                onDateLostChange={handleDateLostChange}
                onCountyChange={handleCountyChange}
                onCityChange={handleCityChange}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
            />
            {mainContentState&&<div className="lost-pets-list" >
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
                        categoriesVisibility={categoriesVisibility}
                        onMenuToggle={handleMenuToggle}
                        onCategoriesToggle={handleCategoriesToggle}
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
                        categoriesVisibility={categoriesVisibility}
                        onMenuToggle={handleMenuToggle}
                        onCategoriesToggle={handleCategoriesToggle}
                    />
                ))}
            </div>}
            {
                !mainContentState&&<div className="lost-pets-list" >
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
                            categoriesVisibility={categoriesVisibility}
                            onMenuToggle={handleMenuToggle}
                            onCategoriesToggle={handleCategoriesToggle}
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
                            categoriesVisibility={categoriesVisibility}
                            onMenuToggle={handleMenuToggle}
                            onCategoriesToggle={handleCategoriesToggle}
                        />
                    ))}
                </div>
            }
            {isModalOpen && (
                <PetDetailsModal
                    pet={currentPet}
                    onClose={handleModalClose}
                    currUser={currentUser}
                />
            )}
        </main>
    );
};
export default MainContent;
