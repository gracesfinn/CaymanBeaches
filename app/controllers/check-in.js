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
            const user = await User.findById(id).lean();
            const beach = await Beach.findById(id).lean();
            const data = request.payload;
            const newCheckIn = new CheckIn({
                member: user._id,
                beach: beach._id,
                groupSize: data.groupSize,
                comment: data.comment
            });
            await newCheckIn.save();
            return h.redirect('/checkIn');
        }
    },
    showCheckIns:{
        handler: async function(request, h) {
            const checkIns = await CheckIn.find().lean();
            console.log(checkIns);
            const id = request.auth.credentials.id;
            const user = await User.findById(id).lean();
            return h.view("checkIn",{
                title: 'Beach view',
                beaches: beaches
            });
        }
    },



};

module.exports = CheckIns;