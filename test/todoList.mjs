import { describe, it, afterEach } from 'node:test';
import { doesNotThrow, throws, strictEqual } from 'node:assert';

import User from './../src/user.js';
import TodoList from './../src/todoList.js';
import TodoItem from './../src/todoItem.js';

const user = new User('John', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password123');
const todoList = new TodoList('My todo list');

afterEach(() => {
  todoList.todos = [];
});

describe('Adding a new todo list on the user', () => {
  it('should throw an exception if the passed todo list is not an instance of TodoList', () => {
    throws(
      () => {
        user.addTodoList({})
      },
      new Error('The passed todo list is not an instance of TodoList'),
    );
  });

  it('should return true if the user don\'t have any totoList registered', () => {
    const result = user.addTodoList(todoList);

    strictEqual(result, true);
  });

  it('should throw an exception if the user already has a todo list', () => {
    const unwantedTodoList = new TodoList('My unwanted todo list');
    throws(
      () => {
        user.addTodoList(unwantedTodoList)
      },
      new Error('You already have a todo list'),
    );
  });
});

describe('Removing a todo list from the user', () => {
  it('should return an error if the passed todo list is not an instance of TodoList', () => {
    throws(
      () => {
        user.removeTodoList({})
      },
      new Error('The todo list is not a TodoList class'),
    );
  });

  it('should return an error if the passed todo list is not registered on the user', () => {
    const unwantedTodoList = new TodoList('My unwanted todo list');
    throws(
      () => {
        user.removeTodoList(unwantedTodoList);
      },
      new Error('The todo list is not registered on the user'),
    );
  });

  it('should return true if the user has a todo list', () => {
    const result = user.removeTodoList(todoList);

    strictEqual(result, true);
  });

  it('should throw an error if the user don\'t have any todo list', () => {
    throws(
      () => {
        user.removeTodoList(todoList);
      },
      new Error('The todo list is not registered on the user'),
    );
  });
});

describe('Creating a TodoItem', () => {
  it('should throw an exception if the description is more than 1000 characters', () => {
    throws(
      () => {
        new TodoItem('description test', 'a'.repeat(1001));
      },
      new Error('The description length must be under 1000 characters'),
    );
  });

  it('should throw an exception if the title is missing', () => {
    throws(
      () => {
        new TodoItem('', 'content');
      },
      new Error('The title is missing'),
    );
    throws(
      () => {
        new TodoItem(undefined, 'content');
      },
      new Error('The title is missing'),
    );
  });

  it('should throw an exception if the description is missing', () => {
    throws(
      () => {
        new TodoItem('title', '');
      },
      new Error('The description is missing'),
    );
    throws(
      () => {
        new TodoItem('title');
      },
      new Error('The description is missing'),
    );
  });
});

describe('Add TodoItem to TodoList', () => {
  it('should throw an exception if the name is not unique', () => {
    todoList.todos = [
      new TodoItem('duplicated item', 'content'),
    ];

    throws(
      () => {
        todoList.addNewTodo(new TodoItem('duplicated item', 'content'));
      },
      new Error('You already have a todo with this name'),
    );

    todoList.todos = [];
  });

  it('shouldn\'t throw an exception if the item is added', () => {
    const item = new TodoItem('one', 'description');

    doesNotThrow(() => {
      todoList.addNewTodo(item);
    });
  });

  it('should throw an exception if last items had been added less than 30min ago', () => {
    const itemTwo = new TodoItem("two", "description");

    throws(
      () => {
        todoList.addNewTodo(itemTwo)
      },
      new Error('You can\'t add a new todo before 30 minutes'),
    );
  });

  it('should throw an exception if the user is not valid', () => {
    throws(
      () => {
        new User('John', 'D', 'zabuza@gmail.com', new Date() - 86400000 * 18, 'Password123');
      },
      new Error('The user is not valid'),
    );
  });

  // it('should return true and send a mail when you added the 8th item to the todolist', () => {
  //   const item = new Item("one", new Date());
  //   const itemTwo = new Item("twop", new Date());
  //   const itemThree = new Item("threee", new Date());
  //   const itemFour = new Item("four", new Date());
  //   const itemFive = new Item("five", new Date());
  //   const itemSix = new Item("six", new Date());
  //   const itemSeven = new Item("seven", new Date());
  //   const itemEight = new Item("eight", new Date());

  //   // todoList.addItem(item);
  //   // todoList.addItem(itemTwo);
  //   // todoList.addItem(itemThree);
  //   // todoList.addItem(itemFour);
  //   // todoList.addItem(itemFive);
  //   // todoList.addItem(itemSix);
  //   // todoList.addItem(itemSeven);
  //   // const result = todoList.addItem(itemEight);

  //   // mock the mail function
  //   // assert that the mail function was called

  //   strictEqual(true, true);

  // });

  it('should throw an exception if you try to add more than 10 items to the todolist', () => {
    const items = [
      new TodoItem('one', 'content'),
      new TodoItem('twop', 'content'),
      new TodoItem('threee', 'content'),
      new TodoItem('four', 'content'),
      new TodoItem('five', 'content'),
      new TodoItem('six', 'content'),
      new TodoItem('seven', 'content'),
      new TodoItem('eight', 'content'),
      new TodoItem('nine', 'content'),
      new TodoItem('ten', 'content'),
    ];

    todoList.todos = [ ...items ];

    throws(
      () => {
        todoList.addNewTodo(new TodoItem('eleven', 'content'));
      },
      new Error('You can\'t have more than 10 todos'),
    );
  });

});
