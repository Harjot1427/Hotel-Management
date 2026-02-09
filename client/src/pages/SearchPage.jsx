import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterSidebar from "../components/Serach/FilterSidebar";
import ProductList from "../components/Serach/ProductList";
import { useSearch } from "../context/Serach";

const SearchPage = () => {
  const [search, setSearch] = useSearch();
  const [filteredResults, setFilteredResults] = useState([]);

  const applyFilters = async (filters) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/product-filters`,
        filters
      );
      if (response.data.success) {
        setFilteredResults(response.data.products);
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between ml-[9rem] mr-[9rem] mt-8">
        <FilterSidebar applyFilters={applyFilters} />
        <ProductList
          products={
            filteredResults.length > 0 ? filteredResults : search.results
          }
        />
      </div>
    </div>
  );
};

export default SearchPage;
