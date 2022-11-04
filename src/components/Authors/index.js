import React, { useContext, useEffect, useState } from "react";
import { deleteRequest, getAuthors } from "../../requests";
import { AuthContext } from "../Contexts/AuthContextProvider";
import Pagination from "../Pagination";
import {
  DeleteButton,
  FilterContainer,
  FilterDetails,
  ItemTitle,
  ListContainer,
  ListItem,
  NotFound,
  SearchButton,
  SortContainer,
  SortDetials,
  SortFilterContainer
} from "../SharedComponents/index.styles";
import { AuthorsContainer } from "./index.styles";
import deleteImg from "../../assets/images/deleteImage.png";

/**
 *  Creates Authors component
 *  @returns {component} Authors Component shows authors and sorting bar
 */
const Authors = () => {
  // stores fetched authors in an array
  const [authors, setAuthors] = useState([]);

  // stores author field for sorting
  const [sortBy, setSortBy] = useState("birth_year");

  // stores asc or desc for sorting
  const [sortType, setSortType] = useState("asc");

  // stores gender for filtering
  const [gender, setGender] = useState("all");

  // stores current page number
  const [currentPage, setCurrentPage] = useState(1);

  // stores offset value
  const [offset, setOffset] = useState(0);

  // stores total count for paginations
  const [totalCount, setTotalCount] = useState(null);

  // gets token and role from context
  const { token, role } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      // fetches sorte and filtered data with total count
      const { data, count } = await getAuthors(token, sortBy, sortType, gender, offset);

      // saves data and total count in state
      setAuthors(data);
      setTotalCount(count);
    })();
  }, [currentPage]);

  return (
    <AuthorsContainer>
      <SortFilterContainer>
        <SortContainer>
          <h2>Sort</h2>

          <SortDetials>
            <div>
              <span>Sort By: </span>
              <select onChange={(e) => setSortBy(e.target.value)}>
                <option>birth_year</option>
                <option>first_name</option>
              </select>
            </div>

            <div>
              <span>Sort Type: </span>
              <select
                onChange={(e) => {
                  const { value } = e.target;
                  if (value === "Ascending") {
                    setSortType("asc");
                    return;
                  }

                  setSortType("desc");
                }}>
                <option>Ascending</option>
                <option>Descending</option>
              </select>
            </div>
          </SortDetials>
        </SortContainer>

        <FilterContainer>
          <h2>Filter</h2>

          <FilterDetails>
            <div>
              <div>
                <span>Gender:</span>
                <select
                  onChange={(e) => {
                    setCurrentPage(1);
                    setOffset(0);

                    setGender(e.target.value);
                  }}>
                  <option>all</option>
                  <option>male</option>
                  <option>female</option>
                </select>
              </div>
            </div>
          </FilterDetails>
        </FilterContainer>

        <SearchButton
          onClick={async () => {
            const { data, count } = await getAuthors(token, sortBy, sortType, gender, currentPage);

            setAuthors(data);
            setTotalCount(count);
          }}>
          Search
        </SearchButton>
      </SortFilterContainer>

      <div style={{ width: "100%" }}>
        <ListContainer>
          {authors.length ? (
            authors.map(({ id, first_name, last_name, gender, birth_year }) => {
              return (
                <ListItem key={id}>
                  {role === "publisher" && (
                    <DeleteButton
                      src={deleteImg}
                      onClick={async () => {
                        const message = await deleteRequest(token, id, "authors");

                        if (message) {
                          setAuthors((prev) => prev.filter((author) => author.id !== id));

                          setTimeout(() => {
                            alert(message);
                          }, 200);
                        }
                      }}
                    />
                  )}
                  <div>
                    <ItemTitle>first name: {first_name}</ItemTitle>
                    <span>last_name: {last_name}</span>
                    <span>gender: {gender}</span>

                    <span>birth year: {birth_year}</span>
                  </div>
                </ListItem>
              );
            })
          ) : (
            <NotFound>No Authors Found</NotFound>
          )}
        </ListContainer>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalCount={totalCount}
          setOffset={setOffset}
        />
      </div>
    </AuthorsContainer>
  );
};

export default Authors;
