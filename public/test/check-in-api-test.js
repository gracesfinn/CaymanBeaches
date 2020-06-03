'use strict';

const assert = require('chai').assert;
const BeachService = require('./beaches-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Check-in API tests', function () {

  let checkIns = fixtures.checkIns;
  let newCheckIn = fixtures.newCheckIn;

  const beachService = new BeachService(fixtures.beachService);

  setup(async function() {
  });

  teardown(async function() {
  });

  test('get all check-ins', async function() {
    for (let c of checkIns) {
      await beachService.createCheckIn(c);
    }

    const allCheckIns = await beachService.getCheckIns();
    assert.equal(allCheckIns.length, checkIns.length);
  });

});

  test('create a checkin', async function() {
    const returnedCheckIn = await beachService.createCheckIn(newBeach);
    await beachService.makeCheckIn(returnedBeach._id, beaches[0]);
    const returnedDonations = await donationService.getDonations(returnedCandidate._id);
    assert.equal(returnedDonations.length, 1);
    assert(_.some([returnedDonations[0]], donations[0]), 'returned donation must be a superset of donation');
  });


