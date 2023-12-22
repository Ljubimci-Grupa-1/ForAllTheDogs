import {ChangeEvent, useEffect, useRef, useState} from "react";
import "./AddNewModal.css"
import {Box, Button, Chip, Input, Option, Select, Sheet, Stack, SvgIcon} from "@mui/joy";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { styled } from '@mui/joy';
import DraggableMapForm from "./Map/DraggableMapForm";


interface Boja{
    id:number;
    colorName:string;
}
export interface Vrsta{
    id:number;
    speciesName:string;
}
interface AddNewModalProps {
    closeModal: () => void;
}
export const AddNewModal = ({ closeModal }: AddNewModalProps) =>{
    const [colors, setColors] = useState([]);
    const [species, setSpecies]=useState([]);
    const [counter, setCounter]=useState(0);
    const [selectedFile, setSelectedFile] = useState<File[]>([]);
    const [image, setImage]=useState<File[]>([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [markerPosition, setMarkerPosition] = useState({ latitude: 45.813257, longitude: 15.976448 });
    const [fileBase64Array, setFileBase64Array] = useState<string[]>([]);
    const [browsedFile, setBrowsedFile]=useState('');

    const [data, setData]=useState({
        age:0, name:"", species:"", colors:[], latitude:0, longitude:0, hour:0, date:0
    })


    const [formData, setFormData] = useState({
        inShelter: "1",
        user: {
            name: "Aubrey Drake Graham",
            email: "drizzy.drake@goated.com",
            telephoneNumber: "0981234567",
        },
        activityName: "Za ljubimcem se traga",
        pet: {
            speciesName: "Pas",
            petName: "Allah Krist Bomboclaat",
            Age: 3,
            colors: [
                {
                    colorName: "Plava",
                },
                {
                    colorName: "Zelena",
                },
            ],
            dateTimeMissing: "2023-12-16T10:00:00",
            description: "Lost dog poop",
            location: {
                latitude: 123.456789,
                longitude: -987.654321,
                cityName: "Zagreb",
            },
        },
        images: [],
    });
    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await fetch("http://localhost:8080/color/all");
                const data = await response.json();
                setColors(data);
            } catch (error) {
                console.error("Error fetching colors:", error);
            }
        };

        fetchColors();
    }, []);


    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const response = await fetch("http://localhost:8080/species/all");
                const data = await response.json();
                setSpecies(data);
            } catch (error) {
                console.error("Error fetching species:", error);
            }
        };

        fetchSpecies();
    }, []);

    useEffect(() => {
        console.log("hh")

    }, []);
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

    const handleClose=()=>{
        closeModal();
    }
    const handleDragEnd = (latlng: L.LatLng) => {
        setMarkerPosition({
            latitude: latlng.lat,
            longitude: latlng.lng,
        });
        setData({
            ...data,
            latitude: latlng.lat,
            longitude: latlng.lng,
        });
        console.log(latlng.lat);
        console.log(latlng.lng);
        console.log(markerPosition);
    };

    const handleFileChange = (event:ChangeEvent<HTMLInputElement>) => {
    if(selectedFile.length<3){
        if(event.target.files){
            setImage([event.target.files[0]]);
            setIsUploaded(true)
        }}};

    const handleUpload = (event) => {
        event.preventDefault();
        // Here, you can save the selectedFile or perform any other action
        if (selectedFile) {
            setSelectedFile([...selectedFile, image[0]]);
            setCounter(counter+1)
            setIsUploaded(false)
        } else {
            console.log('No file selected');
        }
    };
    const handleDeleteImage=(index:number)=>{
        const updatedFiles = [...fileBase64Array];
        updatedFiles.splice(index, 1);
        setFileBase64Array(updatedFiles);
    };
    const convertFile = (files: FileList | null) => {
        if (files && files.length > 0) {
            const fileRef = files[0];
            if (fileRef) {
                const fileType: string | undefined = fileRef.type;
                console.log("This file upload is of type:", fileType);

                const reader = new FileReader();
                reader.readAsBinaryString(fileRef);

                reader.onload = (ev: any) => {
                    // convert it to base64
                    const base64String = `data:${fileType || "application/octet-stream"};base64,${btoa(ev.target.result)}`;

                    // Add the new base64 string to the array
                    setFileBase64Array(prevArray => [...prevArray, base64String]);
                    console.log(fileBase64Array);
                };
            }
        }
    };
    const handleChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        console.log(newValue);
        if(newValue)
        setData({...data, species:newValue});
    };


    const handleSubmit=async ()=>{
        console.log(data);
        if (fileBase64Array) {
            formData.images=fileBase64Array;
            formData.pet.speciesName=data.species;
            formData.pet.Age=data.age;
            formData.pet.petName=data.name;
            formData.pet.location.latitude=data.latitude;
            formData.pet.location.longitude=data.longitude;
            try {
                const response = await fetch('http://localhost:8080/ad/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    console.log('Images uploaded successfully');
                    // You can handle the response from the server here
                } else {
                    console.error('Failed to upload images');
                }
            } catch (error) {
                console.error('Error uploading images:', error);
            }

            setSelectedFile([]);
            setCounter(0);
        } else {
            //formData.append('images', JSON.stringify([]));
            console.log('No files to submit');
        }
        console.log(formData);
    };

    return (
        <>
        <div className="modal-container">

            <Sheet className="modal-content">
                <i className="bi bi-x-circle"
                style={{
                    fontSize: '2em', // Adjust the font size to make the button bigger
                    position: 'absolute', // Position absolute for custom placement
                    top: '10px', // Adjust the top position as needed
                    right: '10px', // Adjust the left position as needed
                    cursor: 'pointer', // Add cursor pointer for better UX
                }}
                   onClick={handleClose}
                ></i>
                <Stack spacing={3}>
                    <h2>Post new ad</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault(); // Prevents the default form submission behavior
                        handleSubmit();
                    }}>
                        <Stack spacing={3} direction="row" justifyContent="center" flexWrap="wrap" useFlexGap>
                            <div className="input-container">
                                <label htmlFor="species2">Species:</label>
                                <Select

                                    placeholder="Select a species"
                                    variant="soft"
                                    color="primary"
                                    id="species2"
                                    onChange={handleChange}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap:'wrap', gap: '0.1rem' }}>
                                                <Chip variant="solid" color="primary">
                                                    {selected.label}
                                                </Chip>

                                        </Box>
                                    )}
                                    sx={{
                                        height:'100%',
                                        '& .MuiSelect-button': {
                                            backgroundColor: 'transparent',
                                            color: 'black',
                                            '&:focus': {
                                                backgroundColor: 'transparent',
                                            },
                                            marginTop: '0', // Remove top margin
                                            padding: '0'
                                        }
                                    }}
                                    slotProps={{
                                        listbox: {
                                            sx: {
                                                width: '100%',
                                            },
                                        },
                                    }}
                                >
                                    {species.map((spec: Vrsta) => (
                                        <Option key={spec.id} value={spec.speciesName}>
                                            {spec.speciesName}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="input-container">
                                <label htmlFor="petName">Pet name:</label>
                                <Input
                                    color="primary"
                                    size="lg"
                                    variant="soft"
                                    id="petName"
                                    onChange={(event)=>setData({...data, name:event.target.value})}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="age">Age:</label>
                                <Input
                                    color="primary"
                                    size="lg"
                                    variant="soft"
                                    id="age"
                                    onChange={(event)=>setData({...data, age: parseInt(event.target.value) })}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="color">Color:</label>
                                <Select
                                    multiple
                                    placeholder="Select a color"
                                    variant="soft"
                                    color="primary"
                                    id="color"
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap:'wrap', gap: '0.1rem' }}>
                                            {selected.map((selectedOption) => (
                                                <Chip variant="solid" color="primary">
                                                    {selectedOption.label}
                                                </Chip>
                                            ))}
                                        </Box>
                                    )}
                                    sx={{
                                        height:'100%',
                                        '& .MuiSelect-button': {
                                            backgroundColor: 'transparent',
                                            color: 'black',
                                            '&:focus': {
                                                backgroundColor: 'transparent',
                                            },
                                            marginTop: '0', // Remove top margin
                                            padding: '0'
                                        }
                                    }}
                                    slotProps={{
                                        listbox: {
                                            sx: {
                                                width: '100%',
                                            },
                                        },
                                    }}
                                >
                                    {colors.map((color: Boja) => (
                                        <Option key={color.id} value={color.colorName}>
                                            {color.colorName}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="input-container">
                                <label htmlFor="dateandtime">Gone missing:</label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column', // Display children in a column
                                            height: '100px', // Set the height of the container
                                            '& .MuiPaper-root': {
                                                // Your styles for the DateTimePicker
                                            },
                                            '& .MuiInputBase-input': {
                                                height: '50%',
                                                border: '0px',
                                                margin: '5px 0', // Adjust margin
                                                backgroundColor: '#e3effb',
                                                paddingLeft: '15px',
                                            },
                                            '& .MuiInputBase-root': {
                                                height: '90%',
                                            },
                                            '& .MuiIconButton-root': {
                                                height: '40px',
                                                border: '0px',
                                                margin: '0px',
                                            },
                                        }}
                                        components={['DateTimePicker']}>
                                        <DateTimePicker />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div className="input-container">
                                <label htmlFor="uploadPhoto">Upload photos:</label>

                                <div style={{ marginBottom: "1rem", paddingTop: "8px" }}>
                                    <Button
                                        disabled={selectedFile.length >= 3}
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
                                                handleFileChange(e);
                                                convertFile(e.target.files);
                                            }}
                                        />
                                    </Button>
                                    {(selectedFile.length >= 3) && (
                                        <p style={{ color: "red" }}>Maximum of 3 images</p>
                                    )}
                                    <button onClick={handleUpload} disabled={!isUploaded}>
                                        Upload
                                    </button>
                                    {isUploaded && <p>!</p>}
                                </div>
                            </div>
                            <div style={{height:'200px'}} className="input-container">
                                <DraggableMapForm onDragEnd={handleDragEnd}/>
                            </div>
                            <div className="input-container">
                            {selectedFile.map((_, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                    <span>Image {index + 1}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(index)}
                                        style={{ marginLeft: '8px', cursor: 'pointer', background: 'none', border: 'none', color: 'blue' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                                {fileBase64Array.map((base64, index) => (
                                    <div key={index}>
                                        <img src={base64} alt={`Uploaded ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={handleSubmit}>submit</button>

                        </Stack>
                    </form>
                </Stack>
            </Sheet>
        </div>
        </>);
};
