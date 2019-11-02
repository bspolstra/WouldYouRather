import React, { Component } from "react";
import { connect } from "react-redux";
import { handleCreateQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

class CreateQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputOptionOne: React.createRef(),
      inputOptionTwo: React.createRef(),
      redirect: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, authedUser } = this.props;
    const { inputOptionOne, inputOptionTwo } = this.state;
    dispatch(
      handleCreateQuestion(
        inputOptionOne.current.value,
        inputOptionTwo.current.value,
        authedUser
      )
    );
    this.setState({ redirect: true });
  };

  render() {
    const { inputOptionOne, inputOptionTwo, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <form>
          <h1>Create New Question</h1>
          <p>Complete the question</p>
          <h4>Would you rather...</h4>
          <input
            ref={inputOptionOne}
            name="optionOne"
            type="text"
            placeholder="Option One Text"
          />
          <p>OR</p>
          <input
            ref={inputOptionTwo}
            name="optionTwo"
            type="text"
            placeholder="Option Two Text"
          />
          <button onClick={e => this.handleSubmit(e)} type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(CreateQuestion);
