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
          <h2 className="text-center">Create New Question</h2>
          <h5 className=" text-center">Would you rather...</h5>
          <div class="form-group">
            <input
              type="text"
              ref={inputOptionOne}
              class="form-control"
              placeholder="Option One Text"
            />
            <h6 className="text-center or">...OR...</h6>
            <input
              ref={inputOptionTwo}
              type="text"
              class="form-control"
              placeholder="Option Two Text"
            />
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={e => this.handleSubmit(e)}
              type="submit"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(CreateQuestion);
