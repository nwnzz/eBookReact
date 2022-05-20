import React, { useState, useEffect } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { Rating } from "react-simple-star-rating";
import ToggleSwitch from "../../ReUsableComponent/ToggleSwitch/ToggleSwitch";

const GenreOptions = [
  { label: "Fantasy", value: "Fantasy" },
  { label: "Literary", value: "Literary" },
  { label: "Mystery", value: "Mystery" },
  { label: "Non-Fiction", value: "Non-Fiction" },
  { label: "Science Fiction", value: "Science Fiction" },
  { label: "Thriller", value: "Thriller" },
];
const colourStyles = {
  menuList: (styles) => ({
    ...styles,
    background: "#fff",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused
      ? "hsla(291, 64%, 42%, 0.5)"
      : isSelected
      ? "hsla(291, 64%, 42%, 1)"
      : undefined,
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
  }),
};
const EditeBookForm = (props) => {
  const [book, setBook] = useState(props.currentBook);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setBook({ ...book, [name]: value });
  };
  const [review, setReview] = useState(0);
  let [favorite, setFavorite] = useState(false);
  const handleReview = (rate) => {
    setReview(rate);
    let r = 0;
    if (rate === 20) r = 1;
    if (rate === 40) r = 2;
    if (rate === 60) r = 3;
    if (rate === 80) r = 4;
    if (rate === 100) r = 5;
    setBook({ ...book, Review: r });
  };

  const handleGenre = (selectedOptions) => {
    setBook({ ...book, Genre: selectedOptions.value });
  };
  const handleSwitch = (isFav) => {
    setFavorite(isFav);
    setBook({ ...book, Favorite: isFav });
  };

  const submitForm = (event) => {
    event.preventDefault();

    props.updateBook(book.id, book);
  };

  useEffect(() => {
    setFavorite(props.currentBook.Favorite);
    setBook(props.currentBook);
  }, [props]);

  return (
    <div className="row">
      <form className="col s12" onSubmit={submitForm}>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="text"
              id={book.id}
              name="Title"
              value={book.Title}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="name"></label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input
              type="text"
              name="Author"
              value={book.Author}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="Author"></label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            {book.Genre}
            <Select
              placeholder="Select Genre"
              value={book.Genre}
              options={GenreOptions}
              defaultValue={book.Genre}
              onChange={handleGenre}
              styles={colourStyles}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <Rating
              onClick={handleReview}
              ratingValue={review}
              showTooltip={true}
              initialValue={book.Review}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="Favorite">Favorite</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <ToggleSwitch
              id="newsletter"
              checked={favorite}
              onChange={handleSwitch}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m6">
            <button className="waves-effect waves-light btn">Update</button>
          </div>

          <div className="input-field col s12 m6">
            <button
              className="waves-effect waves-light btn"
              onClick={() => props.setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditeBookForm;
