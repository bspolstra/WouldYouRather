import React, { Component } from "react";
import { handleInitializeData } from "../actions/shared";
import Login from "./Login";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitializeData());
  }
  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

function mapStateToProps({}) {}

export default connect()(App);
