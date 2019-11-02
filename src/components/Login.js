import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    selectedValue: "",
    redirect: false
  };

  handleChange = e => {
    this.setState({ selectedValue: e.target.value });
  };

  handleClick = () => {
    const { selectedValue } = this.state;
    if (selectedValue !== "") {
      this.props.dispatch(setAuthedUser(selectedValue));
      this.setState({ redirect: true });
    }
  };
  render() {
    const { users } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div>
          <select onChange={e => this.handleChange(e)}>
            <option key="" value=""></option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button onClick={this.handleClick}>Login</button>
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
