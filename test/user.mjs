import test from 'node:test';
import assert from 'node:assert';

import User from '../src/user.js';

test('User.isValid() should return true when the user is valid', () => {
  const user = new User('John', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password123');

  assert.strictEqual(user.isValid(), true);
});

test('User.isValid() should return false when under 13yo', () => {
  const user = new User('John', 'Doe', 'zabuza@gmail.com', new Date('2021-01-01'), 'Password123');

  assert.strictEqual(user.isValid(), false);
});

test('User.isValid() should return false when firstname is too short', () => {
  const user = new User('J', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password123');

  assert.strictEqual(user.isValid(), false);
});

test('User.isValid() should return false when firstname is too long', () => {
  const user = new User('JhonJhonJhonJhonJhonJhon', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password123');

  assert.strictEqual(user.isValid(), false);
});

test('User.isValid() should return false when lastname is too short', () => {
  const user = new User('Jhon', 'D', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password123');

  assert.strictEqual(user.isValid(), false);
});

test('User.isValid() should return false when lastname is too long', () => {
  const user = new User('Jhon', 'DoeDoeDoeDoeDoeDoeDoe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password123');

  assert.strictEqual(user.isValid(), false);
});

test('User.isValid() should return false when email is not valid', () => {
  const user = new User('Jhon', 'Doe', 'zabuza', new Date('1990-01-01'), 'Password123');

  assert.strictEqual(user.isValid(), false);
});

test('User.isValid() should return false when password is too short', () => {
  const user = new User('Jhon', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Pa1');

  assert.strictEqual(user.isValid(), false);
});

test('User.isValid() should return false when password is too long', () => {
  const user = new User('Jhon', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password123Password123Password123Password123');

  assert.strictEqual(user.isValid(), false);
});

test('User.isValid() should return false when password not containing a lowercase letter', () => {
  const user = new User('Jhon', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'PASSWORD123');

  assert.strictEqual(user.isValid(), false);
});

test('User.isValid() should return false when password not containing a uppercase', () => {
  const user = new User('Jhon', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'password123');

  assert.strictEqual(user.isValid(), false);
});

test('User.isValid() should return false when password not containing a number', () => {
  const user = new User('Jhon', 'Doe', 'zabuza@gmail.com', new Date('1990-01-01'), 'Password');

  assert.strictEqual(user.isValid(), false);
});
