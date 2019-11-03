import React, { Component, Fragment } from "react";
import { handleInitializeData } from "../actions/shared";
import Polls from "./Polls";
import Poll from "./Poll";
import Leaderboard from "./Leaderboard";
import CreateQuestion from "./CreateQuestion";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import Nav from "./Nav";
import Login from "./Login";
import NotFound from "./NotFound";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitializeData());
  }

  render() {
    const { loggedIn, location } = this.props;

    if (!loggedIn) {
      return (
        <Fragment>
          <Nav />
          <Login redirectPath={location.pathname} />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Nav />
        <Switch>
          <Route exact path="/" component={Polls} />
          <Route path="/questions/:id" render={props => <Poll {...props} />} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/add" component={CreateQuestion} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loggedIn: authedUser !== null
  };
}

export default connect(mapStateToProps)(withRouter(App));
