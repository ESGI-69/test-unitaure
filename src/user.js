import TodoList from './../src/todoList.js';

const isUserInfoValid = (firstname, lastname, email, birthdate, password) => {
  if (firstname.length < 2 || firstname.length > 20) {
    return false;
  }

  if (lastname.length < 2 || lastname.length > 20) {
    return false;
  }

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  const age = new Date().getFullYear() - birthdate.getFullYear();

  if (age < 13) {
    return false;
  }

  // Numbers regex
  const numbersRegex = /[0-9]+/;

  // Uppercase regex
  const uppercaseRegex = /[A-Z]+/;

  // lowercase regex
  const lowercaseRegex = /[a-z]+/;

  if (
    password.length < 8
    || password.length > 40
    || !password.match(numbersRegex)
    || !password.match(uppercaseRegex)
    || !password.match(lowercaseRegex)
  ) {
    return false;
  }

  return true;
};

class User {
  /**
   * @param {string} firstname 
   * @param {string} lastname 
   * @param {string} email 
   * @param {Date} birthdate 
   * @param {string} password
   */
  constructor(firstname, lastname, email, birthdate, password) {
    if (!isUserInfoValid(firstname, lastname, email, birthdate, password)) {
      throw new Error('The user is not valid');
    }
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.birthdate = birthdate;
    this.password = password;
    this.todoLists = [];
  }

  get age() {
    return new Date().getFullYear() - this.birthdate.getFullYear();
  }

  /**
   * Add a todo list to the user
   * @param {TodoList} todoList
   * @returns {boolean} True if the todo list was added
   * @throws {Error} If the user already has a todo list
   */
  addTodoList(todoList) {
    if (this.todoLists.length !== 0) {
      throw new Error('You already have a todo list');
    }

    // Check if the todo list is a TodoList class
    if (!(todoList instanceof TodoList)) {
      throw new Error('The passed todo list is not an instance of TodoList');
    }

    this.todoLists.push(todoList);
    return true;
  }

  /**
   * Remove a todo list from the user
   * @param {TodoList} todoList
   * @returns {boolean} True if the todo list was removed
   * @throws {Error} If the todo list is not a TodoList class
   */
  removeTodoList(todoList) {
    if (!(todoList instanceof TodoList)) {
      throw new Error('The todo list is not a TodoList class');
    }

    const index = this.todoLists.indexOf(todoList);
    if (index === -1) {
      throw new Error('The todo list is not registered on the user');
    }

    this.todoLists.splice(index, 1);
    return true;
  };
}

export default User;
