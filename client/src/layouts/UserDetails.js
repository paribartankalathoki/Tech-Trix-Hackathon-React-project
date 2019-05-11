import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserDetails extends Component {
  render() {
    return (
      <div className="card mb-5">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src="https://dummyimage.com/300/"
              className="card-img"
              alt="..."
            />
          </div>
          <div className="col-md-8 ">
            <div className="card-body ">
              <h3 className="card-title ">User Name</h3>

              <p className="">Address: Writer Name</p>
              <p className="">Interest:</p>
              <p className="">Favourite-Books:List,of,books,name</p>
              <p className="">Favourite-Writers: Writer Name</p>
              <p className="">etc: etc</p>

              <hr />
              <div className="clearfix" />
              <p className="card-text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima
                perferendis, natus eos quidem ea deleniti qui maiores accusamus
                error ad quo beatae consequuntur sequi, ipsa iste recusandae
                optio dicta. Sed.lorem
              </p>
              <hr />
            </div>
            <Link
              to="/EditProfile"
              className="btn float-right btn-outline-primary mr-2 ml-3 mb-3"
            >
              <i className="fa fa-edit " /> Edit
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
