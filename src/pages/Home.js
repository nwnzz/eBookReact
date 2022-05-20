import React, { Component } from "react";
import qs from "querystring";

import api from "../services/api";

import Ebookdisplay from "../components/main/eBookDisplay";
import AddeBookForm from "../components/crudForm/addeBook";
import EditeBookForm from "../components/crudForm/editeBook";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      currentBook: { id: null, Title: "", Author: "" },
      editing: false,
    };
  }

  componentDidMount() {
    this.refreshBookTable();
  }

  refreshBookTable() {
    this.eBooksData = api
      .get("api")
      .then((response) => response.data)
      .then((data) => {
       
        this.setState({
          books: data.data,
          setBooks: data.data,
        });
      });
  }

  addBook = (book) => {
    api.post("api", qs.stringify(book)).then((res) => {
      this.refreshBookTable();
    });
  };

  deleteBook = (id) => {
    api.delete(`api/${id}`).then((res) => {
      this.refreshBookTable();
    });
  };

  updateBook = (id, book) => {
    api.put(`api/${id}`, qs.stringify(book)).then((res) => {
      this.refreshBookTable();
    });

    this.setState({
      currentBook: {
        id: null,
        Title: "",
        Author: "",
        Genre: "",
        Review: "",
        Favorite: "",
      },
    });

    this.setEditing(false);
  };

  editRow = (ebook) => {
    this.setState({
      currentBook: {
        id: ebook.id,
        Title: ebook.Title,
        Author: ebook.Author,
        Genre: ebook.Genre,
        Review: ebook.Review,
        Favorite: ebook.Favorite,
      },
    });

    this.setEditing(true);
  };

  setEditing = (isEditing) => {
    this.setState({ editing: isEditing });
  };

  render() {
    const { books } = this.state;

    return (
      <div className="container">
        <div className="boxStyle1">
          <div className="row">
            {this.state.editing ? (
              <div className="col s12 l6">
                <h4>Edit eBook</h4>
                <EditeBookForm
                  editing={this.state.editing}
                  setEditing={this.setEditing}
                  currentBook={this.state.currentBook}
                  updateBook={this.updateBook}
                />
              </div>
            ) : (
              <div className="col s12 l6">
                <h4>Add eBook</h4>
                <AddeBookForm addBook={this.addBook} />
              </div>
            )}

            <div className="col s12 l6">
              <h5>eBooks</h5>
              <Ebookdisplay
                ebooks={books}
                editRow={this.editRow}
                deleteBook={this.deleteBook}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
