import React, { useState } from "react";
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
  menuList: styles => ({
      ...styles,
      background: '#fff'
  }),
  option: (styles, {isFocused, isSelected}) => ({
      ...styles,
      background: isFocused
          ? 'hsla(291, 64%, 42%, 0.5)'
          : isSelected
              ? 'hsla(291, 64%, 42%, 1)'
              : undefined,
      zIndex: 1
  }),
  menu: base => ({
      ...base,
      zIndex: 100
  })
  }
const AddeBookForm = (props) => {
  const initialFormState = {
    Title: "",
    Author: "",
    Genre: "",
    Review: "",
    Favorite: "",
  };
  const [book, setBook] = useState(initialFormState);
  const [review, setReview] = useState(0);
  let [favorite, setFavorite] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const handleReview = (rate) => {
    setReview(rate/20);
    setBook({ ...book, Review: rate/20 });
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
    if (!book.Title || !book.Author || !book.Genre || !book.Review) return;
    props.addBook(book);
    setBook(initialFormState);
  };

  return (
    <div className="row">
      <form className="col s12" onSubmit={submitForm}>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="text"
              id="Title"
              name="Title"
              value={book.Title}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="name">Title of Book</label>
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
            <label htmlFor="Author">Author</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <Select
              placeholder="Select Genre"
              options={GenreOptions}
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
          <div className="input-field col s12">
          <button className="waves-effect waves-light btn-large">Add eBook<i class="material-icons right">add</i></button>
            
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddeBookForm;
