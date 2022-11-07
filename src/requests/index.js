import axios from "axios";

// Register new user
export const registerNewUser = async (newUser) => {
  const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, newUser);

  return data;
};

// Login user
export const login = async (userDetails) => {
  const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, userDetails);

  return data;
};

// Get all books sorted and filtered
export const getBooks = async (token, sortBy, sortType, selectedGenres, offset) => {
  try {
    // request all data
    const { data } = await axios.get(
      `${
        process.env.REACT_APP_BASE_URL
      }/books?sortBy=${sortBy}&sortType=${sortType}&genres=${selectedGenres.join(
        ","
      )}&offset=${offset}`,
      getHeader(token)
    );

    // return fetched data
    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

// Get all authors sorted and filtered
export const getAuthors = async (token, sortBy, sortType, gender, offset) => {
  try {
    // request all data
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/authors?sortBy=${sortBy}&sortType=${sortType}&gender=${gender}&offset=${offset}`,
      getHeader(token)
    );

    // return fetched data
    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

// Get all publishers sorted and filtered
export const getPublishers = async (token, sortBy, sortType, address, offset) => {
  try {
    // request data
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/publishers?sortBy=${sortBy}&sortType=${sortType}&address=${address}&offset=${offset}`,
      getHeader(token)
    );

    // return fetched data
    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

// Delete request
export const deleteRequest = async (token, id, pathname) => {
  const yes = confirm("Are you sure you want to delete?");

  if (!yes) return;

  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/${pathname}/${id}`, getHeader(token));

    return "Deleted successfully";
  } catch (error) {
    console.log(error);
  }
};

// request header
export const getHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};
