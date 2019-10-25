import React, { Component } from "react";
import { handleInitializeData } from "../actions/shared";
import Polls from "./Polls";
import Poll from "./Poll";
import Leaderboard from "./Leaderboard";
import CreateQuestion from "./CreateQuestion";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Nav from "./Nav";
import Login from "./Login";
import NotFound from "./NotFound";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitializeData());
  }

  render() {
    const { loggedIn } = this.props;
    console.log(this.props);
    return (
      <div>
        <Nav />
        <Route exact path="/">
          {loggedIn ? <Polls /> : <Redirect to="/login" />}
        </Route>
        <Route path="/poll/:id">
          {loggedIn ? <Poll /> : <Redirect to="/login" />}
        </Route>
        <Route path="/leaderboard">
          {loggedIn ? <Leaderboard /> : <Redirect to="/login" />}
        </Route>
        <Route path="/create">
          {loggedIn ? <CreateQuestion /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/notfound">
          {loggedIn ? <NotFound /> : <Redirect to="/login" />}
        </Route>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return { loggedIn: authedUser !== null };
}

export default connect(mapStateToProps)(App);
