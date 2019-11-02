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
      <div>
        <div>
          <ul>
            <li onClick={() => this.handleClick("unanswered")}>Polls</li>
            <li onClick={() => this.handleClick("answered")}>Answered</li>
          </ul>
        </div>
        {currentList.map(p => {
          return (
            <div key={p.id}>
              <Link to={`/questions/${p.id}`}>
                ...{p.optionOne.text.substring(0, 15)}...
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Polls);
