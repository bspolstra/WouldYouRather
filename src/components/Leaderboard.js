import React from "react";
import { connect } from "react-redux";

function mapStateToProps({ users }) {
  const board = Object.keys(users)
    .map(user => {
      const numOfAnswers = Object.keys(users[user].answers).length;
      const numOfAsked = users[user].questions.length;
      const score = numOfAnswers + numOfAsked;
      return {
        id: user,
        avatarURL: users[user].avatarURL,
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
    <div className="container-cards">
      <div className="row" id="leaderboard">
        {props.board.map(player => (
          <div key={player.id} className="card mb-3 col-md">
            <h3 class="card-header">{player.name}</h3>
            <img
              src={player.avatarURL}
              alt={`Avatar of ${player.name}`}
              className="avatar"
            />
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                Answered questions: {player.numOfAnswers}
              </li>
              <li class="list-group-item">
                Questions created: {player.numOfAsked}
              </li>
              <li class="list-group-item">Score: {player.score}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Leaderboard);
