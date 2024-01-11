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

interface FilterBarProps {
    onNameChange: (name: string) => void;
    onSpeciesChange: (species: string) => void;
    onDateLostChange: (dateLost: string) => void;
    onCountyChange: (county: string) => void;
    onCityChange: (city: string) => void;
    onApplyFilters: () => void;
    onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
                                                 onNameChange,
                                                 onSpeciesChange,
                                                 onDateLostChange,
                                                 onCountyChange,
                                                 onCityChange,
                                                 onApplyFilters,
                                                 onClearFilters
                                             }) => {
    const [species, setSpecies]=useState([]);
    const [counties, setCounties]=useState([]);
    const [cities, setCities]=useState([]);

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


        fetchSpecies();
        fetchCounties();
        fetchCities();
    }, []);
    return (
        <div className="filter-bar">
            <input
                type="text"
                placeholder="Pet Name"
                onChange={(e) => onNameChange(e.target.value)}
            />
            <select
                defaultValue=""
                onChange={(e) => onSpeciesChange(e.target.value)}
            >
                <option value="" key={0}>All Species</option>
                {species.map((spec: Vrsta) => (
                    <option value={spec.speciesName} key={spec.speciesName}>
                        {spec.speciesName}
                    </option>
                ))}
            </select>

            <select
                defaultValue=""
                onChange={(e) => onCountyChange(e.target.value)}
            >
                <option value="" key={2}>All Counties</option>
                {counties.map((spec: County) => (
                    <option value={spec.countyName} key={spec.countyName}>
                        {spec.countyName}
                    </option>
                ))}
            </select>

            <select
            defaultValue=""
            onChange={(e) => onCityChange(e.target.value)}
        >
            <option value="" key={3}>All Cities</option>
            {cities.map((spec: City) => (
                <option value={spec.cityName} key={spec.cityName}>
                    {spec.cityName}
                </option>
            ))}
        </select>
            <input
                className="filter-date"
                type="date"
                placeholder="Date Lost"
                onChange={(e) => onDateLostChange(e.target.value)}
            />
            <button onClick={onApplyFilters}>Apply Filters</button>
            <button onClick={onClearFilters}>Clear Filters</button>
        </div>
    );
};

export default FilterBar;