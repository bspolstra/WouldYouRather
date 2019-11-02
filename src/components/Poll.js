import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { Redirect } from "react-router-dom";
import { handleSaveAnswer } from "../actions/questions";

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const id = match.params.id;
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
        <p>Would you rather....</p>
        <p onClick={() => this.handleClick("optionOne")}>
          ... {optionOne} or...
        </p>
        <p onClick={() => this.handleClick("optionTwo")}>... {optionTwo}?</p>
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
        <div>
          <p
            style={
              authedUserVote === "optionOne"
                ? { fontWeight: "bold" }
                : { fontWeight: "normal" }
            }
          >
            .... {optionOne} ...
          </p>
          <p>
            {optionOneVoteCount} out of {userCount}
          </p>
          <p>{optionOneVotePercent.toFixed(1)}</p>
        </div>
        <div>
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
            {optionTwoVoteCount} out of {userCount}
          </p>
          <p>{optionTwoVotePercent.toFixed(1)}</p>
        </div>
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
      <Fragment>
        <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
        <p>Asked by {name}</p>
        {authedUserVote
          ? this.answeredPoll(this.props)
          : this.unansweredPoll(this.props)}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Poll);
