import React, {useEffect, useState} from "react";
import "./AddNewModal.css"
import {Box, Chip, Input, Option, Select, Sheet, Stack} from "@mui/joy";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';


export const AddNewModal = () =>{
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await fetch("http://localhost:8080/color/all");
                const data = await response.json();
                setColors(data);
            } catch (error) {
                console.error("Error fetching colors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchColors();
    }, []);
    return (
        <div className="modal-container">
            <Sheet className="modal-content">
                <Stack spacing={3}>
                    <h2>Post new ad</h2>
                    <form>
                        <Stack spacing={3} direction="row" justifyContent="center" flexWrap="wrap" useFlexGap>
                            <div className="input-container">
                                <label htmlFor="species">Species:</label>
                                <Input
                                    color="primary"
                                    size="lg"
                                    variant="soft"
                                    id="species"
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="petName">Pet Name:</label>
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
                                    {colors.map((color) => (
                                        <Option key={color.id} value={color.colorName}>
                                            {color.colorName}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="input-container">
                                <label htmlFor="dateanddtime">Date and time:</label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDateTimePicker
                                            variant="soft"
                                            sx={{
                                                '& .MuiPaper-root': {
                                                    backgroundColor:'black',
                                                },
                                                '& .MuiInputBase-input': {
                                                    height: '50%',
                                                    border: '0px',
                                                    margin: '0px',
                                                    backgroundColor:'#97C3F0',

                                                },
                                                height: '50%',
                                                backgroundColor:'black',
                                                '& .MuiInputBase-root': {
                                                    height: '100%',
                                                    backgroundColor:'black',

                                                },
                                            }}
                                            id="dateanddtime" defaultValue={dayjs('2022-04-17T15:30')} />
                                </LocalizationProvider>
                            </div>
                            <div className="input-container">

                            </div>

                        </Stack>
                    </form>
                </Stack>
            </Sheet>
        </div>
    );
};
