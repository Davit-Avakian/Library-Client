import styled from "styled-components";

export const LoginContainer = styled.div`
  background: -webkit-linear-gradient(left, #003366, #004080, #0059b3, #0073e6);

  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginFormContainer = styled.div`
  background-color: #fff;
  min-width: 40%;
  min-height: 60%;
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 15px 20px rgb(0 0 0 / 10%);

  h1 {
    background-color: transparent;
    width: 5rem;
    min-width: fit-content;
    margin: 0 auto;
    font-size: 35px;
  }

  @media (max-width: 1000px) {
    width: 80%;
  }

  @media (max-width: 550px) {
    width: 95%;
  }
`;

export const NavButtons = styled.div`
  background-color: transparent;
  width: 80%;
  margin: 1rem auto;
  display: flex;
  justify-content: center;
`;

export const NavLogin = styled.button`
  background: ${({ register }) =>
    register ? "transparent" : "-webkit-linear-gradient(left, #003366, #004080, #0059b3, #0073e6)"};
  color: ${({ register }) => (register ? "black" : "#ffff")};
  height: 70%;
  width: 30%;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 48px;
  margin-right: 0.5rem;
  cursor: pointer;

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

export const NavSignup = styled(NavLogin)`
  background: ${({ register }) =>
    !register
      ? "transparent"
      : "-webkit-linear-gradient(left, #003366, #004080, #0059b3, #0073e6)"};
  color: ${({ register }) => (!register ? "black" : "#ffff")};
`;

export const LoginForm = styled.form`
  background-color: transparent;
  width: 100%;
  height: ${({ register }) => (register ? "300px" : "250px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    background-color: transparent;
    height: 35%;
    width: 50%;
    outline: none;
    padding-left: 15px;
    margin: 1.5rem 0;
    border-radius: 15px;
    border: 1px solid lightgrey;
    border-bottom-width: 2px;
    font-size: 1.2rem;

    @media (max-width: 500px) {
      font-size: 1rem;
    }
  }

  button {
    cursor: pointer;
    background: -webkit-linear-gradient(left, #003366, #004080, #0059b3, #0073e6);

    width: 40%;
    height: 35%;
    border-radius: 10px;
    color: #ffff;
    font-size: 1.1rem;
  }

  select {
    width: 40%;
    height: 300px;
  }
`;

export const ErrorMessage = styled.p`
  background-color: transparent;
  color: red;
  font-size: 1.2rem;
  margin-top: 1.2rem;
  margin-left: 13rem;
`;

export const SuccessMessage = styled(ErrorMessage)`
  color: lightgreen;
  font-size: 1.5rem;
  margin-left: 18rem;
`;
