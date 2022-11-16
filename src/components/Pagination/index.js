import React from "react";
import { Numbers, PaginationContainer } from "./index.styles";

/**
 *  Creates Pagination component
 *  @param {number} currentPage current page number
 *  @param {function} setCurrentPage function for changing currnet page value
 *  @param {number} totalCount total data count
 *  @param {function} setOffset function for changing offset value
 *  @returns {component} Pagination Component used for showing pages and navigating
 */
const Pagination = ({ currentPage, setCurrentPage, totalCount, setOffset }) => {
  // stores page numbers in array
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCount / 8); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      <Numbers>
        {pageNumbers.map((number) => (
          <li
            onClick={() => {
              if (number < currentPage) {
                setOffset((prev) => prev - 8);
              } else {
                setOffset((prev) => prev + 8);
              }

              setCurrentPage(number);
            }}
            key={number}
            style={{ backgroundColor: `${currentPage === number ? "lightblue" : ""}` }}>
            <a>{number}</a>
          </li>
        ))}
      </Numbers>
    </PaginationContainer>
  );
};

export default Pagination;
