import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PreviousPost extends Component {
  render() {
    return (
      <div className="card mb-3 mt-5">
        <div className="row no-gutters">
          <div className="col-md-8 ">
            <div className="card-body ">
              <h3 className="card-title">Book Name</h3>
              <h5 className="">Writer: Writer Name</h5>
              <span>
                Posted-by:
                <a href="#top">
                  <strong>Author-Name</strong>
                </a>
              </span>
              <hr />
              <div className="clearfix" />
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longe Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Quas, cumque laborum earum ullam dolore harum ab quae ratione
                nulla deserunt autem deleniti, magnam necessitatibus similique
                amet sint iure numquam eaque!
              </p>
              <hr />
              <p className="card-text">
                <small className="text-muted">Posted 2 days ago</small>
              </p>
            </div>
            <Link to="/view/:id" className="btn btn-outline-info ml-3 mb-3">
              <i className="fa fa-eye " /> View
            </Link>
            <Link
              to="/Editpost/:postId"
              className="btn btn-outline-primary ml-3 mb-3"
            >
              <i className="fa fa-edit " /> Edit
            </Link>
            <a href="#top" className="btn btn-outline-danger ml-3 mb-3">
              <i className="fa fa-trash " /> Delete
            </a>
          </div>

          <div className="col-md-4">
            <img
              src="https://dummyimage.com/100/"
              className="card-img"
              alt="..."
            />
          </div>
        </div>
      </div>
    );
  }
}
