'use strict';

const assert = require('chai').assert;
const BeachService = require('./beaches-service');
const fixtures = require('./fixtures.json');

suite('Candidate API tests', function () {

  let beaches = fixtures.beaches;
  let newBeach = fixtures.newBeach;

  const beachService = new BeachService('http://localhost:3000');

  test('create a beach', async function () {
    const returnedBeach = await beachService.createBeach(newBeach);
    assert.equal(returnedBeach.name, newBeach.name);
    assert.equal(returnedBeach.location, newBeach.location);
    assert.equal(returnedBeach.description, newBeach.description);
    assert.isDefined(returnedBeach._id);
  });
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
