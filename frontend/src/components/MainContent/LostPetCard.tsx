import React, { useState} from "react";
import {LostPet} from "./MainContent.tsx";
import "./LostPetCard.css";
import {AddNewModal, adUser, fdata} from "./AddNewModal.tsx";
import {CategoryComponent} from "./CategoryComponent.tsx";
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';

{/*
1.LostPetCardProps-explained in MainContent; klasa-lost-pet-card or lost-pet-card-inactive, currUser-user who is logged in

2.updateVisibility-shows the same component as for posting a new ad, just used for editing now

3.handleMore-menu; when clicked, shows 3 actions with ad: update, delete, change category

4.selectedValue-current chosen category


*/}


interface LostPetCardProps {
    pet: LostPet;
    onDetailsClick: () => void;
    isLoggedIn:boolean;
    klasa:string;
    currUser:adUser;
    onMenuToggle: (cardId: string) => void;
    cardId: string;
    menuState: { [key: string]: boolean };
    categoriesVisibility: { [key: string]: boolean };
    onCategoriesToggle: (cardId: string, state:boolean) => void;
}

const LostPetCard: React.FC<LostPetCardProps> = ({ pet, onDetailsClick, isLoggedIn, currUser,
                                                     onMenuToggle, cardId, menuState,
                                                     onCategoriesToggle, categoriesVisibility}) => {
    //const [isMenuVisible, setMenuVisible] = useState(false);
    const [updateVisibility, setUpdateVisibility] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const handleMore = () => {
        onMenuToggle(cardId); // Pass the cardId to toggle the correct menu
    };
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const response = await fetch(`https://forallthedogs.onrender.com/ad/delete/${pet.adId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log('Successfully deleted');
                window.location.reload();
            } else {
                console.error('Failed to delete');
            }
        } catch (error) {
            console.error('Error fetching method:', error);
        }
    };
    const handleUpdate = () => {
        setUpdateVisibility(true);
    };
    const handleChangeCategory = () => {
        //promijenit u true za cardId
        onCategoriesToggle(cardId, true);
    };
    const handleCategoryClose=()=>{

        onCategoriesToggle(cardId, false);
        //promijenit u false za cardId
    };
    const handleCloseModal = () => {
        setUpdateVisibility(false);
    };
    const handleSelected=(category:string)=>{
        setSelectedValue(category);
    };
    const handleCategoryFinish=async ()=>{
        const formData :fdata={
            inShelter: pet.inShelter,
            user: {
                name: pet.user.name,
                email: pet.user.email,
                telephoneNumber: pet.user.telephoneNumber,
            },
            activityName: selectedValue,
            pet: {
                speciesName: pet.speciesName,
                petName: pet.petName,
                age: pet.age,
                colors: pet.colors.map(colorName => ({ colorName })),
                dateTimeMissing: pet.dateTimeMissing,
                description: pet.description,
                location: {
                    latitude: pet.location.latitude,
                    longitude: pet.location.longitude,
                    cityName: pet.location.cityName,
                    countyName:pet.location.countyName
                },
            },
            images: null,
        };
        console.log(formData);
        try {
            const token = localStorage.getItem('jwt');
            const response = await fetch(`https://forallthedogs.onrender.com/ad/edit/${pet.adId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Category changed successfully');
                window.location.reload();
            } else {
                console.error('response not ok');
            }
        } catch (error) {
            console.error('Error trying to change category:', error);
        }
    };
    return (
        <>
            <Card sx={{width: 320}}>
                {(currUser.email === pet.user.email) && isLoggedIn && (
                    <Button onClick={handleMore}>
                        <i className="bi bi-three-dots"></i>
                    </Button>
                )}
                {menuState[cardId] && (
                    <ButtonGroup aria-label="outlined primary button group">
                        <Button onClick={handleDelete} sx={{width: '80px', ml: 2.5}}>Delete</Button>
                        <Button onClick={handleUpdate} sx={{width: '80px'}}>Update</Button>
                        <Button onClick={handleChangeCategory} sx={{width: '80px'}}>Change Category</Button>
                    </ButtonGroup>
                )}
                {categoriesVisibility[cardId] && (
                    <CategoryComponent
                        pet={pet}
                        handleCategoryClose={handleCategoryClose}
                        handleChangeCategory={handleSelected}
                        handleChanged={handleCategoryFinish}
                    />
                )}
                {pet.images && pet.images[0] && (
                    <AspectRatio minHeight="120px" maxHeight="200px">
                        <img
                            // @ts-ignore
                            src={pet.images[0].image} alt={pet.petName}/>
                    </AspectRatio>
                )}
                <div>
                    <Typography level="title-lg">{pet.petName}</Typography>
                    <Typography level="body-sm">{pet.speciesName}</Typography>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography level="body-sm">{pet.location.cityName}</Typography>
                        <Typography level="body-sm">, {pet.location.countyName}</Typography>
                    </Box>
                </div>

                <Button onClick={onDetailsClick}>View Details</Button>
            </Card>

            {updateVisibility && (
                <AddNewModal
                    closeModal={handleCloseModal} nameFill={pet.petName} ageFill={pet.age} speciesFill={pet.speciesName}
                    descriptionFill={pet.description} longitudeFill={pet.location.longitude}
                    latitudeFill={pet.location.latitude}
                    datetimeFill={pet.dateTimeMissing} cityFill={pet.location.cityName} text="Edit this ad"
                    colorsFill={pet.colors.map(colorName => ({ colorName }))}
                    countyFill={pet.location.countyName}
                    // @ts-ignore
                    imagesFill={pet.images.map(image=>image.image)} adIdFill={pet.adId}
                    isLoggedIn={isLoggedIn}
                    // @ts-ignore
                    user={{
                        name:currUser.name,
                        email: currUser.email,
                        telephoneNumber: currUser.telephoneNumber
                    }
                    }
                ></AddNewModal>
            )
            }
        </>
    );
};

export default LostPetCard;