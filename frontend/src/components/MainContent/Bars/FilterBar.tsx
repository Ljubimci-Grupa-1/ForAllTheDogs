import React, {useEffect, useState} from 'react';
import './FilterBar.css';
import {Vrsta} from "../AddNewModal.tsx";

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

        const citySelect = document.getElementById('citySelect') as HTMLSelectElement;
        const speciesSelect = document.getElementById('speciesSelect') as HTMLSelectElement;
        const countySelect = document.getElementById('countySelect') as HTMLSelectElement;
        const colorSelect = document.getElementById('colorSelect') as HTMLSelectElement;

        citySelect.selectedIndex = 0;
        speciesSelect.selectedIndex = 0;
        countySelect.selectedIndex = 0;
        colorSelect.selectedIndex = 0;

        const petNameInput = document.getElementById('petNameInput') as HTMLInputElement;
        petNameInput.value = '';
        const dateLostInput = document.getElementById('dateLostInput') as HTMLInputElement;
        dateLostInput.value = '';
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
            <input
                type="text"
                placeholder="Pet Name"
                onChange={(e) => onNameChange(e.target.value)}
                id="petNameInput"
            />
            <select
                defaultValue=""
                onChange={(e) => onSpeciesChange(e.target.value)}
                id="speciesSelect"
            >
                <option value="" key={-1}>All Species</option>
                {species.map((spec: Vrsta) => (
                    <option value={spec.speciesName} key={spec.id}>
                        {spec.speciesName}
                    </option>
                ))}
            </select>
            <select
                defaultValue=""
                onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                    onColorChange(selectedOptions);
                }}
                multiple={true}
                id="colorSelect"
            >
                <option value="" key={-1}>All Colors</option>
                {colors.map((spec: Color) => (
                    <option value={spec.colorName} key={spec.colorId}>
                        {spec.colorName}
                    </option>
                ))}
            </select>
            <select
                defaultValue=""
                onChange={(e) => onCountyChange(e.target.value)}
                id="countySelect"
            >
                <option value="" key={-1}>All Counties</option>
                {counties.map((spec: County) => (
                    <option value={spec.countyName} key={spec.id}>
                        {spec.countyName}
                    </option>
                ))}
            </select>
            <select
                defaultValue=""
                onChange={(e) => onCityChange(e.target.value)}
                id="citySelect"
            >
                <option value="" key={-1}>All Cities</option>
                {cities.map((spec: City) => (
                    <option value={spec.cityName} key={spec.id}>
                        {spec.cityName}
                    </option>
                ))}
            </select>
            <input
                className="filter-date"
                type="date"
                placeholder="Date Lost"
                onChange={(e) => onDateLostChange(e.target.value)}
                id={"dateLostInput"}
            />
            <button onClick={onApplyFilters}>Apply Filters</button>
            <button onClick={() => {
                onClearFilters();
                handleClearFilters();
            }}>Clear Filters
            </button>

        </div>
    );
};

export default FilterBar;