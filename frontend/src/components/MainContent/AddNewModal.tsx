import {ChangeEvent, useEffect, useState} from "react";
import "./AddNewModal.css"
import {Box, Button, Chip, Input, Option, Select, Sheet, Stack, SvgIcon} from "@mui/joy";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { styled } from '@mui/joy';
import React, { Component } from 'react';
import axios from "axios";


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
    const [isUploaded, setIsUploaded] = useState(false)

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
        const updatedFiles = [...selectedFile];
        updatedFiles.splice(index, 1);
        setSelectedFile(updatedFiles);
    };
    const handleSubmit=async ()=>{
        console.log(selectedFile);
        const formData = new FormData();
        {/*if (selectedFile.length > 0) {

            selectedFile.forEach((file, index) => {
                formData.append(`file${index + 1}`, file);
            });
            setSelectedFile([]);
            setCounter(0);
        } else {
            console.log('No files to submit');
        }*/}

        formData.append('inShelter', JSON.stringify(0)); // Example value, replace with your actual data

        // Append user details (assuming user is an object)
        formData.append('user', JSON.stringify({
            "name": "Aubrey Drake Graham",
            "email": "drizzy.drake@goated.com",
            "telephoneNumber": "0981234567"
        }));
        formData.append('activityName', JSON.stringify('Za ljubimcem se traga')); // Replace with actual data
        // Append pet details (assuming pet is an object)
        formData.append('pet', JSON.stringify({
            "speciesName": "Pas",
            "petName": "Marija",
            "Age": 3,
            "colors": [
                {
                    "colorName": "Plava"
                },
                {
                    "colorName": "Zelena"
                }
            ],
            "dateTimeMissing": "2023-12-16T10:00:00",
            "description": "Lost dog poop",
            "location": {
                "latitude": 12.456789,
                "longitude": -7.654321,
                "cityName": "Zagreb"
            }
        }));

        // Append each image file
        //formData.append('images', JSON.stringify({selectedFile}));
        if (selectedFile.length > 0) {

            formData.append('images', image[0]);
            // the image field name should be similar to your api endpoint field name
            // in my case here the field name is customFile

            axios.post(
                'http://localhost:8080/ad/add',
                formData,
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                    },
                }
            )
                .then(res => {
                    console.log(`Success` + res.data);
                })
                .catch(err => {
                    console.log(err.message);
                })

            setSelectedFile([]);
            setCounter(0);
        } else {
            formData.append('images', JSON.stringify([]));
            console.log('No files to submit');
        }
        for (const pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        {/*try {
            const response = await fetch('http://localhost:8080/ad/add', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Images uploaded successfully');
                // You can handle the response from the server here
            } else {
                console.error('Failed to upload images');
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }*/}
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
                                <label htmlFor="species">Species:</label>
                                <Select
                                    multiple
                                    placeholder="Select a species"
                                    variant="soft"
                                    color="primary"
                                    id="species"
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
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="age">Age:</label>
                                <Input
                                    color="primary"
                                    size="lg"
                                    variant="soft"
                                    id="age"
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
                            <div className="input-container" >
                                <label htmlFor="uploadPhoto">Upload photos:</label>

                                <div style={{ marginBottom: '1rem' , paddingTop:'8px'}}>
                                    <Button
                                        disabled={selectedFile.length>=3}
                                        sx={{
                                            display: 'flex',

                                            height:'43px',
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
                                        <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
                                    </Button>
                                    {(selectedFile.length>=3) && <p style={{color:"red"}}>Maximum of 3 images</p>}
                                    <button onClick={handleUpload} disabled={!isUploaded}>Upload</button>
                                    {isUploaded&&<p>!</p>}
                                    </div>
                            </div>
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
                            <button type="button" onClick={handleSubmit}>submit</button>
                        </Stack>
                    </form>
                </Stack>
            </Sheet>
        </div>
        </>);
};
