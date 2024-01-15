import React, {useEffect, useState} from 'react';
import './FilterBar.css';
import {Vrsta} from "../AddNewModal.tsx";
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { ButtonGroup, Button } from '@mui/joy';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface County{
    id:number;
    countyName:string;
}
interface City{
    id:number;
    cityName:string;
}

interface Color {
    colorId: number;
    colorName: string;
}

interface FilterBarProps {
    onNameChange: (name: string) => void;
    onSpeciesChange: (species: string) => void;
    onDateLostChange: (dateLost: string) => void;
    onCountyChange: (county: string) => void;
    onCityChange: (city: string) => void;
    onColorChange: (colors: string[]) => void;
    onApplyFilters: () => void;
    onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
                                                 onNameChange,
                                                 onSpeciesChange,
                                                 onDateLostChange,
                                                 onCountyChange,
                                                 onCityChange,
                                                 onColorChange,
                                                 onApplyFilters,
                                                 onClearFilters
                                             }) => {
    const [species, setSpecies]=useState([]);
    const [counties, setCounties]=useState([]);
    const [cities, setCities]=useState([]);
    const [colors, setColors] = useState<string[]>([]);

    const handleClearFilters = () => {
        // Reset the state variables to their default values
        onNameChange('');
        onSpeciesChange('');
        onDateLostChange('');
        onCountyChange('');
        onCityChange('');
        onColorChange([]);

        // Clear the input and select values directly
        const petNameInput = document.getElementById('petNameInput') as HTMLInputElement;
        petNameInput.value = '';

        const speciesSelect = document.getElementById('speciesSelect') as HTMLSelectElement;
        speciesSelect.value = '';

        const colorSelect = document.getElementById('colorSelect') as HTMLSelectElement;
        colorSelect.value = []

        const countySelect = document.getElementById('countySelect') as HTMLSelectElement;
        countySelect.value = '';

        const citySelect = document.getElementById('citySelect') as HTMLSelectElement;
        citySelect.value = '';
    };


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

        const fetchCounties = async () => {
            try {
                const response = await fetch("http://localhost:8080/county/all");
                const data = await response.json();
                setCounties(data);
            } catch (error) {
                console.error("Error fetching species:", error);
            }
        };

        const fetchCities = async () => {
            try {
                const response = await fetch("http://localhost:8080/city/all");
                const data = await response.json();
                const data1=data.filter((value:City) => value.cityName !== "Ostalo");
                setCities(data1);
            } catch (error) {
                console.error("Error fetching species:", error);
            }
        };

        const fetchColors = async () => {
            try {
                const response = await fetch("http://localhost:8080/color/all");
                const data = await response.json();
                setColors(data)
            } catch (error) {
                console.error("Error fetching colors:", error);
            }
        };


        fetchSpecies();
        fetchCounties();
        fetchCities();
        fetchColors();
    }, []);

    return (
        <div className="filter-bar">
            <Input
                placeholder="Pet Name"
                id="petNameInput"
                onChange={(e) => onNameChange(e.target.value)}
            >
                <label htmlFor="speciesSelect">Species</label>
            </Input>

            <Select
                defaultValue=""
                color="primary"
                placeholder="Choose one…"
                size="md"
                variant="outlined"
                onChange={(e) => {
                    console.log('Selected Species:', e.target.value);
                    onSpeciesChange(e.target.value);
                }}
                id="speciesSelect"
            >
                <Option value="" key={-1}>All Species</Option>
                {species.map((spec: Vrsta) => (
                    <Option value={spec.speciesName} key={spec.id}>
                        {spec.speciesName}
                    </Option>
                ))}
            </Select>

            <Select
                defaultValue={['All Colors']}
                color="primary"
                placeholder="Choose one…"
                size="md"
                variant="outlined"
                multiple
                id="countySelect"
                onChange={(e) => {
                    const selectedOptions = Array.isArray(e) ? e.map((option) => option.value) : [];
                    onColorChange(selectedOptions);
                }}

            >
                <Option value="" key={-1}>All Colors</Option>
                {colors.map((spec: Color) => (
                    <Option value={spec.colorName} key={spec.colorId}>
                        {spec.colorName}
                    </Option>
                ))}
            </Select>

            <Select
                defaultValue=""
                color="primary"
                placeholder="Choose one…"
                size="md"
                variant="outlined"
                onChange={(e) => onCountyChange(e.target.value)}
                id="countySelect"
            >
                <Option value="" key={-1}>All Counties</Option>
                {counties.map((county: County) => (
                    <Option value={county.countyName} key={county.id}>
                        {county.countyName}
                    </Option>
                ))}
            </Select>

            <Select
                defaultValue=""
                color="primary"
                placeholder="Choose one…"
                size="md"
                variant="outlined"
                onChange={(e) => onCityChange(e.target.value)}
                id="citySelect"
            >
                <Option value="" key={-1}>All Cities</Option>
                {cities.map((city: City) => (
                    <Option value={city.cityName} key={city.id}>
                        {city.cityName}
                    </Option>
                ))}
            </Select>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker views={['year', 'day']} label="Date missing"/>
                </DemoContainer>
            </LocalizationProvider>

            <ButtonGroup aria-label="outlined primary button group">
                <Button onClick={onApplyFilters}>Apply Filters</Button>
                <Button onClick={() => { onClearFilters(); handleClearFilters(); }}>Clear Filters</Button>
            </ButtonGroup>
        </div>
    );
};

export default FilterBar;