import React, { Component } from 'react';

class TodoItems extends Component {
  createTasks(item) {
    const { props } = this;
    return (
      <li key={item.key} style={{ textDecoration: item.completed ? 'line-through' : '' }}>
        {item.title}
        {item.text}
        <button type="button" onClick={() => props.deleteItem(item)}>
          X
        </button>
        <button type="button" onClick={() => props.toggleClass(item)}>
          Done
        </button>
      </li>
    );
  }

  render() {
    const { entries, isLoaded, error } = this.props;
    const todoEntries = entries;
    const listItems = todoEntries.map(this.createTasks.bind(this));

    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoaded === false) {
      return <p>Loading...</p>;
    }
    return <ul className="theList">{listItems}</ul>;
  }
}

export default TodoItems;
