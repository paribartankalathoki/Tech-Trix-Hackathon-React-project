import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Comment extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="card mt-4 mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  <img
                    src="https://image.ibb.co/jw55Ex/def_face.jpg"
                    className="img img-rounded img-fluid"
                    alt=""
                  />
                </div>
                <div className="col-md-10">
                  <span>
                    <div className="float-left" href="">
                      <Link to="/user/:id">
                        <strong>User 701</strong>
                      </Link>
                    </div>
                  </span>

                  <span className="card-text float-right">
                    <small className="text-muted">3 mins ago</small>
                  </span>
                  <div className="clearfix" />
                  <hr />
                  <p>
                    Lorem Ipsum is simply dummy text of the pr make but also the
                    leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release
                    of
                  </p>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1" />
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      />
                    </div>
                    <a
                      href="#top"
                      className="float-right btn btn-outline-primary ml-2 "
                    >
                      {" "}
                      <i className="fa fa-reply " /> Reply
                    </a>

                </div>
              </div>
              <div className="card card-inner mt-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-2">
                      <img
                        src="https://image.ibb.co/jw55Ex/def_face.jpg"
                        className="img img-rounded img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="col-md-10">
                      <span>
                        <a href="#top" className="float-left">
                          <strong>Padante Kti Moh</strong>
                        </a>
                      </span>

                      <span className="card-text float-right">
                        <small className="text-muted">1 mins ago</small>
                      </span>
                      <div className="clearfix" />
                      <hr />
                      <p>
                        Lorem Ipsum is simply dummy text of the pr make but also
                        the leap into electronic typesetting, remaining
                        essentially unchanged. It was popularised in the 1960s
                        with the release of Letraset sheets containing Lorem
                        Ipsum passages, and more recently with desktop
                        publishing software like Aldus PageMaker including
                        versions of Lorem Ipsum.
                      </p>


                        <div className="form-group">
                          <label htmlFor="exampleFormControlTextarea1" />
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                          />
                        </div>
                        <a
                          href="#top"
                          className="float-right btn btn-outline-primary ml-2 "
                        >
                          {" "}
                          <i className="fa fa-reply " /> Reply
                        </a>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
