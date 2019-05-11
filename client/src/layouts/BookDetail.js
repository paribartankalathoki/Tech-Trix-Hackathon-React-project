import React, { Component } from "react";

import Comments from "./Comment";
import BookInfo from "./BookInfo";


export default class BookDetail extends Component {
  render() {
    return (
      <React.Fragment>
        <BookInfo />

        <h2 className="m-5 mb-4">Recent Comments</h2>

        <Comments />
        <Comments />
        <Comments />
      </React.Fragment>
    );
  }
}
