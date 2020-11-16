import React from 'react'

const Search = ({ onSearch, search }) => (
  // Changed search input form uncontrolled input to controlled input to be able to use it in calculating derived state
  <div className="p-b-1">
    <input
      type="search"
      className="form-control"
      placeholder="Søg brugere"
      value={search}
      onChange={onSearch} />
  </div>
)

export default Search
