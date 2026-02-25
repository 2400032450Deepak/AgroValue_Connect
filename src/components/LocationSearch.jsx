import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const LocationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchLocation = async (value) => {
    setQuery(value);

    if (value.length < 3) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&addressdetails=1&limit=5`
      );

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to search locations');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectLocation = (location) => {
    onSelect(location);
    setQuery(location.display_name);
    setResults([]);
    toast.success(`Selected: ${location.display_name.split(',')[0]}`);
  };

  return (
    <div className="relative">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for your city or area... (min. 3 characters)"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={query}
          onChange={(e) => searchLocation(e.target.value)}
        />
      </div>

      {isSearching && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 text-center text-gray-500 z-10">
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-10 border border-gray-200">
          {results.map((item, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-start space-x-3 border-b last:border-0"
              onClick={() => handleSelectLocation(item)}
            >
              <FaMapMarkerAlt className="text-primary-600 mt-1 flex-shrink-0" />
              <span className="text-sm text-gray-700">{item.display_name}</span>
            </button>
          ))}
        </div>
      )}

      {query.length >= 3 && results.length === 0 && !isSearching && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 text-center text-gray-500 z-10">
          No locations found. Try a different search.
        </div>
      )}
    </div>
  );
};

export default LocationSearch;