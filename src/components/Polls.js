import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function mapStateToProps({ questions, authedUser }) {
  const testUser = "tylermcginnis";
  const polls = Object.values(questions);
  const answered = polls.filter(
    q =>
      q.optionOne.votes.includes(testUser) ||
      q.optionTwo.votes.includes(testUser)
  );

  const unanswered = polls.filter(q => !answered.includes(q));
  return {
    answered,
    unanswered
  };
}

class Polls extends Component {
  state = {
    toggle: "unanswered",
    pollID: ""
  };

  handleClick = list => {
    this.setState({ toggle: list });
  };

  toPoll = id => {
    this.setState({
      pollID: id
    });
  };
  render() {
    const { answered, unanswered } = this.props;
    const { pollID, toggle } = this.state;
    const currentList = toggle === "unanswered" ? unanswered : answered;

    if (pollID !== "") {
      return <Redirect to={"poll/" + pollID} />;
    }

    return (
      <div>
        <div>
          <ul>
            <li onClick={() => this.handleClick("unanswered")}>Polls</li>
            <li onClick={() => this.handleClick("answered")}>Answered</li>
          </ul>
        </div>
        {currentList.map(p => {
          //TODO: add event to navigate to Poll
          return (
            <div key={p.id} onClick={() => this.toPoll(p.id)}>
              ...{p.optionOne.text.substring(0, 15)}...
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Polls);
