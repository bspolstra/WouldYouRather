import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { Redirect } from "react-router-dom";
import { handleSaveAnswer } from "../actions/questions";

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const id = match.params.id;

  if (!questions[id]) {
    return { author: null, id };
  }

  const optionOneVotes = get(questions[id], "optionOne.votes");
  const optionTwoVotes = get(questions[id], "optionTwo.votes");
  const authedUserVote = optionOneVotes.includes(authedUser)
    ? "optionOne"
    : optionTwoVotes.includes(authedUser)
    ? "optionTwo"
    : null;
  return {
    optionOne: get(questions[id], "optionOne.text"),
    optionTwo: get(questions[id], "optionTwo.text"),
    author: users[get(questions[id], "author")],
    id,
    userCount: Object.keys(users).length,
    optionOneVoteCount: optionOneVotes.length,
    optionTwoVoteCount: optionTwoVotes.length,
    authedUserVote,
    authedUser
  };
}

class Poll extends Component {
  handleClick = option => {
    const { dispatch, authedUser, id } = this.props;
    dispatch(handleSaveAnswer(authedUser, id, option));
  };

  unansweredPoll = ({ optionOne, optionTwo }) => {
    return (
      <Fragment>
        <h5 className="card-text">Would you rather....</h5>
        <div className="row center-block">
          <button
            className="btn btn-primary col-md"
            onClick={() => this.handleClick("optionOne")}
          >
            {optionOne}
          </button>
          <p className="card-text col-md">...or...</p>
          <button
            className="btn btn-primary col-md"
            onClick={() => this.handleClick("optionTwo")}
          >
            {optionTwo}?
          </button>
        </div>
      </Fragment>
    );
  };

  answeredPoll = ({
    userCount,
    optionOneVoteCount,
    optionTwoVoteCount,
    authedUserVote,
    optionOne,
    optionTwo
  }) => {
    const optionOneVotePercent = (optionOneVoteCount / userCount) * 100;
    const optionTwoVotePercent = (optionTwoVoteCount / userCount) * 100;
    return (
      <Fragment>
        <ul className="list-group">
          <li className="list-group-item">
            <p
              style={
                authedUserVote === "optionOne"
                  ? { fontWeight: "bold" }
                  : { fontWeight: "normal" }
              }
            >
              ... {optionOne} ...
            </p>
            <p>
              {optionOneVoteCount} users have voted this out of {userCount}
            </p>
            <p>{optionOneVotePercent.toFixed(1)} of all users</p>
          </li>
          <li className="list-group-item">
            <p
              style={
                authedUserVote === "optionTwo"
                  ? { fontWeight: "bold" }
                  : { fontWeight: "normal" }
              }
            >
              ... {optionTwo} ...
            </p>
            <p>
              {optionTwoVoteCount} users have voted this out of {userCount}
            </p>
            <p>{optionTwoVotePercent.toFixed(1)} of all users</p>
          </li>
        </ul>
      </Fragment>
    );
  };

  render() {
    const { authedUserVote, author, id } = this.props;
    if (!author) {
      return <Redirect to={{ pathname: "/notfound", state: { id } }} />;
    }

    const { name, avatarURL } = author;
    return (
      <div className="container">
        <div className="card flex-wrap container-fluid">
          <div class="card-header border-0">
            <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
          </div>
          <div class="card-block px-2 text-center ">
            <h4 class="card-title">{name} asks:</h4>
            {authedUserVote
              ? this.answeredPoll(this.props)
              : this.unansweredPoll(this.props)}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Poll);
