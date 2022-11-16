import styled from "styled-components";

export const PopupContainer = styled.div`
  background-color: #d4d4d4;
  border-radius: 0.3rem;
  color: #ffff;
  font-size: 1.2rem;
  height: fit-content;
  left: 50%;
  padding: 1rem;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  z-index: 1;
  min-width: 300px;
`;

export const AddForm = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1rem 0;

  input,
  button {
    border-radius: 0.2rem;
    border: none;
    padding: 0.4rem;
    width: 70%;
  }

  button {
    background-color: lightgreen;
    cursor: pointer;
    padding: 0.8rem;
  }

  select {
    padding: 0.3rem;
    width: 70%;
    option {
      padding: 0.4rem;
    }
  }
`;
