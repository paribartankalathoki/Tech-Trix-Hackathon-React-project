import React, { Component } from "react";

import UserDetails from "./UserDetails";
import ExchangePost from "./ExchangePost";
import PreviousPost from "./PreviousPost";

class OwnProfile extends Component {
  render() {
    return (
      <div>
        <div className="container user-details">
          <UserDetails />
          <ExchangePost />
          <PreviousPost />
        </div>
      </div>
    );
  }
}
export default OwnProfile;
