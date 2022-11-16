import styled from "styled-components";

export const Logo = styled.h2`
  cursor: pointer;
  background-color: #ebebeb;
  font-size: 2.5rem;
  margin-left: 1rem;
`;

export const NavContainer = styled.div`
  background-color: #ebebeb;

  a {
    background-color: #ebebeb;
    font-size: 1.5rem;
    margin-right: 1.5rem;
    color: black;
    text-decoration: none;
    padding-bottom: 0.3rem;
  }
`;

export const Logout = styled.span`
  margin-right: 1rem;
  font-size: 1.3rem;
`;

export const HeaderContainer = styled.div`
  background-color: #ebebeb;
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    ${Logo} {
      font-size: 1.5rem;
    }

    ${Logout} {
      font-size: 1rem;
    }

    ${NavContainer} a {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 500px) {
    justify-content: space-around;

    ${Logo} {
      display: none;
    }
  }
`;
