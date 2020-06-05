'use strict';

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
      try{
      const beach = await Beach.findOne({ _id: request.params.id });
      if (!beach) {
        return Boom.notFound('No Beach with this id');
      }
      return beach;
    } catch(err) {
      return Boom.notFound('No Beach with this id');
    }
  }
  },
  create: {
    auth: false,
    handler: async function(request, h) {
      const newBeach = new Beach(request.payload);
      const beach = await newBeach.save();
      if (beach) {
        return h.response(beach).code(201);
      }
      return Boom.badImplementation('error creating beach');
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
module.exports = Beaches
