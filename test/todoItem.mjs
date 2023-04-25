import { describe, it } from 'node:test';
import { doesNotThrow, throws } from 'node:assert';

import TodoItem from '../src/todoItem.js';

describe('TodoItem creation', () => {
  it('should instantiate a new TodoItem if the content is valid', () => {
    doesNotThrow(() => {
      new TodoItem('Todo', 'This is a todo');
    });
  });

  it('shouldn\'t instantiate a new TodoItem if the content is too long', () => {
    throws(
      () => {
        new TodoItem('Todo', 'This is a todo that is too long and should throw an error'.repeat(100));
      },
      new Error('The description length must be under 1000 characters'),
    );
  });
});
