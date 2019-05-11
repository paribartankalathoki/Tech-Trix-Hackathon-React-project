import React, { Component } from "react";

export default class ExchangePost extends Component {
  render() {
    return (
      <div className="card ">
        <article className="card-body">
          <h4 className="card-title mt-3 text-center">Post a Book Exchange</h4>

          <hr />

          <form>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-book" />{" "}
                </span>
              </div>
              <input
                name=""
                className="form-control"
                placeholder="Book Name"
                type="text"
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fas fa-feather-alt" />{" "}
                </span>
              </div>
              <input
                name=""
                className="form-control"
                placeholder="Writer name"
                type="text"
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-info-circle" />{" "}
                </span>
              </div>
              <textarea
                name=""
                className="form-control"
                placeholder="Description"
                type="text"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-info btn-block">
                Post
              </button>
            </div>
          </form>
        </article>
      </div>
    );
  }
}
