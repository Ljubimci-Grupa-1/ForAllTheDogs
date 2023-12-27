import React, { useState} from "react";
import {LostPet} from "./MainContent.tsx";
import "./LostPetCard.css";
import {AddNewModal, adUser, fdata} from "./AddNewModal.tsx";
import {CategoryComponent} from "./CategoryComponent.tsx";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface LostPetCardProps {
    pet: LostPet;
    onDetailsClick: () => void;
    isLoggedIn:boolean;
    klasa:string;
    currUser:adUser;
}

const LostPetCard: React.FC<LostPetCardProps> = ({ pet, onDetailsClick, isLoggedIn , klasa, currUser}) => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [updateVisibility, setUpdateVisibility] = useState(false);
    const [categoriesVisibility, setCategoriesVisibility] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const handleMore=()=>{
        setMenuVisible(!isMenuVisible);
    };
    const handleDelete = async () => {
        // Implement delete logic here
        try {
            const response = await fetch(`http://localhost:8080/ad/delete/${pet.adId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Successfully deleted');
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
        setCategoriesVisibility(true);
    };
    const handleCategoryClose=()=>{
        //put method here!
        setCategoriesVisibility(false);
    };
    const handleCloseModal = () => {
        setUpdateVisibility(false);
    };
    const handleSelected=(category:string)=>{
        setSelectedValue(category);
    };
    const handleCategoryFinish=async ()=>{
        const formData :fdata={
            inShelter: "1",
            user: {
                name: pet.user.name,
                email: pet.user.email,
                telephoneNumber: "123456789",
            },
            activityName: selectedValue,
            pet: {
                speciesName: pet.speciesName,
                petName: pet.petName,
                Age: pet.petAge,
                colors: pet.colors.map(colorName => ({ colorName })),
                dateTimeMissing: pet.dateTimeMissing,
                description: pet.description,
                location: {
                    latitude: pet.location.latitude,
                    longitude: pet.location.longitude,
                    cityName: pet.location.cityName,
                },
            },
            images: [],
        };
        console.log(formData);
        try {
            const response = await fetch(`http://localhost:8080/ad/edit/${pet.adId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Category changed successfully');
                // You can handle the response from the server here
            } else {
                console.error('response not ok');
            }
        } catch (error) {
            console.error('Error trying to change category:', error);
        }
    };
    return (
        <>
        <div className={klasa}>
            {(currUser.email===pet.user.email)&&isLoggedIn&&<button onClick={handleMore}><i className="bi bi-three-dots"></i></button>}
            {isMenuVisible && (
                <div className="menu">
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleChangeCategory}>Change Category</button>
                </div>
            )}
            {categoriesVisibility &&
                <CategoryComponent
                    pet={pet} handleCategoryClose={handleCategoryClose}
                    handleChangeCategory={handleSelected} handleChanged={handleCategoryFinish}/>}
            {pet.images && pet.images[0] && <img src={pet.images[0].image} alt={pet.petName} />}
            <h3>{pet.petName}</h3>
            <p>Species: {pet.speciesName}</p>
            <button onClick={onDetailsClick}>View Details</button>
        </div>
            {updateVisibility && (
                <AddNewModal
                    closeModal={handleCloseModal} nameFill={pet.petName} ageFill={pet.petAge} speciesFill={pet.speciesName}
                    descriptionFill={pet.description} longitudeFill={pet.location.longitude} latitudeFill={pet.location.latitude}
                    datetimeFill={pet.dateTimeMissing} cityFill={pet.location.cityName} text="Edit this ad"
                    colorsFill={pet.colors.map(colorName => ({ colorName }))}
                    countyFill={""}
                    imagesFill={pet.images.map(image=>image.image)} adIdFill={pet.adId}
                    isLoggedIn={isLoggedIn}
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