import styled from "styled-components";

export const PaginationContainer = styled.nav`
  height: 50px;
  margin: 2rem auto;
  width: 10%;
`;

export const Numbers = styled.ul`
  display: flex;
  width: 100%;

  list-style: none;

  li {
    cursor: pointer;
    border: 1px solid #2f758c;
    width: 50px;
    height: 50px;
    color: #2f758c;
    padding: 1rem;
    font-size: 1.4rem;
    margin-right: 0.1rem;

    &:hover {
      background-color: #d8e0e2;
    }

    a {
      width: 100%;
      height: 100%;
    }
  }
`;
