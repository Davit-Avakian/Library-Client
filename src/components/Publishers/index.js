import React, { useContext, useEffect, useState } from "react";
import { deleteRequest, getPublishers } from "../../requests";
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
import Pagination from "..//Pagination";
import { PublishersContainer } from "./index.styles";
import { AuthContext } from "../Contexts/AuthContextProvider";
import deleteImg from "../../assets/images/deleteImage.png";

/**
 *  Creates Publishers component
 *  @returns {component} Publishers Component shows publishers and sorting bar
 */
const Publishers = () => {
  // stores all fetched publishers in an array
  const [publishers, setPublishers] = useState([]);

  // stores publisher field for sorting
  const [sortBy, setSortBy] = useState("name");

  // stores acs or desc for sorting
  const [sortType, setSortType] = useState("asc");

  // stores address for filtering
  const [address, setAddress] = useState("all");

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
      // fetches filtered and sorted data
      const { data, count } = await getPublishers(token, sortBy, sortType, address, offset);

      // saves data and total count in state
      setPublishers(data);
      setTotalCount(count);
    })();
  }, [currentPage]);

  return (
    <PublishersContainer>
      <SortFilterContainer>
        <SortContainer>
          <h2>Sort</h2>

          <SortDetials>
            <div>
              <span>Sort By: </span>
              <select onChange={(e) => setSortBy(e.target.value)}>
                <option>name</option>
                <option>establishment_date</option>
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
                <span>Address:</span>
                <select
                  onChange={(e) => {
                    setCurrentPage(1);
                    setOffset(0);
                    setAddress(e.target.value);
                  }}>
                  <option>all</option>
                  <option>address1</option>
                  <option>address2</option>
                  <option>address3</option>
                  <option>address4</option>
                </select>
              </div>
            </div>
          </FilterDetails>
        </FilterContainer>

        <SearchButton
          onClick={async () => {
            const { data, count } = await getPublishers(
              token,
              sortBy,
              sortType,
              address,
              currentPage
            );

            setPublishers(data);
            setTotalCount(count);
          }}>
          Search
        </SearchButton>
      </SortFilterContainer>

      <div style={{ width: "100%" }}>
        <ListContainer>
          {publishers.length ? (
            publishers.map(({ id, name, address, establishment_date }) => {
              return (
                <ListItem key={id}>
                  {role === "publisher" && (
                    <DeleteButton
                      src={deleteImg}
                      onClick={async () => {
                        const message = await deleteRequest(token, id, "publishers");

                        if (message) {
                          setPublishers((prev) => prev.filter((publisher) => publisher.id !== id));

                          setTimeout(() => {
                            alert(message);
                          }, 200);
                        }
                      }}
                    />
                  )}
                  <div>
                    <ItemTitle>name: {name}</ItemTitle>
                    <span>address: {address}</span>
                    <span>
                      establishment date: <span>{new Date(establishment_date).toDateString()}</span>
                    </span>
                  </div>
                </ListItem>
              );
            })
          ) : (
            <NotFound>No Publishers Found</NotFound>
          )}
        </ListContainer>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalCount={totalCount}
          setOffset={setOffset}
        />
      </div>
    </PublishersContainer>
  );
};

export default Publishers;
