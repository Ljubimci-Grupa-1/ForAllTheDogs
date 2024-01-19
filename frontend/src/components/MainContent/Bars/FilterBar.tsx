import React, { useEffect, useState } from 'react';
import './FilterBar.css';
import { Vrsta } from '../AddNewModal.tsx';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { ButtonGroup, Button } from '@mui/joy';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";
import 'dayjs/locale/en';

interface County {
    id: number;
    countyName: string;
}
interface City {
    id: number;
    cityName: string;
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
                                                 onClearFilters,
                                             }) => {
    const [inputtedName, setInputtedName]=useState('');
    const [species, setSpecies] = useState<Vrsta[]>([]);
    const [counties, setCounties] = useState<County[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [selectedSpecies, setSelectedSpecies] = useState<string>('');
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedCounty, setSelectedCounty] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const handleClearFilters = () => {
        onNameChange('');
        onSpeciesChange('');
        onDateLostChange('');
        onCountyChange('');
        onCityChange('');
        onColorChange([]);

        setSelectedSpecies('');
        setSelectedColors([]);
        setSelectedCounty('');
        setSelectedCity('');
        setSelectedDateTime(null);
    };

    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const response = await fetch('http://localhost:8080/species/all');
                const data = await response.json();
                setSpecies(data);
            } catch (error) {
                console.error('Error fetching species:', error);
            }
        };

        const fetchCounties = async () => {
            try {
                const response = await fetch('http://localhost:8080/county/all');
                const data = await response.json();
                setCounties(data);
            } catch (error) {
                console.error('Error fetching counties:', error);
            }
        };

        const fetchCities = async () => {
            try {
                const response = await fetch('http://localhost:8080/city/all');
                const data = await response.json();
                const filteredData = data.filter((value: City) => value.cityName !== 'Ostalo');
                setCities(filteredData);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        const fetchColors = async () => {
            try {
                const response = await fetch('http://localhost:8080/color/all');
                const data = await response.json();
                setColors(data);
            } catch (error) {
                console.error('Error fetching colors:', error);
            }
        };

        fetchSpecies();
        fetchCounties();
        fetchCities();
        fetchColors();
    }, []);

    const handleDateTimeChange = (newDateTime) => {
        setSelectedDateTime(newDateTime);

        const formattedDateTime = dayjs(newDateTime).format('YYYY-MM-DDTHH:mm:ss');
        console.log(formattedDateTime);
        onDateLostChange(formattedDateTime);
    };




    return (
        <div className="filter-bar">
            <Input
                placeholder="Pet Name"
                id="petNameInput"
                onChange={(e) => {onNameChange(e.target.value); setInputtedName(e.target.value)}}
                value={inputtedName}
            >
            </Input>

            <Select
                value={selectedSpecies}
                color="primary"
                placeholder="Choose one…"
                size="md"
                variant="outlined"
                onChange={(event: React.ChangeEvent<{ value: unknown }>, value: string | null) => {
                        const selectedOption = value || "";
                            setSelectedSpecies(selectedOption);
                            onSpeciesChange(selectedOption);

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
                value={selectedColors}
                color="primary"
                placeholder="All Colors"
                size="md"
                variant="outlined"
                multiple
                id="colorSelect"
                onChange={(event: React.ChangeEvent<{ value: unknown }>, value: string[] | null) => {
                    if (value?.includes("All Colors") && value[value?.length-1]==="All Colors") {
                        console.log("help")
                        setSelectedColors(["All Colors"]);
                        onColorChange([])
                    } else {
                        const selectedOptions = value || [];
                        if(selectedOptions?.includes("All Colors") && selectedOptions[selectedOptions?.length-1]!=="All Colors") {
                            //izbaci all colors i ostalo settaj na to, jer smo bili na all colors al sad tog nema
                            const valueToDelete = "All Colors";
                            const newArray = selectedOptions.filter(item => item !== valueToDelete);
                            setSelectedColors(newArray);
                            onColorChange(newArray);
                        }
                        else {
                            setSelectedColors(selectedOptions);
                            onColorChange(selectedOptions);
                        }
                    }
                }}
            >
                <Option value="All Colors" key={-1}>
                    All Colors
                </Option>
                {colors.map((spec: Color) => (
                    <Option value={spec.colorName} key={spec.colorId}>
                        {spec.colorName}
                    </Option>
                ))}
            </Select>


            <Select
                value={selectedCounty}
                color="primary"
                placeholder="Choose one…"
                size="md"
                variant="outlined"
                onChange={(event: React.ChangeEvent<{ value: unknown }>, value: string | null) => {
                    const selectedValue = value || '';
                    setSelectedCounty(selectedValue);
                    onCountyChange(selectedValue);
                }}
                id="countySelect"
            >
                <Option value="" key={-1}>
                    All Counties
                </Option>
                {counties.map((county: County) => (
                    <Option value={county.countyName} key={county.id}>
                        {county.countyName}
                    </Option>
                ))}
            </Select>

            <Select
                value={selectedCity}
                color="primary"
                placeholder="Choose one…"
                size="md"
                variant="outlined"
                onChange={(event: React.ChangeEvent<{ value: unknown }>, value: string | null) => {
                    const selectedValue = value || '';
                    setSelectedCity(selectedValue);
                    onCityChange(selectedValue);
                }}
                id="citySelect"
            >
                <Option value="" key={-1}>
                    All Cities
                </Option>
                {cities.map((city: City) => (
                    <Option value={city.cityName} key={city.id}>
                        {city.cityName}
                    </Option>
                ))}
            </Select>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker
                        views={['year', 'day']}
                        label="Date missing"
                        value={selectedDateTime}
                        onChange={(newDateTime) => handleDateTimeChange(newDateTime)}
                    />
                </DemoContainer>
            </LocalizationProvider>


            <ButtonGroup aria-label="outlined primary button group">
                <Button onClick={onApplyFilters}>Apply Filters</Button>
                <Button onClick={() => { onClearFilters(); handleClearFilters(); setInputtedName('');}}>Clear Filters</Button>
            </ButtonGroup>
        </div>
    );

};

export default FilterBar;
