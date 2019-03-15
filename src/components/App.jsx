import React, { Component } from 'react';
import TodoList from './TodoList';
import TodoItems from './TodoItems';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      currentItem: { text: '', key: '' },
      isLoaded: false,
      error: null,
      completed: false// eslint-disable-line
    };
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        this.setState({ isLoaded: true });
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then(data => this.setState({ items: data }))
      .catch(error => this.setState({ error, isLoaded: false }));
  }

  toggleClass(item) {
    const { items } = this.state;
    const idx = items.findIndex(i => i.id === item.id);
    items[idx].completed = !items[idx].completed;
    this.setState({
      items,
    });
  }

  handleInput(e) {
    const itemText = e.target.value;
    const currentItem = { text: itemText, key: Date.now() };
    this.setState({
      currentItem
    });
  }

  addItem(e) {
    const { currentItem } = this.state;
    e.preventDefault();
    const newItem = currentItem;
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem]; // eslint-disable-line
      this.setState({
        items,
        currentItem: { text: '', key: '' }
      });
    }
  }

  deleteItem(key) {
    const { items } = this.state;
    const filteredItems = items.filter(item => item !== key);
    this.setState({
      items: filteredItems
    });
  }

  render() {
    const {
      currentItem, items, isLoaded, error
    } = this.state;

    return (
      <div className="App">
        <TodoList
          addItem={this.addItem}
          deleteItem={this.deleteItem}
          handleInput={this.handleInput}
          currentItem={currentItem}
        />
        <TodoItems
          isLoaded={isLoaded}
          error={error}
          entries={items}
          deleteItem={this.deleteItem}
          toggleClass={this.toggleClass}
        />
      </div>
    );
  }
}

export default App;
