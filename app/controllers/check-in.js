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
            const date = new Date();


            const rawBeach = request.payload.beach. split (',');
            const beach = await Beach.findOne({
            });
            const newCheckIn = new CheckIn({
                member: user,
                memberName: user.firstName + ' ' + user.lastName,
                beach: beach,
                beachName: beach.name,
                beachImage: beach.imageMain,
                groupSize: data.groupSize,
                comment: data.comment,
                date: date.toDateString(),


            });
            await newCheckIn.save();
            return h.redirect('/checkIn');
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
    }




};

module.exports = CheckIns;