class TodoList {
  /**
   * 
   * @param {string} name 
   */
  constructor(name) {
    this.name = name;
    /**
     * @type {{string[]}
     */
    this.todos = [];
  }

  addNewTodo(text) {
    if (this)
    this.todos.push(text);
  }
}

/**
 * @type {TodoList[]}
 */
let lists = [];

export default TodoList;