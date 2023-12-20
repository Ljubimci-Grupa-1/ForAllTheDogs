import React, {useEffect, useState} from 'react';
import './FilterBar.css';
import {Vrsta} from "../AddNewModal.tsx";

interface FilterBarProps {
    onNameChange: (name: string) => void;
    onSpeciesChange: (species: string) => void;
    onDateLostChange: (dateLost: string) => void;
    onApplyFilters: () => void;
    onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
                                                 onNameChange,
                                                 onSpeciesChange,
                                                 onDateLostChange,
                                                 onApplyFilters,
                                                 onClearFilters
                                             }) => {
    const [species, setSpecies]=useState([]);

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
                <option value="" key={-1}>All Species</option>
                {species.map((spec: Vrsta) => (
                    <option value={spec.speciesName} key={spec.id}>
                        {spec.speciesName}
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