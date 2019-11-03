import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function mapStateToProps({ questions, authedUser }) {
  const polls = Object.values(questions);
  const answered = polls.filter(
    q =>
      q.optionOne.votes.includes(authedUser) ||
      q.optionTwo.votes.includes(authedUser)
  );

  return {
    answered: answered.sort((a, b) => b.timestamp - a.timestamp),
    unanswered: polls
      .filter(q => !answered.includes(q))
      .sort((a, b) => b.timestamp - a.timestamp)
  };
}

class Polls extends Component {
  state = {
    toggle: "unanswered"
  };

  handleClick = newList => {
    this.setState({ toggle: newList });
  };

  render() {
    const { answered, unanswered } = this.props;
    const { toggle } = this.state;
    const currentList = toggle === "unanswered" ? unanswered : answered;

    return (
      <div class="container">
        <h2 className="text-center">Choose A Question</h2>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label
            id="unansweredBtn"
            class={`btn btn-primary ${toggle === "unanswered" && "active"}`}
            onClick={() => this.handleClick("unanswered")}
          >
            Unanswered
          </label>
          <label
            id="answeredBtn"
            class={`btn btn-primary ${toggle === "answered" && "active"}`}
            onClick={() => this.handleClick("answered")}
          >
            Answered
          </label>
        </div>
        <div class="list-group">
          {currentList.map(p => {
            return (
              <Link
                key={p.id}
                className="text-center list-group-item list-group-item-action"
                to={`/questions/${p.id}`}
              >
                ...{p.optionOne.text.substring(0, 15)}...
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Polls);
