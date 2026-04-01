import React from 'react';

const FilterRow = () => {
  const filters = ['City', 'House', 'Residential', 'Apartment'];
  return (
    <div className="filter-row flex gap-6 text-sm font-medium mt-6 opacity-0">
      {filters.map((filter) => (
        <button key={filter} className="text-white hover:text-green-400 transition-colors uppercase tracking-wider">
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterRow;
