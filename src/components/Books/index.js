import React, { useContext, useEffect, useState } from "react";
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
import { BooksContainer } from "./index.styles";
import axios from "axios";
import { getHeader, getBooks, deleteRequest } from "../../requests";
import Pagination from "../Pagination";
import { AuthContext } from "../Contexts/AuthContextProvider";
import deleteImg from "../../assets/images/deleteImage.png";

/**
 *  Creates Books component
 *  @returns {component} Books Component shows books and sorting bar
 */
const Books = () => {
  // stores fetched books in an array
  const [books, setBooks] = useState([]);

  // stores all fetched genres in an array
  const [genres, setGenres] = useState([]);

  // stores all selected genres by user
  const [selectedGenres, setSelectedGenres] = useState([]);

  // stores book field for sorting
  const [sortBy, setSortBy] = useState("rating");

  // stores acs or desc for sorting
  const [sortType, setSortType] = useState("asc");

  // stores current page number
  const [currentPage, setCurrentPage] = useState(1);

  // stores offset value
  const [offset, setOffset] = useState(0);

  // stores total count of data for pagination
  const [totalCount, setTotalCount] = useState(null);

  // gets token and role from context
  const { token, role } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        // fetches all genres
        const {
          data: { data: allGenres }
        } = await axios.get(`${process.env.REACT_APP_BASE_URL}/genres`, getHeader(token));

        const genresObj = allGenres.reduce((acc, curr) => {
          acc[curr.id] = curr.name;
          return acc;
        }, {});

        setGenres(genresObj);

        // fetches all books sorted and filtered
        const { data, count } = await getBooks(token, sortBy, sortType, selectedGenres, offset);

        // saves fetched data and total count in state
        setBooks(data);
        setTotalCount(count);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // fetches all books sorted and filtered
      const { data } = await getBooks(token, sortBy, sortType, selectedGenres, offset);

      // saves fetched data in state
      setBooks(data);
    })();
  }, [currentPage]);

  return (
    <BooksContainer>
      <SortFilterContainer>
        <SortContainer>
          <h2>Sort</h2>

          <SortDetials>
            <div>
              <span>Sort By: </span>
              <select onChange={(e) => setSortBy(e.target.value)}>
                <option>rating</option>
                <option>publish_date</option>
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
                <span>Genres:</span>
                <select
                  multiple
                  onChange={(e) => {
                    const { selectedOptions } = e.target;
                    const newSelectedGenres = [];

                    Array.from(selectedOptions).map((option) => {
                      newSelectedGenres.push(option.dataset.value);
                    });

                    setCurrentPage(1);
                    setOffset(0);
                    setSelectedGenres(newSelectedGenres);
                  }}>
                  {Object.values(genres).map((genre, index) => {
                    return (
                      <option key={genre} data-value={Object.keys(genres)[index]}>
                        {genre}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </FilterDetails>
        </FilterContainer>

        <SearchButton
          onClick={async () => {
            const { data, count } = await getBooks(
              token,
              sortBy,
              sortType,
              selectedGenres,
              currentPage
            );

            setBooks(data);
            setTotalCount(count);
          }}>
          Search
        </SearchButton>
      </SortFilterContainer>

      <div style={{ width: "100%" }}>
        <ListContainer>
          {books.length ? (
            books.map(({ id, title, rating, genre_ids, publish_date }) => {
              return (
                <ListItem key={id}>
                  {role === "publisher" && (
                    <DeleteButton
                      src={deleteImg}
                      onClick={async () => {
                        const message = await deleteRequest(token, id, "books");

                        if (message) {
                          setBooks((prev) => prev.filter((book) => book.id !== id));

                          setTimeout(() => {
                            alert(message);
                          }, 200);
                        }
                      }}
                    />
                  )}
                  <div>
                    <ItemTitle>title: {title}</ItemTitle>
                    <span>rating: {rating}</span>
                    <span>
                      genres:{" "}
                      {genre_ids.map((genre) => (
                        <span key={genre}>{genres[genre]}</span>
                      ))}
                    </span>

                    <span>date: {new Date(publish_date).toDateString()}</span>
                  </div>
                </ListItem>
              );
            })
          ) : (
            <NotFound>No Books Found</NotFound>
          )}
        </ListContainer>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalCount={totalCount}
          setOffset={setOffset}
        />
      </div>
    </BooksContainer>
  );
};

export default Books;
