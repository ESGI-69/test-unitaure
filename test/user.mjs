import { describe, it } from 'node:test';
import assert from 'node:assert';

import User from '../src/user.js';

describe('User creation', () => {
  it('should instantiate a new User if the user is valid', () => {
    assert.doesNotThrow(() => {
      new User('John', 'Doe', 'zabuza@gmail.com', new Date(new Date().setFullYear(new Date().getFullYear() - 30)), 'Password123');
    });
  });

  it('should instantiate a new User if the user exactly 13yo', () => {
    assert.doesNotThrow(() => {
      new User('John', 'Doe', 'zabuza@gmail.com', new Date(new Date().setFullYear(new Date().getFullYear() - 13)), 'Password123');
    });
  });
  
  it('shouldn\'t instantiate a new User if the user is under 13yo', () => {
    assert.throws(() => {
      new User('John', 'Doe', 'zabuza@gmail.com', new Date(new Date().setFullYear(new Date().getFullYear() - 12)), 'Password123');
    });
  });
  
  it('shouldn\'t instantiate a new User if the user\'s firstname is too short', () => {
    assert.throws(() => {
      new User('J', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password123');
    });
  });
  
  it('shouldn\'t instantiate a new User if the user\'s firstname is too long', () => {
    assert.throws(() => {
      new User('JhonJhonJhonJhonJhonJhon', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password123');
    });
  });
  
  it('shouldn\'t instantiate a new User if the user\'s lastname is too short', () => {
    assert.throws(() => {
      new User('Jhon', 'D', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password123');
    });
  });
  
  it('shouldn\'t instantiate a new User if the user\'s lastname is too long', () => {
    assert.throws(() => {
      new User('Jhon', 'DoeDoeDoeDoeDoeDoeDoe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password123');
    });
  });
  
  it('shouldn\'t instantiate a new User if the user\'s email is not valid', () => {
    assert.throws(() => {
      new User('Jhon', 'Doe', 'zabuza', new Date('1990-01-01'), 'Password123');
    });
  });
  
  it('shouldn\'t instantiate a new User if the user\'s password is too short', () => {
    assert.throws(() => {
      new User('Jhon', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Pa1');
    });
  });
  
  it('shouldn\'t instantiate a new User if the user\'s password is too long', () => {
    assert.throws(() => {
      new User('Jhon', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password123Password123Password123Password123');
    });
  });
  
  it('shouldn\'t instantiate a new User if the user\'s password not containing a lowercase letter', () => {
    assert.throws(() => {
      new User('Jhon', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'PASSWORD123');
    });
  });
  
  it('shouldn\'t instantiate a new User if the user\'s password not containing a uppercase', () => {
    assert.throws(() => {
      new User('Jhon', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'password123');
    });
  });
  
  it('shouldn\'t instantiate a new User if the user\'s password not containing a number', () => {
    assert.throws(() => {
      new User('Jhon', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password');
    });
  });
});
