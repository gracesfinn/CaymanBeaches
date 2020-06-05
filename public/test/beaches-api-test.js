'use strict';

const assert = require('chai').assert;
const BeachService = require('./beaches-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Candidate API tests', function () {

  let beaches = fixtures.beaches;
  let newBeach = fixtures.newBeach;

  const beachService = new BeachService('http://localhost:3000');

  setup(async function () {
    await beachService.deleteAllBeaches();
  });

  teardown(async function () {
    await beachService.deleteAllBeaches();
  });

  test('create a beach', async function () {
    const returnedBeach = await beachService.createBeach(newBeach);
    assert(_.some([returnedBeach], newBeach),  'returnedBeach must be a superset of newBeach');
    assert.isDefined(returnedBeach._id);
  }); //Working

  test('get beach', async function () {
    const c1 = await beachService.createBeach(newBeach);
    const c2 = await beachService.getBeach(c1._id);
    assert.deepEqual(c1, c2);
  }); //Working

  test('get invalid beach', async function () {
    const c1 = await beachService.getBeach('1234');
    assert.isNull(c1);
    const c2 = await beachService.getBeach('012345678901234567890123');
    assert.isNull(c2);
  }); // Working

  test('delete a beach', async function () {
    let c = await beachService.createBeach(newBeach);
    assert(c._id != null);
    await beachService.deleteOneBeach(c._id);
    c = await beachService.getBeach(c._id);
    assert(c == null);
  }); //Working

  test('get all beaches', async function () {
    for (let c of beaches) {
      await beachService.createBeach(c);
    }

    const allBeaches = await beachService.getBeaches();
    assert.equal(allBeaches.length, beaches.length);
  });

  test('get beaches detail', async function () {
    for (let c of beaches) {
      await beachService.createBeach(c);
    }

    const allBeaches = await beachService.getBeaches();
    for (var i = 0; i < beaches.length; i++) {
      assert(_.some([allBeaches[i]], beaches[i]), 'returnedBeaches must be a superset of newBeach');
    }
  }); // Working

  test('get all beaches empty', async function () {
    const allBeaches = await beachService.getBeaches();
    assert.equal(allBeaches.length, 0);
  }); //Working





});








/*const assert = require('chai').assert;
const BeachService = require('./beaches-service');
const fixtures = require('./fixtures.json');
const axios = require('axios');
const _ = require('lodash');


suite('Beach API tests', function () {

  let beaches = fixtures.beaches;
  let newBeach = fixtures.newBeach;

  const beachService = new BeachService('http://localhost:3000');


  test('get beaches', async function () {
    const response = await axios.get('http://localhost:3000/api/beaches');
    const beaches = response.data;
    assert.equal(3, beaches.length);

    assert.equal(beaches[0].name, 'Seven Mile Beach');
    assert.equal(beaches[0].location, '19.3339° N, 81.3817° W');
    assert.equal(beaches[0].creator, '5e54791497742c3e5c20eb59');

    assert.equal(beaches[1].name, 'Rum Point');
    assert.equal(beaches[1].location, '19.3637° N, 81.2608° W');
    assert.equal(beaches[1].creator, '5e54791497742c3e5c20eb59');
  });// Working

  test('get one beach', async function () {
    const response = await axios.get('http://localhost:3000/api/beaches');
    const beaches = response.data;
    assert.equal(3, beaches.length);

    const oneBeachUrl = 'http://localhost:3000/api/beaches/' + beaches[0]._id;
    response = await axios.get(oneBeachUrl);
    const oneBeach = response.data;

    assert.equal(oneBeach.name, 'Seven Mile Beach');
    assert.equal(oneBeach.location, '19.3339° N, 81.3817° W');
    assert.equal(oneBeach.creator, '5e54791497742c3e5c20eb59');
  }); //Not working

  test('create a beach', async function () {
    const beachesUrl = 'http://localhost:3000/api/beaches';
    const newBeach ={
      name: 'West Bay',
      location: '19.3637° N, 81.2608° W',
      description: 'Lovely Beach',
    };

    const response = await axios.post(beachesUrl, newBeach);
    const returnedBeach = response.data;
    assert.equal(201, response.status);

    assert.equal(returnedBeach.name, 'West Bay');
    assert.equal(returnedBeach.location, '19.3637° N, 81.2608° W');
    assert.equal(returnedBeach.description, 'Lovely Beach');
  });// Working

  test('delete a beach', async function() {
    let response = await axios.get('http://localhost:3000/api/beaches');
    let beaches = response.data;
    const originalSize = beaches.length;

    const oneCandidateUrl = 'http://localhost:3000/api/beaches/' + beaches[4]._id;
    response = await axios.get(oneCandidateUrl);
    const oneBeach = response.data;
    assert.equal(oneBeach.name, 'West Bay');

    response = await axios.delete('http://localhost:3000/api/beaches/' + beaches[0]._id);
    assert.equal(response.data.success, true);

    response = await axios.get('http://localhost:3000/api/beaches');
    beaches = response.data;
    assert.equal(beaches.length, originalSize - 1);
  }); //  Not working

  test('delete all beaches', async function() {
    let response = await axios.get('http://localhost:3000/api/beaches');
    let beaches = response.data;
    const originalSize = beaches.length;
    assert(originalSize > 0);
    response = await axios.delete('http://localhost:3000/api/beaches');
    response = await axios.get('http://localhost:3000/api/beaches');
    beaches = response.data;
    assert.equal(beaches.length, 0);
  }); // Working


});*/
