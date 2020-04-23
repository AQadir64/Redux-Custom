import React, { Component } from "react";
import ConnectedTodos from "./Todos";
import ConnectedGoals from "./Goals";
import { connect } from "react-redux";
import { appInitialData } from "../actions/shared";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(appInitialData());
  }
  render() {
    return this.props.loading ? (
      <h1>loading...</h1>
    ) : (
      <div>
        <ConnectedTodos />
        <ConnectedGoals />
      </div>
    );
  }
}

export default connect((state) => ({
  loading: state.loading,
}))(App);
