import  {ChangeEvent, useEffect, useState} from "react";
import "./AddNewModal.css"
import {Box, Button, Chip, Input, Option, Select, Sheet, Stack, SvgIcon} from "@mui/joy";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { styled } from '@mui/joy';
import DraggableMapForm from "./Map/DraggableMapForm";
import dayjs from "dayjs";


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
interface Color {
    colorName:string;
}
interface Data{
    age:number;
    name:string;
    species:string;
    colors:Color[];
    latitude:number;
    longitude:number;
    datetime:string;
    description:string;
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
    const [data, setData]=useState<Data>({
        age:-1, name:"", species:"", colors:[], latitude:45.813257, longitude:15.976448, datetime:"", description:""
    })
    const [selectedDateTime, setSelectedDateTime] =useState(null);
    const [changed, setChanged]=useState<FormValidation>(
        {
            age:false, name:false, species:false, colors:false, latitude:false, longitude:false, datetime:false, description:false, images:false
        }
    )
    const [validation, setValidation]=useState<FormValidation>(
        {
            age:true, name:true, species:true, colors:true, latitude:true, longitude:true, datetime:true, description:true, images:true
        }
    )


    const [formData, setFormData] = useState({
        inShelter: "1",
        user: {
            name: "Aubrey Drake Graham",
            email: "drizzy.drake@goated.com",
            telephoneNumber: "0981234567",
        },
        activityName: "Za ljubimcem se traga",
        pet: {
            speciesName: "",
            petName: "",
            Age: -1,
            colors: [],
            dateTimeMissing: "",
            description: "",
            location: {
                latitude: 45.813257,
                longitude: 15.976448,
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
    }, [validation]);
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
                };
            }
        }
    };
    const handleChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        setChanged({...changed, species:true})
        if(newValue)
        setData({...data, species:newValue});
    };

    const handleColorChange = (
        event: React.SyntheticEvent | null,
        newValue: string[] | null,
    ) => {
        if(newValue){
             setData({...data, colors:newValue.map((colorName) => ({
                     colorName: colorName,
                 }))})
        }

    };

    const handleDateTimeChange = (newDateTime) => {
        setSelectedDateTime(newDateTime);
        const formattedDateTime = dayjs(newDateTime).format('YYYY-MM-DDTHH:mm:ss');
        setData({...data, datetime:formattedDateTime})
    };

    const formValidation = ()=>{
        const forma = {
            age:changed.age&&(data.age!==-1)&&(!isNaN(data.age)), name:(data.name!==''), species:changed.species&&(data.species!==''),
            description:(data.description!==''), datetime:(data.datetime!==''),
            colors:(data.colors.length!==0), latitude:(data.latitude!==190), longitude:(data.longitude!==190),
            images:(fileBase64Array.length<4)&&(fileBase64Array.length>0)
        }
        setValidation(forma);
    };

    const handleSubmit=async ()=>{
        formValidation();
        if (fileBase64Array) {
            formData.images=fileBase64Array;
            formData.pet.speciesName=data.species;
            formData.pet.Age=data.age;
            formData.pet.petName=data.name;
            formData.pet.location.latitude=data.latitude;
            formData.pet.location.longitude=data.longitude;
            formData.pet.colors=data.colors;
            formData.pet.dateTimeMissing=data.datetime;
            formData.pet.description=data.description;

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
{}
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
                                {!validation.species && <p className="error-message" style={{color:"red"}}>Species is required!</p>}
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
                                {!validation.name && <p className="error-message" style={{color:"red"}}>Name is required!</p>}
                            </div>
                            <div className="input-container">
                                <label htmlFor="age">Age:</label>
                                <Input
                                    color="primary"
                                    size="lg"
                                    variant="soft"
                                    id="age"
                                    type="number"
                                    onChange={(event)=>{
                                        setChanged({...validation, age:true})
                                        setData({...data, age: parseInt(event.target.value) });
                                    }}
                                />
                                {!validation.age && <p className="error-message" style={{color:"red"}}>Age is required!</p>}
                            </div>
                            <div className="input-container">
                                <label htmlFor="color">Color:</label>
                                <Select
                                    multiple
                                    placeholder="Select a color"
                                    variant="soft"
                                    color="primary"
                                    id="color"
                                    onChange={handleColorChange}
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
                                {!validation.colors && <p className="error-message" style={{color:"red"}}>At least 1 color!</p>}
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
                                        <DateTimePicker
                                            value={selectedDateTime}
                                            onChange={handleDateTimeChange}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                {!validation.datetime && <p className="error-message" style={{color:"red"}}>Date and time are required!</p>}
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
                            {!validation.images && <p className="error-message" style={{color:"red"}}>At least 1 image!</p>}
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
                            </div>
                            <button type="button" onClick={handleSubmit}>submit</button>
                            <div className="input-container">
                                <label htmlFor="description">Description:</label>
                                <textarea id="description"
                                          onChange={(event)=>setData({...data, description:event.target.value})}
                                ></textarea>
                                {!validation.description && <p className="error-message" style={{color:"red"}}>Description is required!</p>}
                            </div>
                        </Stack>
                    </form>
                </Stack>
            </Sheet>
        </div>
        </>);
};
