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
        location: data.location,
        description: data.description,
        categories: data.categories
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
  },
  showUpdate:{
    auth: false,
    handler: function(request, h) {
      return h.view('update', { title: 'Update Beach' });
    }
  },

  updateBeach: {
    handler: async function(request, h) {
      try {
        const beachEdit = request.payload;
        const id = request.auth.credentials.id;
        const beach = await Beaches.find(name);
        beach.name = beachEdit.name;
        beach.loction = beachEdit.location;
        beach.descripton = beachEdit.description;
        beach.categories = beachEdit.categories;
        await beach.save();
        return h.redirect('/report');
      }catch (err) {
        return h.view('home', { errors: [{ message: err.message }] });
      }
    },

    deleteBeach:{

    }
  }

};

module.exports = Beaches;



