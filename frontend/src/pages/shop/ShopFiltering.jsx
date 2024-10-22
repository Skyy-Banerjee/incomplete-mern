import React from "react";

function ShopFiltering({ filters, filterState, setFilterState, clearFilters }) {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3>Filters</h3>

      {/* Category Filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Category</h4>
        <hr />
        {filters.categories.map((category) => (
          <label key={category} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="category"
              id="category"
              value={category}
              checked={filterState.category === category}
              onChange={(evt) =>
                setFilterState({ ...filterState, category: evt.target.value })
              }
            />
            <span className="ml-1">{category}</span>
          </label>
        ))}
      </div>

      {/* Color Filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Color</h4>
        <hr />
        {filters.colors.map((color) => (
          <label key={color} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="color"
              id="color"
              value={color}
              checked={filterState.color === color}
              onChange={(evt) =>
                setFilterState({ ...filterState, color: evt.target.value })
              }
            />
            <span className="ml-1">{color}</span>
          </label>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr />
        {filters.priceRanges.map((range) => (
          <label key={range.label} className=" capitalize cursor-pointer">
            <input
              type="radio"
              name="priceRange"
              id="priceRange"
              value={range.label}
              checked={filterState.priceRange === range.label}
              onChange={(evt) =>
                setFilterState({ ...filterState, priceRange: evt.target.value })
              }
            />
            <span className="ml-1">{range.label}</span>
          </label>
        ))}
      </div>
      {/* Clear Filters Button */}
      <button
        className="bg-primary py-1 px-4 text-white rounded transition-colors duration-300 hover:bg-primary-light hover:text-gray-800"
        onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
}

export default ShopFiltering;
