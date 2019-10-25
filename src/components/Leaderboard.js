import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps({ authedUser, users }) {
  const board = Object.keys(users)
    .map(user => {
      const numOfAnswers = Object.keys(users[user].answers).length;
      const numOfAsked = users[user].questions.length;
      const score = numOfAnswers + numOfAsked;

      return {
        name: users[user].name,
        numOfAnswers: numOfAnswers,
        numOfAsked: numOfAsked,
        score: score
      };
    })
    .sort((a, b) => b.score - a.score);

  return { board };
}

const Leaderboard = props => {
  return (
    <div>
      {props.board.map(player => (
        <div>
          <div>Name: {player.name}</div>
          <div>Answered questions: {player.numOfAnswers}</div>
          <div>Questions created: {player.numOfAsked}</div>
          <div>Score: {player.score}</div>
        </div>
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(Leaderboard);
