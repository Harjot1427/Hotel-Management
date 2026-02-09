import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const FilterSidebar = ({ applyFilters }) => {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedGuests, setSelectedGuests] = useState([]);

  const budgetOptions = [
    { label: "$0 - $200", range: [0, 200] },
    { label: "$200 - $500", range: [200, 500] },
    { label: "$500 - $1,000", range: [500, 1000] },
    { label: "$1,000 - $2,000", range: [1000, 2000] },
    { label: "$2,000 - $5,000", range: [2000, 5000] },
  ];

  const handleApplyFilters = () => {
    const filters = {
      checked: selectedGuests,
      radio: selectedBudget
        ? budgetOptions.find((b) => b.label === selectedBudget).range
        : [],
    };
    applyFilters(filters);
  };

  return (
    <div className="p-4 space-y-6 w-[14rem] mt-[5rem]">
      {/* Budget Filter */}
      <div className="p-4 border rounded-md">
        <h3 className="font-semibold mb-2">Your budget per day</h3>
        <div className="space-y-2">
          {budgetOptions.map((option, index) => (
            <label
              key={index}
              className="flex items-center justify-between text-gray-700"
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="budget"
                  checked={selectedBudget === option.label}
                  onChange={() => setSelectedBudget(option.label)}
                  className="mr-2"
                />
                <span>{option.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
      {/* Guest Filter */}
      <div className="p-4 border rounded-md w-[14rem] mt-12">
        <h3 className="font-semibold mb-2">Guest Filter</h3>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6].map((guest, index) => (
            <label
              key={index}
              className="flex items-center justify-between text-gray-700"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedGuests.includes(guest)}
                  onChange={(e) =>
                    setSelectedGuests((prev) =>
                      e.target.checked
                        ? [...prev, guest]
                        : prev.filter((g) => g !== guest)
                    )
                  }
                  className="mr-2"
                />
                <span>{guest} Guest</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
