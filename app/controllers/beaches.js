'use strict';

const Beach = require('../models/beach');
const User = require('../models/user');

const Beaches = {
  create: {
    handler: async function(request, h) {
      const id = request.auth.credentials.id;
      const user = await User.findById(id).lean();
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
  },
  showBeaches:{
    handler: async function(request, h) {
      const beaches = await Beach.find().lean();
      console.log(beaches);
      return h.view("report",{
        title: 'beaches',
        beaches: beaches
      });
    }
  },
  selectedBeach:{
    handler: async function(request, h) {
      const id = request.params.id;
      const beach = await Beach.findById(id).lean();
      console.log(beach);
      return h.view("beach",{
        title: 'beaches',
        beach: beach
      });
    }
  }
};

module.exports = Beaches;



