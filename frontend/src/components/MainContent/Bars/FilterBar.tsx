import React from 'react';
import './FilterBar.css';

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
                <option value="">All Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                {/* Add more species as needed */}
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