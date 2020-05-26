'use strict'

const Beach = require('../models/beach');
const Boom = require('@hapi/boom');

const Beaches = {

  find: {
    auth: false,
    handler: async function(request, h) {
      const beaches = await Beach.find();
      return beaches;
    }
  },
  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const beaches = await Beach.findOne({ _id: request.params.id });
        if (!beaches) {
          return Boom.notFound('No Beach with this id');
        }
        return candidate;
      } catch (err) {
        return Boom.notFound('No Candidate with this id');
      }
    }
  },
  create: {
    auth: false,
    handler: async function(request, h) {
      const newBeach = new Candidate(request.payload);
      const beach = await newBeach.save();
      if (beach) {
        return h.response(beach).code(201);
      }
      return Boom.badImplementation('error creating candidate');
    }
  },
  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await Beach.remove({});
      return { success: true };
    }
  },
  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      const response = await Beach.deleteOne({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  }
};
module.exports = Beaches;