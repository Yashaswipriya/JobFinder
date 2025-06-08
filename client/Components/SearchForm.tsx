"use client";
import { useJobContext } from "@/context/jobsContext";
import { location } from "@/utils/icons";
import { Search } from "lucide-react";
import React from "react";

function SearchForm() {
  const { searchJobs, handleSearchChange, searchQuery } = useJobContext();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchJobs(searchQuery.tags, searchQuery.location, searchQuery.title);
      }}
      className="w-full max-w-6xl mx-auto mt-6 px-4"
    >
      <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden relative">
        {/* Search Icon + Title Input */}
        <div className="flex items-center px-6 flex-1 relative">
          <Search className="absolute left-6 text-[#7263F3]" size={24} />
          <input
            type="text"
            name="title"
            value={searchQuery.title}
            onChange={(e) => handleSearchChange("title", e.target.value)}
            placeholder="Job Title or Keywords"
            className="w-full py-5 pl-16 pr-4 text-lg outline-none text-gray-700"
          />
        </div>

        {/* Divider */}
        <div className="h-10 w-px my-4 bg-gray-300" />

        {/* Location Icon + Location Input */}
        <div className="flex items-center px-6 flex-1 relative">
          <span className="absolute left-6 text-[#7263F3] text-xl">
            {location}
          </span>
          <input
            type="text"
            name="location"
            value={searchQuery.location}
            onChange={(e) => handleSearchChange("location", e.target.value)}
            placeholder="Enter Location"
            className="w-full py-5 pl-16 pr-4 text-lg outline-none text-gray-700"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-[#7263F3] hover:bg-[#7263F3]/90 text-white font-semibold text-lg px-10 py-4 rounded-full ml-4 mr-4"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
