// MessageBoardModal.tsx
import React, {useEffect, useState} from 'react';
import './MessageBoardModal.css'
import {Button, styled, SvgIcon, Textarea} from "@mui/joy";
import DraggableMapForm from "./Map/DraggableMapForm";
import {adUser} from "./AddNewModal"; // You may need to install this library
interface MessageBoardModalProps {
    onClose: () => void;
    adId: number;
    currUser:adUser;
}
interface FormValidation{
    age:boolean;
    name:boolean;
    species:boolean;
    colors:boolean;
    latitude:boolean;
    longitude:boolean;
    datetime:boolean;
    description:boolean;
    images:boolean;
    county:boolean;
    city:boolean;
}

const deepCopy = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        const arrCopy = [];
        for (let i = 0; i < obj.length; i++) {
            arrCopy[i] = deepCopy(obj[i]);
        }
        return arrCopy;
    }

    const objCopy = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            objCopy[key] = deepCopy(obj[key]);
        }
    }

    return objCopy;
};


const MessageBoardModal: React.FC<MessageBoardModalProps> = ({ onClose, adId, currUser }) => {    // Your message board content and functionality here
    const [markerPosition, setMarkerPosition] = useState({ latitude: 45.813257, longitude: 15.976448 });
    const [fileBase64Array, setFileBase64Array] = useState<string>('');
    const [counter, setCounter]=useState(fileBase64Array.length);
    const [isUploaded, setIsUploaded] = useState(false);
    let browsedFile='';
    const [validation, setValidation]=useState<FormValidation>(
        {
            age:true, name:true, species:true, colors:true, latitude:true, longitude:true, datetime:true, description:true, images:true, county:true,
            city:true
        }
    );
    const [formData, setFormData] = useState({
        text: null,
        date: "",
        adId: adId,
        user: {
            name: "",
            email: "",
            telephoneNumber: "",
        },
        location: {
            latitude: null,
            longitude: null,
            cityName: "Zaprešić",
            countyName: "Zagrebačka",
        },
        image: null,
    });
    const handleDragEnd = (latlng: L.LatLng) => {
        setMarkerPosition({
            latitude: latlng.lat,
            longitude: latlng.lng,
        });

        // Deep copy the location object
        const newLocation = deepCopy(formData.location);

        // Update the fields
        newLocation.latitude = latlng.lat;
        newLocation.longitude = latlng.lng;
        newLocation.cityName = 'Zaprešić';
        newLocation.countyName = 'Zagrebačka';

        setFormData({
            ...formData,
            location: newLocation,
        });
        console.log(formData);
    };
    const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
    const handleChange = (fieldName: string) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (fieldName.startsWith('location.')) {
            // If the field belongs to the location object, use a deep copy
            const newLocation = deepCopy(formData.location);
            const locationFieldName = fieldName.split('.')[1];
            newLocation[locationFieldName] = event.target.value;

            setFormData({
                ...formData,
                location: newLocation,
            });
        } else {
            // If the field is at the top level, update directly
            setFormData({
                ...formData,
                [fieldName]: event.target.value,
            });
        }
        console.log(formData);
    };
    const convertFile = (files: FileList | null) => {
        console.log("ušo u convert");
        if (files && files.length > 0) {
            const fileRef = files[0];
            if (fileRef) {
                const fileType: string | undefined = fileRef.type;

                const reader = new FileReader();
                reader.readAsBinaryString(fileRef);

                reader.onload = (ev: any) => {
                    // convert it to base64
                    const base64String = `data:${fileType || "application/octet-stream"};base64,${btoa(ev.target.result)}`;
                    // Add the new base64 string to the array
                    setCounter(counter+1)
                    setFormData({
                        ...formData,
                        image: base64String,
                    });
                };
            }
        }
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 16); // Format: "YYYY-MM-DDTHH:mm"
        setFormData(prevFormData => ({
            ...prevFormData,
            date: formattedDate,
            user: {
                name: currUser.name,
                email: currUser.email,
                telephoneNumber: currUser.telephoneNumber,
            },
        }));
        console.log(formData);
        try {
            const response = await fetch('http://localhost:8080/message/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Message sent successfully');
                // Optionally, you can reset the form or perform other actions upon successful submission.
            } else {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="message-board-modal">
            <form onSubmit={handleSubmit}>
                <Textarea
                    color="primary"
                    minRows={2}
                    placeholder="Add new message"
                    variant="soft"
                    onChange={handleChange("text")}
                />
                <div style={{width:'100%',height:'200px'}} className="input-container">
                    <DraggableMapForm onDragEnd={handleDragEnd} center={{lat:markerPosition.latitude, lng:markerPosition.longitude}}/>
                </div><div className="input-container">
                <label htmlFor="uploadPhoto">Upload photos:</label>

                <div style={{ marginBottom: "1rem", paddingTop: "8px" }}>
                    <Button
                        disabled={fileBase64Array.length >= 1}
                        sx={{
                            display: "flex",
                            height: "43px",
                        }}
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        variant="outlined"
                        color="neutral"
                        startDecorator={
                            <SvgIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>
                            </SvgIcon>
                        }
                    >
                        Browse
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => {
                                //handleFileChange(e);
                                convertFile(e.target.files);
                            }}
                        />
                    </Button>
                    <p>{counter}</p>
                    {(fileBase64Array.length >= 1) && (
                        <p style={{ color: "red" }}>Maximum of 1 image</p>
                    )}
                    {isUploaded && <p style={{color:"red"}}>!</p>}
                </div>
                {!validation.images && <p className="error-message" style={{color:"red"}}>At least 1 image!</p>}
            </div>
                <Button type="submit">Send message</Button>

            </form>
            <button onClick={onClose}>Close Message Board</button>
        </div>
    );
};

export default MessageBoardModal;
