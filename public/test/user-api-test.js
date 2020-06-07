'use strict';

const assert = require('chai').assert;
const BeachService = require('./beaches-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('User API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const beachService = new BeachService(fixtures.beachService);

  setup(async function () {
    await beachService.deleteAllUsers();
  });

  teardown(async function () {
    await beachService.deleteAllUsers();
  });

  test('create a user', async function () {
    const returnedUser = await beachService.createUser(newUser);
    assert(_.some([returnedUser], newUser), 'returnedUser must be a superset of newUser');
    assert.isDefined(returnedUser._id);
  }); // Working

  test('get user', async function () {
    const u1 = await beachService.createUser(newUser);
    const u2 = await beachService.getUser(u1._id);
    assert.deepEqual(u1, u2);
  }); //Working

  test('get invalid user', async function () {
    const u1 = await beachService.getUser('1234');
    assert.isNull(u1);
    const u2 = await beachService.getUser('012345678901234567890123');
    assert.isNull(u2);
  }); //Working


  test('delete a user', async function () {
    let u = await beachService.createUser(newUser);
    assert(u._id != null);
    await beachService.deleteOneUser(u._id);
    u = await beachService.getUser(u._id);
    assert(u == null);
  }); //Working

  test('get all users', async function () {
    for (let u of users) {
      await beachService.createUser(u);
    }

    const allUsers = await beachService.getUsers();
    assert.equal(allUsers.length, users.length);
  }); //Working

  test('get users detail', async function () {
    for (let u of users) {
      await beachService.createUser(u);
    }

    const allUsers = await beachService.getUsers();
    for (var i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), 'returnedUser must be a superset of newUser');
    }
  }); //Working

  test('get all users empty', async function () {
    const allUsers = await beachService.getUsers();
    assert.equal(allUsers.length, 0);
  }); //Working

});