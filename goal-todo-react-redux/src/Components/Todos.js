import React, { Component } from "react";
import {
  handleAddTodo,
  handleDeleteTodo,
  handleToggle,
} from "../actions/todos";
import { connect } from "react-redux";
import List from "./List";
class Todos extends Component {
  addTodo = (e) => {
    e.preventDefault();
    this.props.dispatch(
      handleAddTodo(this.input.value, () => (this.input.value = ""))
    );
  };

  toggleItem = (id) => {
    this.props.dispatch(handleToggle(id));
  };
  removeItem = (todo) => {
    this.props.dispatch(handleDeleteTodo(todo));
  };
  render() {
    return (
      <div>
        <h1>TODO LIST :</h1>
        <input
          type="text"
          placeholder="Add Todo"
          ref={(input) => (this.input = input)}
        />
        <button onClick={this.addTodo}>Add Todo</button>
        <List
          toggle={this.toggleItem}
          remove={this.removeItem}
          items={this.props.todos}
        />
      </div>
    );
  }
}

export default connect((state) => ({
  todos: state.todos,
}))(Todos);
