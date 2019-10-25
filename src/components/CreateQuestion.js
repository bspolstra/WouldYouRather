import React, { Component } from "react";
import { connect } from "react-redux";

class CreateQuestion extends Component {
  constructor(props) {
    super(props);

    this.inputOptionOne = React.createRef();
    this.inputOptionTwo = React.createRef();
  }

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.inputOptionOne.current.value);
    // console.log(this.inputOptionTwo.current.value);
  };

  render() {
    return (
      <div>
        <form>
          <h1>Create New Question</h1>
          <p>Complete the question</p>
          <h4>Would you rather...</h4>
          <input
            ref={this.inputOptionOne}
            name="optionOne"
            type="text"
            placeholder="Option One Text"
          />
          <p>OR</p>
          <input
            ref={this.inputOptionTwo}
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

export default connect()(CreateQuestion);
