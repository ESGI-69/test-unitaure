import { describe, it } from 'node:test';
import assert from 'node:assert';

import User from './../src/user.js';
import TodoList from './../src/todoList.js';
import Item from './../src/todoList.js';

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

// items
describe('add items to todo list', () => {
  it('should return true if the item is added', () => {
    const item = new Item("one", new Date());
    const result = todoList.addItem(item);

    assert.strictEqual(result, true);
  });

  it('should return false if the name is not unique', () => {
    const item = new Item("My first item", new Date());
    // todolist should be populated with an item with the same name
    // or
    // const secondItem = new Item("My first item", new Date());
    // todoList.addItem(secondItem);

    const result = todoList.addItem(item);

    assert.strictEqual(result, false);
  });

  it('should return false if the name is more than 1000 characters', () => {
    const item = new Item("a".repeat(1001));
    const result = todoList.addItem(item);

    assert.strictEqual(result, false);
  });

  it('should return false if last two items had been added less than 30min ago', () => {
    const item = new Item("one", new Date());
    const itemTwo = new Item("one", new Date());
    const itemThree = new Item("one", new Date());

    todoList.addItem(item);
    todoList.addItem(itemTwo);
    const result = todoList.addItem(itemThree);

    assert.strictEqual(result, false);
  });

  it('should return false if the user is not valid', () => {
  });

});
