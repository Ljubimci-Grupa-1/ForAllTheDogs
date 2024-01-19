import { useState, useEffect } from 'react';
import './MainContent.css';
import PetDetailsModal from './PetDetailsModal';
import LostPetCard from './LostPetCard';
import FilterBar from "./Bars/FilterBar.tsx";
import NavigationBar from "./Bars/NavigationBar.tsx";
import {adUser, locationData} from "./AddNewModal.tsx";
import {useLocation} from "react-router-dom";

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
    colors: string[];
    images: string[];
    description: string;
    location:locationData;
    user:adUser;
    inShelter:number;
}
interface PetData {
    pet: LostPet;
    //images:string[];
}
interface MainContentProps{
    handleLoggedInAppC:()=>void;
    handleLoggedOutAppC:()=>void;
    handleMainContentStateChange:(state:boolean)=>void;
    mainContentState:boolean;
    shelterAdsShow:boolean;
    handleShelterAdsShow:(state:boolean)=>void;
}

const MainContent= ({handleLoggedInAppC, handleLoggedOutAppC, handleMainContentStateChange,
                        mainContentState, shelterAdsShow, handleShelterAdsShow}:MainContentProps) => {
    const location = useLocation();
    const shelterIdFromState = location.state && location.state.shelterId;
    // Rest of the code...
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPet, setCurrentPet] = useState<LostPet | null>(null);
    const [areFiltersApplied, setAreFiltersApplied] = useState(false);
    const [areFiltersAppliedAgain, setAreFiltersAppliedAgain] = useState(false);
    const [areFiltersAppliedAgainHelp, setAreFiltersAppliedAgainHelp] = useState(false);

    const [filterName, setFilterName] = useState('');
    const [filterSpecies, setFilterSpecies] = useState('');
    const [filterDateLost, setFilterDateLost] = useState('');
    const [filterCounty, setFilterCounty] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const [filterColors, setFilterColors] = useState<string[]>([]);

    const [filterNameBefore, setFilterNameBefore] = useState('');
    const [filterSpeciesBefore, setFilterSpeciesBefore] = useState('');
    const [filterDateLostBefore, setFilterDateLostBefore] = useState('');
    const [filterCountyBefore, setFilterCountyBefore] = useState('');
    const [filterCityBefore, setFilterCityBefore] = useState('');
    const [filterColorsBefore, setFilterColorsBefore] = useState<string[]>([]);

    const [filterNameChanged, setFilterNameChanged] = useState(false);
    const [filterSpeciesChanged, setFilterSpeciesChanged] = useState(false);
    const [filterDateLostChanged, setFilterDateLostChanged] = useState(false);
    const [filterCountyChanged, setFilterCountyChanged] = useState(false);
    const [filterCityChanged, setFilterCityChanged] = useState(false);
    const [filterColorsChanged, setFilterColorsChanged] = useState(false);

    const [lostPets, setLostPets] = useState<LostPet[]>([]);
    const [lostPetsUserProfile, setLostPetsUserProfile] = useState<LostPet[]>([]);
    const [lostPetsInactive, setLostPetsInactive] = useState<LostPet[]>([]);
    const [lostPetsInactiveUserProfile, setLostPetsInactiveUserProfile] = useState<LostPet[]>([]);
    const [lostPetsShelterActive, setLostPetsShelterActive]=useState<LostPet[]>([]);
    const [lostPetsShelterInactive, setLostPetsShelterInactive]=useState<LostPet[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // @ts-ignore
    const [currentUser, setCurrentUser] = useState<adUser>({
        email:"", name:"", telephoneNumber:""
    });
    const [menuState, setMenuState] = useState<{ [key: string]: boolean }>({}); // Menu state dictionary
    const [categoriesVisibility, setCategoriesVisibility] = useState<{ [key: string]: boolean }>({});


    useEffect(() => {
        document.title = "For All The Dogs";
        fetch(`http://localhost:8080/ad/all`)
            .then((response) => response.json())
            .then((data) => {
                console.log("joooj", data);
                const petsData: LostPet[] = data.map((item: PetData) => {
                    const pet: LostPet = item.pet;
                    // @ts-ignore
                    const images = item.images;
                    return { ...pet, images };
                });
                for (let i = 0; i < petsData.length; i++) {
                    if (data[i] && data[i].adId !== undefined) {
                        petsData[i].adId = data[i].adId;
                        petsData[i].activityName = data[i].activityName;
                        petsData[i].user=data[i].user
                        petsData[i].inShelter=data[i].inShelter;
                        console.log("datum test", i, petsData[i].dateTimeMissing)
                    }
                }
                const filtriraniShelter:LostPet[]=[];
                console.log(shelterIdFromState)
                for (let i = 0; i < petsData.length; i++) {
                    if (petsData[i].user.email===shelterIdFromState) {
                            filtriraniShelter.push(petsData[i]);
                    }
                }
                const separatedArraysShelter = filtriraniShelter.reduce<{
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

                const filteredPetsShelter = separatedArraysShelter.activeAds;
                const filteredPetsInactiveShelter = separatedArraysShelter.inactiveAds;
                console.log("ovo", filteredPetsShelter);

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
                setLostPets(activeAds);
                setLostPetsInactive(inactiveAds);
                setLostPetsShelterActive(filteredPetsShelter);
                setLostPetsShelterInactive(filteredPetsInactiveShelter);
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

    const filtering=(pet:LostPet):boolean=>{
        const nameMatch=filterNameBefore=== ''
            ? filterNameChanged ?pet.petName.toLowerCase().includes(filterNameBefore.toLowerCase())
                :pet.petName.toLowerCase().includes(filterName.toLowerCase())
            :areFiltersAppliedAgainHelp?pet.petName.toLowerCase().includes(filterName.toLowerCase()):
                pet.petName.toLowerCase().includes(filterNameBefore.toLowerCase());
        const speciesMatch=filterSpeciesBefore=== ''
            ? filterSpeciesChanged ?pet.speciesName.toLowerCase().includes(filterSpeciesBefore.toLowerCase())
                :pet.speciesName.toLowerCase().includes(filterSpecies.toLowerCase())
            :areFiltersAppliedAgainHelp?pet.speciesName.toLowerCase().includes(filterSpecies.toLowerCase()):
                pet.speciesName.toLowerCase().includes(filterSpeciesBefore.toLowerCase());
        //console.log("matchevi",nameMatch, speciesMatch);
        const dateOnlyPet=pet.dateTimeMissing.substring(0, 10);
        const dateOnlyFilter=filterDateLost.substring(0, 10);
        const dateOnlyFilterBefore=filterDateLostBefore.substring(0, 10);
        const dateLostMatch=filterDateLostBefore=== ''
            ? filterDateLostChanged ?dateOnlyPet.includes(dateOnlyFilterBefore)
                :pet.dateTimeMissing.includes(dateOnlyFilter)
            :areFiltersAppliedAgainHelp?dateOnlyPet.includes(dateOnlyFilter):
                dateOnlyPet.includes(dateOnlyFilterBefore);
        const countyMatch=filterCountyBefore=== ''
            ? filterCountyChanged ?pet.location.countyName.includes(filterCountyBefore)
                :pet.location.countyName.includes(filterCounty)
            :areFiltersAppliedAgainHelp?pet.location.countyName.includes(filterCounty):
                pet.location.countyName.includes(filterCountyBefore);
        const cityMatch=filterCityBefore=== ''
            ? filterCityChanged ?pet.location.cityName.includes(filterCityBefore)
                :pet.location.cityName.includes(filterCity)
            :areFiltersAppliedAgainHelp?pet.location.cityName.includes(filterCity):
                pet.location.cityName.includes(filterCityBefore);
        const colorMatch=filterColorsBefore.length===0
            ? filterColorsChanged?filterColorsBefore.every(color => pet.colors.includes(color))
                :filterColors.every(color => pet.colors.includes(color))
            :areFiltersAppliedAgainHelp?filterColors.every(color => pet.colors.includes(color)):
                filterColorsBefore.every(color => pet.colors.includes(color));
        return nameMatch && speciesMatch && dateLostMatch && countyMatch && cityMatch && colorMatch;
    };

    const filteringEasy=(pet:LostPet):boolean=>{
        const nameMatch = pet.petName.toLowerCase().includes(filterName.toLowerCase());
        const speciesMatch = pet.speciesName.toLowerCase().includes(filterSpecies.toLowerCase());
        const dateOnlyPet=pet.dateTimeMissing.substring(0, 10);
        const dateOnlyFilter=filterDateLost.substring(0, 10);
        const dateLostMatch = dateOnlyPet.includes(dateOnlyFilter);
        const countyMatch = pet.location.countyName.includes(filterCounty);
        const cityMatch = pet.location.cityName.includes(filterCity);
        const colorMatch = filterColors.every(color => pet.colors.includes(color));

        return nameMatch && speciesMatch && dateLostMatch && countyMatch && cityMatch && colorMatch;
    };

    const filteredPets = lostPets ? lostPets.filter((pet) => {
        if(areFiltersApplied){
            if(areFiltersAppliedAgain){
                return filtering(pet);
            }
            else{
                return filteringEasy(pet);
            }
        }
        else{
            return lostPets;
        }
    }) : [];

    const filteredPetsInactive = lostPetsInactive ? lostPetsInactive.filter((pet) => {
        if(areFiltersApplied){
            if(areFiltersAppliedAgain){
                return filtering(pet);
            }
            else{
                return filteringEasy(pet);
            }
        }
        else{
            return lostPetsInactive;
        }
    }) : [];

    const filteredPetsUserProfile = lostPetsUserProfile ? lostPetsUserProfile.filter((pet) => {
        if(areFiltersApplied){
            if(areFiltersAppliedAgain){
                return filtering(pet);
            }
            else{
                return filteringEasy(pet);
            }
        }
        else{
            return lostPetsUserProfile;
        }
    }) : [];

    const filteredPetsInactiveUserProfile = lostPetsInactiveUserProfile ? lostPetsInactiveUserProfile.filter((pet) => {
        if(areFiltersApplied){
            if(areFiltersAppliedAgain){
                return filtering(pet);
            }
            else{
                return filteringEasy(pet);
            }
        }
        else{
            return lostPetsInactiveUserProfile;
        }
    }) : [];

    const filteredPetsShelterActive = lostPetsShelterActive ? lostPetsShelterActive.filter((pet) => {
        if(areFiltersApplied){
            if(areFiltersAppliedAgain){
                return filtering(pet);
            }
            else{
                return filteringEasy(pet);
            }
        }
        else{
            return lostPetsShelterActive;
        }
    }) : [];

    const filteredPetsShelterInactive = lostPetsShelterInactive ? lostPetsShelterInactive.filter((pet) => {
        if(areFiltersApplied){
            if(areFiltersAppliedAgain){
                return filtering(pet);
            }
            else{
                return filteringEasy(pet);
            }
        }
        else{
            return lostPetsShelterInactive;
        }
    }) : [];

    const handleNameChange = (name: string) => {
        if(!areFiltersApplied){
            //nema problema, settamo filter
            setFilterName(name);
        }
        else{
            //vec su aktivni neki filteri, sad ih ponovno postavljamo, ali prije klika na apply moramo spremit stare
            setAreFiltersAppliedAgain(true);
            if(!filterNameChanged){
                setFilterNameBefore(filterName);//samo u prvom slucaju set
            }
            setFilterNameChanged(true);
            setFilterName(name);
        }
        setAreFiltersAppliedAgainHelp(false);

    };
    const handleSpeciesChange = (species: string) => {
        if(!areFiltersApplied){
            //nema problema, settamo filter
            setFilterSpecies(String(species));
        }
        else{
            //vec su aktivni neki filteri, sad ih ponovno postavljamo, ali prije klika na apply moramo spremit stare
            setAreFiltersAppliedAgain(true);
            if(!filterSpeciesChanged){
                setFilterSpeciesBefore(filterSpecies);//samo u prvom slucaju set
            }
            setFilterSpeciesChanged(true);
            setFilterSpecies(String(species));
        }
        setAreFiltersAppliedAgainHelp(false);
    };


    const handleDateLostChange = (dateLost: string) => {
        if(!areFiltersApplied){
            //nema problema, settamo filter
            setFilterDateLost(dateLost);
        }
        else{
            //vec su aktivni neki filteri, sad ih ponovno postavljamo, ali prije klika na apply moramo spremit stare
            setAreFiltersAppliedAgain(true);
            if(!filterDateLostChanged){
                setFilterDateLostBefore(filterDateLost);//samo u prvom slucaju set
            }
            setFilterDateLostChanged(true);
            setFilterDateLost(dateLost);
        }
        setAreFiltersAppliedAgainHelp(false);
    };

    const handleCountyChange=(county : string)=>{
        if(!areFiltersApplied){
            //nema problema, settamo filter
            setFilterCounty(String(county));
        }
        else{
            //vec su aktivni neki filteri, sad ih ponovno postavljamo, ali prije klika na apply moramo spremit stare
            setAreFiltersAppliedAgain(true);
            if(!filterCountyChanged){
                setFilterCountyBefore(filterCounty);//samo u prvom slucaju set
            }
            setFilterCountyChanged(true);
            setFilterCounty(String(county));
        }
        setAreFiltersAppliedAgainHelp(false);
    };

    const handleCityChange=(city : string)=>{
        if(!areFiltersApplied){
            //nema problema, settamo filter
            setFilterCity(String(city));
        }
        else{
            //vec su aktivni neki filteri, sad ih ponovno postavljamo, ali prije klika na apply moramo spremit stare
            setAreFiltersAppliedAgain(true);
            if(!filterCityChanged){
                setFilterCityBefore(filterCity);//samo u prvom slucaju set
            }
            setFilterCityChanged(true);
            setFilterCity(String(city));
        }
        setAreFiltersAppliedAgainHelp(false);

    };
    const handleColorChange = (colors: string[]) => {
        if(!areFiltersApplied){
            //nema problema, settamo filter
            setFilterColors(colors);
        }
        else{
            //vec su aktivni neki filteri, sad ih ponovno postavljamo, ali prije klika na apply moramo spremit stare
            setAreFiltersAppliedAgain(true);
            if(!filterColorsChanged){
                setFilterColorsBefore(filterColors);//samo u prvom slucaju set
            }
            setFilterColorsChanged(true);
            setFilterColors(colors);
        }
        setAreFiltersAppliedAgainHelp(false);

    };

    const handleApplyFilters = () => {
        if(areFiltersApplied){
            setAreFiltersAppliedAgainHelp(true);
        }
        else{
            //pri put applyjamo, jel potrebno ovo?
            setAreFiltersAppliedAgainHelp(false);

        }
        setAreFiltersApplied(true);
        setAreFiltersAppliedAgain(false);
        setFilterNameBefore('');
        setFilterSpeciesBefore('');
        setFilterDateLostBefore('');
        setFilterCountyBefore('');
        setFilterCityBefore('');
        setFilterColorsBefore([]);
        setFilterNameChanged(false);
        setFilterSpeciesChanged(false);
        setFilterDateLostChanged(false);
        setFilterCountyChanged(false);
        setFilterCityChanged(false);
        setFilterColorsChanged(false);
    };
    const handleClearFilters = () => {
        setFilterName('');
        setFilterSpecies('');
        setFilterDateLost('');
        setFilterCounty('');
        setFilterCity('');
        setFilterColors([]);
        setFilterNameBefore('');
        setFilterSpeciesBefore('');
        setFilterDateLostBefore('');
        setFilterCountyBefore('');
        setFilterCityBefore('');
        setFilterColorsBefore([]);
        setAreFiltersApplied(false);
        setAreFiltersAppliedAgain(false);
        setAreFiltersAppliedAgainHelp(false);
        setFilterNameChanged(false);
        setFilterSpeciesChanged(false);
        setFilterDateLostChanged(false);
        setFilterCountyChanged(false);
        setFilterCityChanged(false);
        setFilterColorsChanged(false);
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

        // @ts-ignore
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
                           handleShelterAdsShow={handleShelterAdsShow}
                           shelterAdsShow={shelterAdsShow}
            />

            <FilterBar
                onNameChange={handleNameChange}
                onSpeciesChange={handleSpeciesChange}
                onDateLostChange={handleDateLostChange}
                onCountyChange={handleCountyChange}
                onCityChange={handleCityChange}
                onColorChange={handleColorChange}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
            />
            {mainContentState&&!shelterAdsShow&&
                <div className="lost-pets-list" >
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
                !mainContentState&&!shelterAdsShow&&<div className="lost-pets-list" >
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
            {
                shelterAdsShow&&<div className="lost-pets-list" >
                    {filteredPetsShelterActive.map((pet) => (
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
                    {isLoggedIn&&filteredPetsShelterInactive.map((pet) => (
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
            {/*<Grid container spacing={3} sx={{ flexGrow: 1,*/}
            {/*margin:'10px'}}>*/}
            {/*    <Grid xs>*/}

            {/*    </Grid>*/}
            {/*    <Grid xs={10}>*/}
            {/*        <p>*/}
            {/*            Page {currentPage + 1} of {totalPages}*/}
            {/*        </p>*/}
            {/*        <button*/}
            {/*            onClick={() => handlePageChange(currentPage - 1)}*/}
            {/*            disabled={currentPage === 0}*/}
            {/*        >*/}
            {/*            Previous*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*            onClick={() => handlePageChange(currentPage + 1)}*/}
            {/*            disabled={currentPage === totalPages - 1}*/}
            {/*        >*/}
            {/*            Next*/}
            {/*        </button>*/}
            {/*    </Grid>*/}
            {/*    <Grid  xs>*/}
            {/*        <label htmlFor="pageSize">Page Size:</label>*/}
            {/*        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>*/}
            {/*            <option value={5}>5</option>*/}
            {/*            <option value={10}>10</option>*/}
            {/*            <option value={15}>15</option>*/}
            {/*            <option value={20}>20</option>*/}
            {/*        </select>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
        </main>
    );
};
export default MainContent;
