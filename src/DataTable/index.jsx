import React, { useState } from 'react'

import Pagination from './Pagination'
import Row from './Row'
import Search from './Search'

const calculateTotalNumberOfPages = (rows, rowsPerPage) => {
  if (rowsPerPage === 0) return 0
  return Math.ceil(rows.length / rowsPerPage)
}

const rowsInPageNumber = (pageNumber, rowsPerPage) => {
  const startIndex = pageNumber * rowsPerPage
  return [startIndex, startIndex + rowsPerPage]
}

export default function DataTable ({ rows, rowsPerPage = 40 }) {
  // I decided to only save the data that origins from user input to state, and let the rest be handled as derived state.
  // Specifically regarding rows data I also opted against saving props.rows in local state, because I prefer keeping the props.row as the single source of truth.
  const [currentPageNumber, setCurrentPageNumber] = useState(0)
  const [search, setSearch] = useState('')

  const handleSearch = (event) => {
    const text = event.target.value
    setSearch(text)
  }

  // If we have large data sets I would refactor this function using useMemo with dependencies on [rows, search]
  const filteredRows = rows.filter(({ name1, email }) => {
    // would have liked to use optional chaining ("name?.toLowerCase()") to null check below values - not supported in eslint config
    const nameMatch = name1 && name1.toLowerCase().includes(search.toLowerCase())
    const emailMatch = email && email.toLowerCase().includes(search.toLowerCase())
    return nameMatch || emailMatch
  })

  const totalNumberOfPages = calculateTotalNumberOfPages(filteredRows, rowsPerPage)

  const rowsToRender = filteredRows
    .slice( ...rowsInPageNumber(currentPageNumber, rowsPerPage))
    .map(row => <Row key={row.per_id} row={row} />)

  return (
    <div>
      <Search onSearch={handleSearch} search={search} />
      <table>
        <tbody>
          { rowsToRender }
        </tbody>
      </table>
      <Pagination
        currentPageNumber={currentPageNumber}
        totalNumberOfPages={totalNumberOfPages}
        onChange={setCurrentPageNumber} />
    </div>
  )
}
