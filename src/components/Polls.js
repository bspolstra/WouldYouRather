import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function mapStateToProps({ questions, authedUser }) {
  //TODO: delete test data
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
    toggle: "unanswered"
  };

  handleClick = list => {
    this.setState({ toggle: list });
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
          //TODO: add event to navigate to Poll
          console.log(p.id);
          return (
            <div key={p.id}>
              <Link to={`/poll/${p.id}`}>
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
