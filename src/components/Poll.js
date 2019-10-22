import React, { Component } from "react";
import { connect } from "react-redux";
import { get } from "lodash";

function mapStateToProps({ questions, users, authedUser }, { id }) {
  const userID = get(questions[id], "author");
  console.log(id);
  return {
    optionOne: get(questions[id], "optionOne.text"),
    optionTwo: get(questions[id], "optionTwo.text"),
    author: users[userID],
    authedUser: users[authedUser]
  };
}

class Poll extends Component {
  handleClick = option => {};

  render() {
    const { optionOne, optionTwo, author } = this.props;

    if (author) {
      const { name, avatarURL } = author;
      return (
        <div>
          <p>{name} ask...</p>
          <p>Would you rather....</p>
          <p onClick={() => this.handleClick("optionOne")}>
            ... {optionOne} or...
          </p>
          <p onClick={() => this.handleClick("optionTwo")}>... {optionTwo}?</p>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default connect(mapStateToProps)(Poll);
