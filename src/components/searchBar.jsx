import React, { Component } from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <input
        type="text"
        name="query"
        className="form-control my-3"
        id="searchParam"
        placeholder="Search..."
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBar;
