import {useEffect, useState} from "react";
import "./AddNewModal.css"
import {Box, Button, Chip, Input, Option, Select, Sheet, Stack, SvgIcon} from "@mui/joy";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { styled } from '@mui/joy';
interface Boja{
    id:number;
    colorName:string;
}
export interface Vrsta{
    id:number;
    speciesName:string;
}
export const AddNewModal = () =>{
    const [colors, setColors] = useState([]);
    const [species, setSpecies]=useState([]);

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

    return (
        <div className="modal-container">
            <Sheet className="modal-content">
                <Stack spacing={3}>
                    <h2>Post new ad</h2>
                    <form>
                        <Stack spacing={3} direction="row" justifyContent="center" flexWrap="wrap" useFlexGap>
                            {/*
                            <div className="input-container">
                                <label htmlFor="species">Species:</label>
                                <Input
                                    color="primary"
                                    size="lg"
                                    variant="soft"
                                    id="species"
                                />
                            </div>
                            */}
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
                                        <VisuallyHiddenInput type="file" />
                                    </Button>
                                    </div>
                            </div>

                        </Stack>
                    </form>
                </Stack>
            </Sheet>
        </div>
    );
};
