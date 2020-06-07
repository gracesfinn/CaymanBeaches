'use strict';

const CheckIn = require('../models/check-in');
const User = require('../models/user');
const Beach = require('../models/beach');



const CheckIns = {

  checkIn: {
    handler: async function(request, h) {
      const beaches = await Beach.find().lean();
      return h.view('checkIn', { title: 'Check In', beaches: beaches });
    }
  },

  create: {
      handler: async function(request, h) {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;
        const date = new Date();
        const beachId = request.params.id;
        const beach = await Beach.findById(beachId);

        const newCheckIn = new CheckIn({
          beach: beach,
          beachName: beach.name,
          beachImage: beach.imageMain,
          member: user._id,
          memberName: user.firstName + " " + user.lastName,
          groupSize: data.groupSize,
          comment: data.comment,
          date: date.toDateString(),
        });
      await newCheckIn.save();
      return h.redirect('/checkIn', {beach: beach});
    }
  },
  showCheckIns:{
    handler: async function(request, h) {
      const checkIns = await CheckIn.find().lean();
      const beach = await Beach.find().lean;
      console.log(checkIns);
      return h.view("checkIn",{
        title: 'Check In',
        checkIns: checkIns,
        beach: beach
      });
    }
  },
  showAdminCheckIns:{
    handler: async function(request, h) {
      const checkIns = await CheckIn.find().lean();
      const beach = await Beach.find().lean;
      console.log(checkIns);
      return h.view("adminCheckIn",{
        title: 'Check In',
        checkIns: checkIns,
        beach: beach
      });
    }
  },
  deleteCheckIn:{
    handler: async function(request, h) {
      const id = request.params.id;
      const checkIn = await CheckIn.findById(id).lean();
      await CheckIn.removeCheckIn(id);
      return h.redirect('/adminCheckIn');
    }
  }




};

module.exports = CheckIns;