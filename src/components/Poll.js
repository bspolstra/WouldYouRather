import React, { Component } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { Redirect } from "react-router-dom";

function mapStateToProps({ questions, users, authedUser }, { match }) {
  console.log(match);
  var id = match.params.id;

  const userID = get(questions[id], "author");
  return {
    optionOne: get(questions[id], "optionOne.text"),
    optionTwo: get(questions[id], "optionTwo.text"),
    author: users[userID],
    authedUser: users[authedUser],
    id
  };
}

class Poll extends Component {
  //TODO build out the handleClick to save the authedUser'choice
  handleClick = option => {};

  render() {
    const { optionOne, optionTwo, author, id } = this.props;
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
      console.log(id);
      return <Redirect to={{ pathname: "/notfound", state: { id } }} />;
    }
  }
}

export default connect(mapStateToProps)(Poll);
