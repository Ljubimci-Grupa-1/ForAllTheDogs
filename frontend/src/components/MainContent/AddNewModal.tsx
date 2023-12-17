import React, {useEffect, useState} from "react";
import "./AddNewModal.css"
import {Autocomplete, Button, FormLabel, Input, Option, Select, Sheet, Stack} from "@mui/joy";
import {Form} from "react-router-dom";
import {response} from "express";

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
                                <Autocomplete
                                    sx={{
                                        "--Chip-minHeight": "5px"
                                    }}
                                    multiple
                                    forcePopupIcon={false}
                                    variant="soft"
                                    color="primary"
                                    options={colors}
                                    size="lg"
                                    getOptionLabel={option => option.colorName}
                                />
                            </div>
                        </Stack>
                    </form>
                </Stack>
            </Sheet>
        </div>
    );
};
