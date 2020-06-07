'use strict';

const assert = require('chai').assert;
const BeachService = require('./beaches-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('CheckIn API tests', function () {
  let checkIn = fixtures.checkIns;
  let newCheckIn = fixtures.newCheckIn;

  const beachService = new BeachService('http://localhost:3000');

  setup(async function () {
    await beachService.deleteAllCheckIns();
  });

  teardown(async function () {
    await beachService.deleteAllCheckIns();
  });

  test('get checkIn', async function () {
    const c1 = await beachService.createCheckIn(newCheckIn);
    const c2 = await beachService.getCheckIns(c1._id);
    assert.deepEqual(c1, c2);
  }); //Working

  test('create a checkIn', async function () {
    const returnedCheckIn = await beachService.createCheckIn(newCheckIn);
    assert(_.some([returnedCheckIn, newCheckIn]),  'returnedBeach must be a superset of newBeach');
    assert.isDefined(returnedCheckIn._id);
  });

});