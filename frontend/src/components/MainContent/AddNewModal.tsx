import React, {useEffect, useState} from "react";
import "./AddNewModal.css"
import {Box, Button, Checkbox, Chip, Input, Option, Select, Sheet, Stack, SvgIcon} from "@mui/joy";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { styled } from '@mui/joy';
import DraggableMapForm from "./Map/DraggableMapForm";
import dayjs from "dayjs";
import 'dayjs/locale/en'; // Import English locale for dayjs

{/*
1.isUploaded-when users picks a photo from his device, he needs to click Upload to confirm his choice. isUploaded is false when there is
no photo waiting to be uploaded, true otherwise.
fileBase64Array-all chosen photos for user's ad.
browsedFile-file waiting to be uploaded
counter-amount of chosen photos

2.data: initial placeholders for form inputs
a)when posting-this is recognized as speciesFill===''
initially all empty, changes when user changes certain input
b)when editing-this is recognized as speciesFill!==''
initially has values of the edited ad, changes when user changes certain input

3.changed-object of booleans saying is an input has been changed at all (probably useless but i'm not sure, as there still is
reference to it in formValidation); initially all false
validation-object of booleans later used for displaying error messages if some inputs are left empty; initially all true
formValidation-function called when submitting, used for validating user's form

4.VisuallyHiddenInput-taken from Joy; used for browsing your own files

5.handleChange, handleChangeCounty, handleChangeCity, handleColorChange, handleDateTimeChange-all used for changing values of its inputs

6.convertFile, handleUpload, handleDeleteImage-used for uploading and deleting uploaded images
*/}

// Set English locale for dayjs
dayjs.locale('en');
interface Boja{
    id:number;
    colorName:string;
}
export interface Vrsta{
    id:number;
    speciesName:string;
}
export interface County{
    countyId:number;
    countyName:string;
}
export interface City{
    id:number;
    cityName:string;
}
export interface Color {
    colorName:string;
}
export interface adUser{
    name:string;
    email:string;
    telephoneNumber:string;
    userType:number;
}
interface AddNewModalProps {
    closeModal: () => void;
    text:string;
    adIdFill:number;
    speciesFill:string;
    colorsFill:Color[];
    ageFill:number;
    nameFill:string;
    latitudeFill:number;
    longitudeFill:number;
    datetimeFill:string;
    descriptionFill:string;
    cityFill:string;
    countyFill:string;
    imagesFill:string[];
    isLoggedIn:boolean;
    user:adUser;
}
export interface Data{
    age:number;
    name:string;
    species:string;
    colors:Color[];
    latitude:number;
    longitude:number;
    datetime:string;
    description:string;
    city:string;
    county:string;
}
export interface locationData{
    latitude:number;
    longitude:number;
    cityName: string;
    countyName:string;
}
interface petData{
    speciesName:string;
    petName:string;
    age:number;
    colors:Color[];
    dateTimeMissing:string;
    description:string;
    location:locationData;
}
export interface fdata{
    inShelter:string;
    user: object;
    activityName: string;
    pet: petData;
    images: string[] | null;
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
export const AddNewModal = ({ closeModal, speciesFill, nameFill, ageFill, colorsFill, descriptionFill,
                                latitudeFill, longitudeFill, cityFill, datetimeFill,imagesFill, countyFill, text, adIdFill, user }: AddNewModalProps) =>{
    const [colors, setColors] = useState([]);
    const [species, setSpecies]=useState([]);
    const [counties, setCounties] = useState<County[]>([]);
    const [countyCities, setCountyCities] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [markerPosition, setMarkerPosition] = useState({ latitude: 45.813257, longitude: 15.976448 });
    const [fileBase64Array, setFileBase64Array] = useState<string[]>(imagesFill);
    const [browsedFile, setBrowsedFile]=useState('');
    const [counter, setCounter]=useState(fileBase64Array.length);
    const [isChecked, setIsChecked] = useState(false);
    //problem sa county, oni ga ne salju
    const [data, setData]=useState<Data>({
        age:ageFill, name:nameFill, species:speciesFill, colors:colorsFill,
        latitude:latitudeFill, longitude:longitudeFill, datetime:datetimeFill, description:descriptionFill, city:cityFill, county:countyFill
    })

    const [selectedDateTime, setSelectedDateTime] =useState(null);
    const [changed, setChanged]=useState<FormValidation>(
        {
            age:false, name:false, species:false, colors:false, latitude:false, longitude:false, datetime:false, description:false, images:false,
            county:false, city:false
        }
    )
    const [validation, setValidation]=useState<FormValidation>(
        {
            age:true, name:true, species:true, colors:true, latitude:true, longitude:true, datetime:true, description:true, images:true, county:true,
            city:true
        }
    )
    const formData :fdata={
        inShelter: "1",
        user: {
            name: user.name,
            email: user.email,
            telephoneNumber: user.telephoneNumber,
        },
        activityName: "Za ljubimcem se traga",
        pet: {
            speciesName: "",
            petName: "",
            age: -1,
            colors: [],
            dateTimeMissing: "",
            description: "",
            location: {
                latitude: 45.813257,
                longitude: 15.976448,
                cityName: "",
                countyName:""
            },
        },
        images: [],
    };
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
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/county/all");
                const data1 = await response.json();
                setCounties(data1);

                if (data.county !== '') {
                    const targetCounty = data1.find((county:County) => county.countyName === data.county);
                    const myId = targetCounty ? targetCounty.countyId : null;
                    const responseCities = await fetch(`http://localhost:8080/county/${myId}`);
                    const data2 = await responseCities.json();
                    setCountyCities(data2.cities);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [data.county]);

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
        console.log(latlng.lng, latlng.lat);
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

    const handleChange = (
        _: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        setChanged({...changed, species:true})
        if(newValue)
            setData({...data, species:newValue});
    };
    const handleChangeCounty = (
        _: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        setChanged({...changed, county:true})
        if(newValue) {
            setData({...data, county: newValue});
            const targetCounty = counties.find(county => county.countyName === newValue);
            const myId = targetCounty ? targetCounty.countyId : null;
            const fetchCitiesByCounties = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/county/${myId}`);
                    const data = await response.json();
                    setCountyCities(data.cities);
                } catch (error) {
                    console.error("Error fetching counties:", error);
                }
            };
            fetchCitiesByCounties();
        }
    };

    const handleChangeCity = (
        _: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        setChanged({...changed, city:true})
        if(newValue)
            setData({...data, city:newValue});
    };
    const handleColorChange = (
        _: React.SyntheticEvent | null,
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

    const convertFile = (files: FileList | null) => {
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
                    setBrowsedFile(base64String);
                    setIsUploaded(true);
                    //setFileBase64Array(prevArray => [...prevArray, base64String]);
                };
            }
        }
    };

    const handleUpload :React.MouseEventHandler<HTMLButtonElement>= (event) => {
        //event.preventDefault();
        // Here, you can save the selectedFile or perform any other action
        if (fileBase64Array) {
            setFileBase64Array(prevArray => [...prevArray, browsedFile]);
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
    const formValidation = ()=>{
        if(speciesFill===''){
            const forma = {
                age:changed.age&&(data.age>=0)&&(!isNaN(data.age)), name:(data.name!==''), species:changed.species&&(data.species!==''),
                description:(data.description!==''), datetime:(data.datetime!==''),
                colors:(data.colors.length!==0), latitude:(data.latitude!==190), longitude:(data.longitude!==190),
                images:(fileBase64Array.length<4)&&(fileBase64Array.length>0), county:(data.county!==''), city:(data.city!=='')
            }
            setValidation(forma);
        }
        else{
            const forma = {
                age:(!isNaN(data.age))&&(data.age>=0), name:(data.name!==''), species:(data.species!==''),
                description:(data.description!==''), datetime:(data.datetime!==''),
                colors:(data.colors.length!==0), latitude:(data.latitude!==190), longitude:(data.longitude!==190),
                images:(fileBase64Array.length<4)&&(fileBase64Array.length>0), county:(data.county!==''), city:(data.city!=='')
            }
            setValidation(forma);
        }
    };

    const handleSubmit=async ()=>{
        // @ts-ignore
        event.preventDefault();
        formValidation();
        console.log(markerPosition);
        if (fileBase64Array.length>0) {
            formData.inShelter = isChecked ? "2" : "1";
            formData.pet.speciesName = data.species;
            formData.pet.age = data.age;
            formData.pet.petName = data.name;
            formData.pet.location.latitude = data.latitude;
            formData.pet.location.longitude = data.longitude;
            formData.pet.colors = data.colors;
            formData.pet.dateTimeMissing = data.datetime;
            formData.pet.description = data.description;
            formData.pet.location.cityName = data.city;
            formData.pet.location.countyName=data.county;
            if(speciesFill===''){
            try {
                formData.images = fileBase64Array;
                console.log(formData);
                const token = localStorage.getItem('jwt');
                const response = await fetch('http://localhost:8080/ad/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    window.location.reload();
                    console.log('Images uploaded successfully');

                    // You can handle the response from the server here
                    setFileBase64Array([]);
                    setCounter(0);
                } else {

                    console.error('Failed to add the ad');
                }
            } catch (error) {
                console.error('Error uploading images:', error);
            }}
            else{
                //radi se o updateu
                if(fileBase64Array==imagesFill){
                    formData.images=null;
                }
                else{
                    formData.images=fileBase64Array;
                }
                console.log(formData);
                try {
                    const token = localStorage.getItem('jwt');
                    const response = await fetch(`http://localhost:8080/ad/edit/${adIdFill}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        window.location.reload();
                        console.log('Images uploaded successfully');
                        // You can handle the response from the server here
                    } else {
                        console.log(Error);
                        console.error('Failed to add the ad');
                    }
                } catch (error) {
                    console.error('Error uploading images:', error);
                }
            }

        } else {
            //formData.append('images', JSON.stringify([]));
            console.log('No files to submit');
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <div className="modal-container">
                {}
                <Sheet className="modal-content">


                    {/*CLOSE BUTTON*/}
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



                    {/*INPUTS*/}
                    <Stack spacing={3}>
                        <h2>{text}</h2>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3} direction="row" justifyContent="center" flexWrap="wrap" useFlexGap>


                                {/*SPECIES INPUT*/}
                                <div className="input-container">
                                    <label htmlFor="species2">Species:</label>
                                    <Select
                                        placeholder="Select a species"
                                        variant="soft"
                                        color="primary"
                                        id="species2"
                                        onChange={handleChange}
                                        value={data.species}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap:'wrap', gap: '0.1rem' }}>
                                                <Chip variant="solid" color="primary" key={"speciesRender"}>
                                                    {(selected!==null)&&selected.label}
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
                                            <Option key={spec.speciesName} value={spec.speciesName}>
                                                {spec.speciesName}
                                            </Option>
                                        ))}
                                    </Select>
                                    {!validation.species && <p className="error-message" style={{color:"red"}}>Species is required!</p>}
                                </div>



                                {/*NAME INPUT*/}
                                <div className="input-container">
                                    <label htmlFor="petName">Pet name:</label>
                                    <Input
                                        color="primary"
                                        size="lg"
                                        variant="soft"
                                        id="petName"
                                        value={data.name}
                                        onChange={(event)=>setData({...data, name:event.target.value})}
                                    />
                                    {!validation.name && <p className="error-message" style={{color:"red"}}>Name is required!</p>}
                                </div>



                                {/*AGE INPUT*/}
                                <div className="input-container">
                                    <label htmlFor="age">Age:</label>
                                    <Input
                                        color="primary"
                                        size="lg"
                                        variant="soft"
                                        id="age"
                                        type="number"
                                        value={data.age}
                                        onChange={(event)=>{
                                            setChanged({...validation, age:true})
                                            setData({...data, age: parseInt(event.target.value) });
                                        }}
                                    />
                                    {!validation.age && <p className="error-message" style={{color:"red"}}>Age is required!</p>}
                                </div>



                                {/*COLOR INPUT*/}
                                <div className="input-container">
                                    <label htmlFor="color">Color:</label>
                                    <Select
                                        multiple
                                        placeholder="Select a color"
                                        variant="soft"
                                        color="primary"
                                        id="color"
                                        value={data.colors.map(boja=>boja.colorName)}
                                        onChange={handleColorChange}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap:'wrap', gap: '0.1rem' }}>
                                                {selected.map((selectedOption) => (
                                                    <Chip variant="solid" color="primary"
                                                          key={selectedOption.label}>
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
                                            <Option key={color.colorName} value={color.colorName}>
                                                {color.colorName}
                                            </Option>
                                        ))}
                                    </Select>
                                    {!validation.colors && <p className="error-message" style={{color:"red"}}>At least 1 color!</p>}
                                </div>



                                {/*DATETIME INPUT*/}
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



                                {/*IMAGES INPUT*/}
                                <div className="input-container">
                                    <label htmlFor="uploadPhoto">Upload photos:</label>

                                    <div style={{ marginBottom: "1rem", paddingTop: "8px" }}>
                                        <Button
                                            disabled={fileBase64Array.length >= 3}
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
                                        {(fileBase64Array.length >= 3) && (
                                            <p style={{ color: "red" }}>Maximum of 3 images</p>
                                        )}
                                        <button onClick={handleUpload} disabled={!isUploaded}>
                                            Upload
                                        </button>
                                        {isUploaded && <p style={{color:"red"}}>Press the Upload button!</p>}
                                    </div>
                                    {!validation.images && <p className="error-message" style={{color:"red"}}>At least 1 image!</p>}
                                </div>


                                {/*DESCRIPTION INPUT*/}
                                <div className="input-container">
                                    <label htmlFor="description">Description:</label>
                                    <textarea id="description" value={data.description}
                                              onChange={(event)=>setData({...data, description:event.target.value})}
                                    ></textarea>
                                    {!validation.description && <p className="error-message" style={{color:"red"}}>Description is required!</p>}
                                </div>



                                {/*MAP INPUT*/}
                                <div style={{height:'200px'}} className="input-container">
                                    <DraggableMapForm onDragEnd={handleDragEnd} center={{lat:latitudeFill, lng:longitudeFill}}/>
                                </div>



                                {/*COUNTY INPUT*/}
                                <div className="input-container">
                                    <label htmlFor="counties">County:</label>
                                    <Select

                                        placeholder="Select a county"
                                        variant="soft"
                                        color="primary"
                                        id="counties"
                                        onChange={handleChangeCounty}
                                        value={data.county}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap:'wrap', gap: '0.1rem' }}>
                                                <Chip variant="solid" color="primary" key={"countyRender"}>
                                                    {(selected!==null)&&selected.label}
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
                                        {counties.map((spec: County) => (
                                            <Option key={spec.countyName} value={spec.countyName}>
                                                {spec.countyName}
                                            </Option>
                                        ))}
                                    </Select>
                                    {!validation.county && <p className="error-message" style={{color:"red"}}>County is required!</p>}
                                </div>



                                {/*CITY INPUT*/}
                                <div className="input-container">
                                    <label htmlFor="cities">City:</label>
                                    <Select
                                        disabled={data.county===''}
                                        placeholder="Select a city from your county"
                                        variant="soft"
                                        color="primary"
                                        id="cities"
                                        onChange={handleChangeCity}
                                        value={data.city}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap:'wrap', gap: '0.1rem' }}>
                                                <Chip variant="solid" color="primary" key={"cityRender"}>
                                                    {(selected!==null)&&selected.label}
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
                                        {countyCities.map((spec: City) => (
                                            <Option key={spec.cityName} value={spec.cityName}>
                                                {spec.cityName}
                                            </Option>
                                        ))}
                                    </Select>
                                    {!validation.city && <p className="error-message" style={{color:"red"}}>City is required!</p>}
                                </div>



                                {/*showing images, possibility of deleting*/}
                                <div className="input-container">
                                    {fileBase64Array.map((_, index) => (
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
                                {user.userType==2 &&
                                <div className="input-container">
                                    <label htmlFor="inShelter">In shelter:</label>
                                    <Checkbox
                                        color="primary"
                                        label="In shelter?"
                                        variant="solid"
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                                }

                                {/*SUBMIT BUTTON*/}
                                {/*<button type="button" onClick={handleSubmit}>submit</button>*/}
                                {<button type="submit">submit</button>}
                            </Stack>
                        </form>
                    </Stack>
                </Sheet>
            </div>
        </>);
};