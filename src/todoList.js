import TodoItem from './todoItem.js';

class TodoList {
  /**
   * List of TodoItems
   * @param {string} name 
   */
  constructor(name) {
    this.name = name;
    /**
     * @type {TodoItem[]}
     */
    this.todos = [];
  }

  /**
   * Add a new todo item to the list
   * @param {TodoItem} item
   */
  addNewTodo(item) {
    if (this.todos.length >= 10) {
      throw new Error('You can\'t have more than 10 todos');
    }

    if (this.todos.find(todo => todo.name === item.name)) {
      throw new Error('You already have a todo with this name');
    }

    if (
      this.todos.length >= 2
      && new Date(new Date() - this.todos.sort((a, b) => b.date - a.date)[0].date).getMinutes() < 30
    ) {
      throw new Error('You can\'t add a new todo before 30 minutes');
    }

    if (
      this.todos.length === 1
      && new Date(item.date - this.todos[0].date).getMinutes() < 30
    ) {
      throw new Error('You can\'t add a new todo before 30 minutes');
    }

    this.todos.push(item);
  }
}

export default TodoList;