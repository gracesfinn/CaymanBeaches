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
  },

  findByBeach: {
    auth: false,
    handler: async function(request, h) {
      const checkIns = await Donation.find({ beach: request.params.id });
      return checkIns;
    }
  },
  newCheckIn: {
    auth: false,
    handler: async function(request, h) {
      let checkIn = new checkIn(request.payload);
      const beach = await Beach.findOne({ _id: request.params.id });
      if (!beach) {
        return Boom.notFound('No Candidate with this id');
      }
      checkIn.beach = beach._id;
      checkIn = await checkIn.save();
      return checkIn;
    }
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await CheckIn.deleteMany({});
      return { success: true };
    }
  }

};
module.exports = CheckIns;