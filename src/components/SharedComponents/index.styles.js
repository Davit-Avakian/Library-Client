import styled from "styled-components";

export const SortFilterContainer = styled.div`
  background-color: transparent;
  min-width: 15%;
  height: fit-content;
  padding: 2rem 0;
  border: 1px solid black;
  border-radius: 0.4rem;
  margin-top: 2.5rem;
  margin-left: 3rem;

  h2 {
    border-bottom: 1px solid black;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 600px) {
    padding: 0;
    margin-left: 1rem;
  }
`;

export const SortContainer = styled.div`
  padding: 1rem;

  div {
    margin-bottom: 2rem;
  }
`;

export const SortDetials = styled.div`
  div {
    select {
      width: 70%;
      margin-left: 1rem;
      margin-top: 0.5rem;
      padding: 0.5rem;
      border: none;

      option {
        padding: 1rem;
      }
    }
  }
`;

export const FilterContainer = styled.div`
  padding: 1rem;
`;

export const FilterDetails = styled.div`
  select {
    width: 70%;
    margin-left: 1rem;
    margin-top: 0.5rem;
    padding: 0.5rem;
    border: none;

    option {
      padding: 1rem;
    }
  }

  div {
    span {
      display: block;
    }
  }

  @media (max-width: 600px) {
    select {
      width: 100%;
      margin-left: 0;
      padding: 0;
    }
  }
`;

export const SearchButton = styled.button`
  cursor: pointer;
  border: none;
  width: 70%;
  background-color: lightgreen;
  border-radius: 10px;
  padding: 1rem;
  margin-left: 2rem;
  margin-top: 1rem;
`;

export const ListContainer = styled.div`
  width: 100%;
  margin-top: 2rem;

  display: flex;
  flex-wrap: wrap;
  gap: 5%;

  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

export const ListItem = styled.div`
  position: relative;
  padding: 1rem 0;

  height: 300px;
  width: 250px;
  border: 1px solid black;
  border-radius: 1rem;
  margin-bottom: 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    display: block;
    margin-top: 1rem;
    font-size: 1.1rem;
  }

  @media (max-width: 500px) {
    height: 250px;
    width: 200px;
  }
`;

export const ItemTitle = styled.h2`
  margin-bottom: 3rem;
`;

export const DeleteButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1rem;
`;

export const NotFound = styled.span`
  width: 250px;
  margin: 4rem auto;
  font-size: 2rem;

  @media (max-width: 500px) {
    width: 150px;
    font-size: 1rem;
  }
`;
