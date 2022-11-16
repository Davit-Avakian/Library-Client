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

// Get all genres
export const getGenres = async (token) => {
  const {
    data: { data }
  } = await axios.get(`${process.env.REACT_APP_BASE_URL}/genres`, getHeader(token));

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
export const getAuthors = async (
  token,
  sortBy = "first_name",
  sortType = "asc",
  gender = "all",
  offset = 0
) => {
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
export const getPublishers = async (
  token,
  sortBy = "establishment_date",
  sortType = "asc",
  address = "all",
  offset = 0
) => {
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

// Add request
export const addRequest = async (token, data, pathname) => {
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/${pathname}`, data, getHeader(token));
  } catch (error) {
    console.log(error.response.data.message);
  }
};

// request header
const getHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};
