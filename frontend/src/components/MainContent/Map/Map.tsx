import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "./MapStyles.css";
import { Icon, divIcon, point } from "leaflet";
import {FC} from "react";


const Map : FC = () => {

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
        iconSize: [38, 38],
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

    return (
        <MapContainer center={[48.8566, 2.3522]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createClusterCustomIcon}S
            >
                <Marker position={[48.8584, 2.2945]} icon={customIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <Marker position={[48.8606, 2.3376]} icon={customIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <Marker position={[48.8529, 2.3499]} icon={customIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MarkerClusterGroup>
        </MapContainer>
    );
}

export default Map;
