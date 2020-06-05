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
            const data = request.payload;

            const beach = await Beach.findOne();
            const newCheckIn = new CheckIn({
                member: user,
                beach: beach,
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
            const beaches = await Beach.find().lean();
            return h.view("checkIn",{
                title: 'Check In',
            });
        }
    },

    showBeaches:{
        handler: async function(request, h) {
            const beaches = await Beach.find().lean();
            console.log(beaches);
            const id = request.auth.credentials.id;
            const user = await User.findById(id).lean();
            if (user.email === "admin@caymanbeaches.com"){
                return h.redirect('/report');
            }
            return h.view("checkIn",{
                title: 'checkIn',
                beaches: beaches
            });
        }
    },


};

module.exports = CheckIns;