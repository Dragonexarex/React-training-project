import React, { Component } from 'react';

class TodoList extends Component {
  componentDidUpdate() {
    this.inputElement.focus();
  }

  render() {
    const {
      addItem, currentItem, handleInput
    } = this.props;
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={addItem}>
            <input placeholder="Task" ref={(elem) => { this.inputElement = elem; }} value={currentItem.text} onChange={handleInput} />
            <button type="submit"> Add Task </button>
          </form>
        </div>
      </div>
    );
  }
}

export default TodoList;
