import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "./MapStyles.css";
import { Icon, divIcon, point } from "leaflet";
import {FC} from "react";


const Map : FC = () => {

    const customIcon = new Icon({
        iconUrl: "https://cdn0.iconfinder.com/data/icons/creatype-pet-shop-outline/64/1_pin_gps_paw_pet_animal_map-512.png",
        iconSize: [50, 50],
        iconAnchor: [12.5, 12.5],
        popupAnchor: [0, 0]
    });

    const createClusterCustomIcon = function (cluster: any) {
        return divIcon({
            html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
            className: 'marker-cluster-custom',
            iconSize: point(40, 40, true),
        });
    }

    // OVDJE CE BIT PET ARRAY KOJEG PULLAMO IZ BAZE
    const popups = [
        {
            title: "Drake",
            description: "Champagne Papi",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
            long: 45.802,
            lat: 15.975
        },
        {
            title: "Poopboy Farti",
            description: "Debos",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
            long: 45.812,
            lat: 15.975
        },
        {
            title: "Young Thug",
            description: "u zatvoru",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
            long: 45.809,
            lat: 15.969
        },
    ];

    return (
        <MapContainer center={[45.80044256647421, 15.971142980178024]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createClusterCustomIcon}
            >
                {popups.map((popup, index) => (
                    <Marker key={index} position={[popup.long, popup.lat]} icon={customIcon}>
                        <Popup>
                            <div>
                                <h2>{popup.title}</h2>
                                <p>{popup.description}</p>
                                {popup.imageUrl !== "" && <img src={popup.imageUrl} alt={popup.title} width="200" />}
                            </div>
                        </Popup>
                    </Marker>
                ))};
            </MarkerClusterGroup>
        </MapContainer>
    );
}
export default Map;