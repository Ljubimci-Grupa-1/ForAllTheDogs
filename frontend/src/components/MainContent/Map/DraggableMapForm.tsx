import { useState, useCallback, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface center {
    lat:number;
    lng:number;
}
interface DraggableMapFormProps {
    onDragEnd: (latlng: L.LatLng) => void;
    center:center;
}

interface DraggableMapFormProps {
    onDragEnd: (latlng: L.LatLng) => void;
    center: { lat: number; lng: number };
}

function DraggableMapForm({ onDragEnd, center }: DraggableMapFormProps) {
    const [position, setPosition] = useState(center);
    const markerRef = useRef<L.Marker>(null);

    const toggleDraggable = useCallback(() => {
        setPosition((prev) => ({
            ...prev,
            lat: prev.lat + 0.001,
            lng: prev.lng + 0.001,
        }));
    }, []);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker !== null) {
                    const newPosition = marker.getLatLng();
                    setPosition(newPosition);
                    onDragEnd(newPosition);
                }
            },
        }),
        [onDragEnd]
    );

    return (
        <MapContainer center={center} zoom={13} style={{ height: '300px' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef}>
                <Popup minWidth={90}>
                    <span onClick={toggleDraggable}>
                        Drag to where the pet got lost
                    </span>
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default DraggableMapForm;
