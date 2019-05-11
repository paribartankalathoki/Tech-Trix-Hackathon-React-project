import React, { Component } from "react";
import ABook from "./ABook";
import Footer from "./Footer";


export default class BookList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="book-banner">
          <div className="container">
            <div className="card-columns">
              <ABook />
              <ABook />
              <ABook />
              <ABook />
              <ABook />
              <ABook />
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
