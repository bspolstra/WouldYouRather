import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authedUser";

class Nav extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  };

  rightNavBar = username => {
    return (
      <ul class="navbar-nav ml-auto">
        <li>
          <span class="ml-auto navbar-text">Hello, {username}!</span>
        </li>
        <li class="nav-item">
          <NavLink onClick={this.handleLogout} to="/" className="nav-link">
            Log Out
          </NavLink>
        </li>
      </ul>
    );
  };

  render() {
    const { authedUser, username } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="collapse navbar-collapse">
          <a className="navbar-brand" href="#">
            Would You Rather...
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Questions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/leaderboard" className="nav-link">
                Leader Board
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/add" className="nav-link">
                Create Question
              </NavLink>
            </li>
          </ul>
          {authedUser && this.rightNavBar(username)}
        </div>
      </nav>
    );
  }
}
function mapStateToProps({ authedUser, users }) {
  return { username: authedUser && users[authedUser].name, authedUser };
}
export default connect(mapStateToProps)(Nav);
