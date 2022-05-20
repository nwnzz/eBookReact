import React from "react";
const myLoopFunction = () => {
  var myArray = [];
  var i;
  for (i = 0; i < 4; i++) {
    myArray[i] = <span class="material-icons md-24">star</span>;
  }
  return myArray;
};
const Ebookdisplay = (props) => (
  <table className="responsive-table table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Genre</th>
        <th>Review</th>
        <th>Favorite</th>
      </tr>
    </thead>
    <tbody>
      {props.ebooks.length > 0 ? (
        props.ebooks.map((book) => (
          <tr key={book.id}>
            <td>{book.Title}</td>
            <td>{book.Author}</td>
            <td>{book.Genre}</td>
            <td>
              {book.Review == 1 ? (
                <p>
                  <span class="material-icons md-10">star</span>
                </p>
              ) : book.Review == 2 ? (
                <p>
                  <span class="material-icons md-10">star</span>
                  <span class="material-icons md-10">star</span>
                </p>
              ) : book.Review == 3 ? (
                <p>
                  <span class="material-icons md-10">star</span>
                  <span class="material-icons md-10">star</span>
                  <span class="material-icons md-10">star</span>
                </p>
              ) : book.Review == 4 ? (
                <p>
                  <span class="material-icons md-10">star</span>
                  <span class="material-icons md-10">star</span>
                  <span class="material-icons md-10">star</span>
                  <span class="material-icons md-10">star</span>
                </p>
              ) : (
                <p>
                  <span class="material-icons md-10">star</span>
                  <span class="material-icons md-10">star</span>
                  <span class="material-icons md-10">star</span>
                  <span class="material-icons md-10">star</span>
                  <span class="material-icons md-10">star</span>
                </p>
              )}
            </td>
            <td>
              {book.Favorite ? (
                <span class="material-icons md-24">favorite</span>
              ) : (
                "N/A"
              )}
            </td>
            <td className="center-align">
              <button
                className="waves-effect waves-light btn-small"
                onClick={() => props.editRow(book)}
              >
                <span class="material-icons md-24">edit</span>
              </button>

              <button
                className="waves-effect waves-light btn-small red darken-4"
                onClick={() => props.deleteBook(book.id)}
              >
                <span class="material-icons md-24">delete</span>
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>{props.ebooks[0]} No eBooks</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default Ebookdisplay;
