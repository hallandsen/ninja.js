import React from 'react'

const Page = ({ pageNumber, currentPageNumber, onChange }) => {
  // I prefer to have the below two values as const instead of functions.
  // Had their definition been used might complex I might have kept them as functions
  const isActivePage = pageNumber === currentPageNumber
  const renderedPageNumber = pageNumber + 1

  const click = (event) => {
    event.preventDefault()
    onChange(pageNumber)
  }
  // introduced conditional classnames instead of having duplicate markup.
  return (
    <li className="page-item mr-1">
      <button className={`page-link ${ isActivePage && 'button-outline'}`} onClick={click} >{renderedPageNumber}</button>
    </li>
  )
}


export default Page
