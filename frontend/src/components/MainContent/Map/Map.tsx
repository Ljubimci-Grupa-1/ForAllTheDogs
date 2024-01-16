import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapStyles.css";
import { Icon } from "leaflet";
import {FC, useEffect, useState} from "react";
import {LostPet} from "../MainContent.tsx";
import {adUser} from "../AddNewModal.tsx";


interface DataFetched{
    pet:LostPet;
    user:adUser;
    activityName:string;
    inShelter:number;
    adId:number;
    images:string[];
}
interface Popup {
    title:string;
    description:string;
    imageUrl:string;
    long:number;
    lat:number;
}
interface MapProps{
    isLoggedIn:boolean;
}

const Map : FC<MapProps> = ({ isLoggedIn }) => {
    const [popups, setPopups] = useState<Popup[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        document.title = "For All The Dogs";
        fetch('http://localhost:8080/ad/all')
            .then((response) => response.json())
            .then((data) => {
                if(!isLoggedIn){
                    const filtrirani:DataFetched[]=[];
                    for(let i=0; i<data.length; i++){
                        if(data[i].activityName==='Za ljubimcem se traga'){
                            filtrirani.push(data[i]);
                        }
                    }
                    const petsData: LostPet[] = filtrirani.map((item: DataFetched) => {
                        const pet: LostPet = item.pet;
                        // Assuming images is available in your data, replace 'images' with the actual property name
                        const images = item.images; // Replace 'images' with the actual property name
                        return { ...pet, images };
                    });
                    setPopups(
                        petsData.map((pet) => ({
                            title: pet.petName,
                            description: pet.description,
                            // @ts-ignore
                            imageUrl: pet.images[0]?.image || "",
                            long: pet.location.longitude,
                            lat: pet.location.latitude,
                        }))
                    );
                }
                else{
                    const petsData: LostPet[] = data.map((item: DataFetched) => {
                        const pet: LostPet = item.pet;
                        // Assuming images is available in your data, replace 'images' with the actual property name
                        const images = item.images; // Replace 'images' with the actual property name
                        return { ...pet, images };
                    });
                setPopups(
                    petsData.map((pet) => ({
                        title: pet.petName,
                        description: pet.description,
                        // @ts-ignore
                        imageUrl: pet.images[0]?.image || "",
                        long: pet.location.longitude,
                        lat: pet.location.latitude,
                    }))
                );}
            })
            .catch((error) => {
                console.error('Error fetching lost pets:', error);
            }).finally(()=>{
            setLoading(false);
        });
    }, []);

    const customIcon = new Icon({
        iconUrl: "https://cdn0.iconfinder.com/data/icons/creatype-pet-shop-outline/64/1_pin_gps_paw_pet_animal_map-512.png",
        iconSize: [50, 50],
        iconAnchor: [12.5, 12.5],
        popupAnchor: [0, 0]
    });

    if (loading) {
        return <p>Loading...</p>; // Show a loading indicator or message
    }
    return (
        <MapContainer center={[45.80044256647421, 15.971142980178024]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {popups.map((popup, index) => (
                <Marker key={index} position={[popup.lat, popup.long]} icon={customIcon}>
                    <Popup>
                        <div>
                            <h2>{popup.title}</h2>
                            <p>{popup.description}</p>
                            {popup.imageUrl !== "" && <img src={popup.imageUrl} alt={popup.title} width="200" />}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
        ;}

export default Map;