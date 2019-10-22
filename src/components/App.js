import React, { Component } from "react";
import { handleInitializeData } from "../actions/shared";
import Polls from "./Polls";
import Poll from "./Poll";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitializeData());
  }
  render() {
    return (
      <div>
        <Route exact path="/" component={Polls} />
        <Route path="poll/:id" component={Poll} />
      </div>
    );
  }
}

function mapStateToProps({}) {}

export default connect()(App);
