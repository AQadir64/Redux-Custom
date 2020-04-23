import React, { Component } from "react";
import { handleAddGoal, handleDeleteGoal } from "../actions/goals";
import List from "./List";
import { connect } from "react-redux";

class Goals extends Component {
  addGoal = (e) => {
    e.preventDefault();
    this.props.dispatch(
      handleAddGoal(this.input.value, () => (this.input.value = ""))
    );
  };
  removeItem = (goal) => {
    this.props.dispatch(handleDeleteGoal(goal));
  };
  render() {
    return (
      <div>
        <h1>GOALS LIST :</h1>
        <input
          type="text"
          placeholder="Add Goal"
          ref={(input) => (this.input = input)}
        />
        <button onClick={this.addGoal}>Add Goal</button>
        <List remove={this.removeItem} items={this.props.goals} />
      </div>
    );
  }
}

export default connect((state) => ({
  goals: state.goals,
}))(Goals);
