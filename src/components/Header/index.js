import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { HeaderContainer, Logo, NavContainer, Logout } from "./index.styles";

/**
 *  Creates Header component
 *  @returns {component} Header Component displays navigation bar and logout button
 */
const Header = () => {
  // take token and setToken from context
  const { token, setToken } = useContext(AuthContext);

  return (
    token && (
      <HeaderContainer>
        <Logo>Library</Logo>

        <NavContainer>
          <NavLink
            to={"/books"}
            style={({ isActive }) => (isActive ? { borderBottom: "3px solid black" } : {})}>
            Books
          </NavLink>
          <NavLink
            to={"/authors"}
            style={({ isActive }) => (isActive ? { borderBottom: "3px solid black" } : {})}>
            Authors
          </NavLink>
          <NavLink
            to={"/publishers"}
            style={({ isActive }) => (isActive ? { borderBottom: "3px solid black" } : {})}>
            Publisher
          </NavLink>
        </NavContainer>

        <NavLink to={"/"} style={{ textDecoration: "none", color: "black" }}>
          <Logout onClick={() => setToken(null)}>Logout</Logout>
        </NavLink>
      </HeaderContainer>
    )
  );
};

export default Header;
