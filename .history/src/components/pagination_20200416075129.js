import React from "react"
import { Link } from "gatsby"

const Pagination = ({ pageNumber, hasNextPage }) => {
  let prevLink = null
  if (1 === pageNumber) {
    prevLink = `/`
  } else if (1 < pageNumber) {
    prevLink = `/pagina/${pageNumber - 1}`
  }

  let nextLink = null
  if (hasNextPage) {
    nextLink = `/pagina/${pageNumber + 1}`
  }

  return (
    <nav>
      <ul>
        {prevLink && (
          <li>
            <Link to={prevLink}>Nieuwere Artikelen</Link>
          </li>
        )}
        {nextLink && (
          <li>
            <Link to={nextLink}>Oudere Artikelen</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
