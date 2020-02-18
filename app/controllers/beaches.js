'use strict';

const Beach = require('../models/beach');
const User = require('../models/user');

const Beaches = {
  create: {
    handler: async function(request, h) {
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      const data = request.payload;
      const newBeach = new Beach({
        name: data.name,
        description: data.description,
        categories: data.categories,
        creator: user._id
      });
      await newBeach.save();
      return h.redirect('/report');
    }
  }
};

module.exports = Beaches;



