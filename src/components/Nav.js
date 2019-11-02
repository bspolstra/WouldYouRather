import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div>
        <NavLink to="/">Polls</NavLink>
        <NavLink to="/leaderboard">Leader Board</NavLink>
        <NavLink to="/add">Create Question</NavLink>
      </div>
    );
  }
}

export default Nav;
