import { describe, it } from 'node:test';
import assert from 'node:assert';

import User from './../src/user.js';
import TodoList from './../src/todoList.js';

const user = new User('John', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password123');
const todoList = new TodoList('My todo list');

describe('Adding a new todo list on the user', () => {
  it('should return true if the user don\'t have any totoList registered', () => {
    const result = user.addTodoList(todoList);

    assert.strictEqual(result, true);
  });

  it('should throw an error if the user already has a todo list', () => {
    const unwantedTodoList = new TodoList('My unwanted todo list');
    assert.throws(() => {user.addTodoList(unwantedTodoList)});
  });
});

describe('Removing a todo list from the user', () => {
  it('should return an error if the passed todo list is not an instance of TodoList', () => {
    assert.throws(() => {user.removeTodoList({})});
  });

  it('should return an error if the passed todo list is not registered on the user', () => {
    const unwantedTodoList = new TodoList('My unwanted todo list');
    assert.throws(() => {user.removeTodoList(unwantedTodoList)});
  });

  it('should return true if the user has a todo list', () => {
    const result = user.removeTodoList(todoList);

    assert.strictEqual(result, true);
  });

  it('should throw an error if the user don\'t have any todo list', () => {
    assert.throws(() => {user.removeTodoList(todoList)});
  });
});
