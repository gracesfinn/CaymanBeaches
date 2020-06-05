'use strict';

const CheckIn = require('../models/check-in');
const Boom = require('@hapi/boom');


const CheckIns ={

  findAll:{
    auth: false,
    handler: async function (request, h) {
      const checkIns = await CheckIn.find();
      return checkIns;
    }
  }
};
module.exports = CheckIns;