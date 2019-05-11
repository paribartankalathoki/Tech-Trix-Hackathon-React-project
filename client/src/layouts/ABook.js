import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ABook extends Component {
  render() {
    return (
      <div className="card">
        <img
          className="card-img-top"
          src="img/writers/2.jpg"
          alt=""
        />

        <div className="card-body">
          <h4 className="card-title">
            <strong>Book title</strong>
          </h4>

          <h5>Writer: NameofWriter</h5>
          <hr />
          <Link to="/User/:Id">
            <strong>Author-Name</strong>
          </Link>

          <p className="card-text">
            {" "}
            Description by the poster and bla bla in short to be seen
            here.Actually content is a little longer so More Details will take
            to the detail page.
          </p>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            <div className="d-flex justify-content-around">
              <div className="p-2">
                <span>
                  {" "}
                  <i className="far fa-2x fa-comment " /> 54
                </span>{" "}
                Comments
              </div>
              <Link to="/View/:Id">
                <div className="p-2">
                  <div className="btn btn-secondary btn-info">Details</div>
                </div>
              </Link>
            </div>
          </small>
        </div>
      </div>
    );
  }
}
