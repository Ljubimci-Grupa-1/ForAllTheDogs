import React, { useState, useCallback, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const center = {
    lat: 45.813257,
    lng: 15.976448,
};

interface DraggableMapFormProps {
    onDragEnd: (latlng: L.LatLng) => void;
}

function DraggableMarker({ onDragEnd }: { onDragEnd: (latlng: L.LatLng) => void }) {
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(center);
    const markerRef = useRef<L.Marker>(null);

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

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d);
    }, []);

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
        >
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable
                        ? 'Marker is draggable'
                        : 'Click here to make marker draggable'}
                </span>
            </Popup>
        </Marker>
    );
}

const DraggableMapForm: React.FC<DraggableMapFormProps> = ({ onDragEnd }) => {
    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker onDragEnd={onDragEnd} />
        </MapContainer>
    );
};

export default DraggableMapForm;
