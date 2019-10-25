import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Nav extends Component {
  render() {
    const { isLoggedIn, username } = this.props;

    // const LogButton;

    // if (isLoggedIn) {
    //   LogButton = (
    //     <div>
    //       Hello, {username}
    //       <button>Log Out</button>
    //     </div>
    //   );
    // }else{
    //     LogButton = (
    //         <div></div>
    //     )
    // }

    return (
      <div>
        <NavLink to="/">Polls</NavLink>
        <NavLink to="/leaderboard">Leader Board</NavLink>
        <NavLink to="/create">Create Question</NavLink>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    isLoggedIn: authedUser !== null && authedUser !== ""
  };
}

export default connect(mapStateToProps)(Nav);
