import React, { useState, useContext, useEffect, useRef } from "react";
import { addRequest, getAuthors, getGenres, getPublishers } from "../../requests";
import { AuthContext } from "../Contexts/AuthContextProvider";
import { AddForm, PopupContainer } from "./index.styles";

/**
 *  Creates Popup component
 *  @returns {component} Popup Component for adding new items
 *  @param {function} setShowPopup function for hiding popup
 *  @param {string} type for showing popup type
 */
const PopUp = ({ setShowPopup, type }) => {
  // ref for main container
  const popupRef = useRef(null);

  // stores all genres for adding book
  const [genres, setGenres] = useState([]);

  // stores all genres for adding book
  const [authors, setAuthors] = useState([]);

  // stores publishers for adding book
  const [publishers, setPublishers] = useState([]);

  // stores all selected data
  const [formData, setFormData] = useState({});

  // gets token from context
  const { token } = useContext(AuthContext);

  const closePopup = (e) => {
    if (popupRef.current.contains(e.target)) {
      return;
    }

    setShowPopup(false);
  };

  useEffect(() => {
    document.addEventListener("click", closePopup);

    (async () => {
      if (type === "Book") {
        const { data } = await getAuthors(token);
        const { data: publishers } = await getPublishers(token);
        setGenres(await getGenres(token));
        setAuthors(data);
        setPublishers(publishers);
      }
    })();

    return () => document.removeEventListener("click", closePopup);
  }, []);

  return (
    <PopupContainer ref={popupRef}>
      <h2>Add {type}</h2>

      {type === "Book" ? (
        <AddForm
          onSubmit={async (e) => {
            e.preventDefault();
            const { title, genre_ids, author_id, publisher_id } = formData;

            if (!title || !genre_ids || !author_id || !publisher_id) return;
            try {
              await addRequest(token, formData, "books");
              setShowPopup(false);
            } catch (error) {
              console.log(error);
            }
          }}>
          <input
            placeholder="Title"
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          />
          <select
            multiple
            onChange={(e) => {
              const { selectedOptions } = e.target;
              const newSelectedGenres = [];

              Array.from(selectedOptions).map((option) => {
                newSelectedGenres.push(option.dataset.value);
              });

              setFormData((prev) => ({ ...prev, genre_ids: newSelectedGenres }));
            }}>
            {genres.map(({ id, name }) => {
              return (
                <option key={id} data-value={id}>
                  {name}
                </option>
              );
            })}
          </select>

          <select
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                author_id: e.target.selectedOptions[0].dataset.value
              }));
            }}>
            {authors.map(({ id, first_name }) => {
              return (
                <option key={id} data-value={id}>
                  {first_name}
                </option>
              );
            })}
          </select>

          <select
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                publisher_id: e.target.selectedOptions[0].dataset.value
              }));
            }}>
            {publishers.map(({ id, name }) => {
              return (
                <option key={id} data-value={id}>
                  {name}
                </option>
              );
            })}
          </select>

          <button>Submit</button>
        </AddForm>
      ) : type === "Author" ? (
        <AddForm
          onSubmit={async (e) => {
            e.preventDefault();
            const { firstName, lastName, gender, birthYear, privateKey } = formData;

            if (!firstName || !lastName || !gender || !birthYear || !privateKey) return;

            await addRequest(token, formData, "authors");

            setShowPopup(false);
          }}>
          <input
            placeholder="First Name"
            onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
          />
          <input
            placeholder="Last Name"
            onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
          />
          <select onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}>
            <option>male</option>
            <option>female</option>
          </select>
          <input
            placeholder="Birth Year"
            onChange={(e) => setFormData((prev) => ({ ...prev, birthYear: e.target.value }))}
          />
          <input
            placeholder="Private Key"
            onChange={(e) => setFormData((prev) => ({ ...prev, privateKey: e.target.value }))}
          />
          <button>Submit</button>
        </AddForm>
      ) : (
        <AddForm
          onClick={async (e) => {
            e.preventDefault();
            const { name, address, establishment_date } = formData;

            if (!name || !address || !establishment_date) return;

            await addRequest(token, formData, "publishers");
            setShowPopup(false);
          }}>
          <input
            placeholder="Name"
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          />
          <input
            placeholder="Address"
            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
          />
          <label htmlFor="date">Establishment Date:</label>
          <input
            id="date"
            type={"date"}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, establishment_date: e.target.value }))
            }
          />
          <input
            placeholder="Private Key"
            onChange={(e) => setFormData((prev) => ({ ...prev, private_key: e.target.value }))}
          />
          <button>Submit</button>
        </AddForm>
      )}
    </PopupContainer>
  );
};

export default PopUp;
