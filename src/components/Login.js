import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    selectedUser: "",
    redirect: false
  };

  handleChange = e => {
    this.setState({ selectedUser: e.target.value });
  };

  handleClick = () => {
    const { selectedUser } = this.state;
    if (selectedUser !== "") {
      this.props.dispatch(setAuthedUser(selectedUser));
      this.setState({ redirect: true });
    }
  };
  render() {
    const { users, redirectPath } = this.props;
    const { redirect } = this.state;

    if (redirect && redirectPath) {
      return <Redirect />;
    }

    return (
      <div>
        <h2 className="text-center">Who Are You?</h2>
        <div className="form-group">
          <select
            className="custom-select"
            onChange={e => this.handleChange(e)}
          >
            <option key="" value=""></option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <button onClick={this.handleClick} className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users).map(user => {
      return {
        id: users[user].id,
        name: users[user].name
      };
    })
  };
}

export default connect(mapStateToProps)(Login);
