'use strict';

const Reviewed = require('../models/reviewed');
const User = require('../models/user');

const Reviews = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Write a Review' });
        }
    },
    report: {
        handler: async function (request, h) {
            const reviews = await Reviewed.find().populate('reviewer').lean();
            return h.view('report', {
                title: 'Reviews so far',
                reviews: reviews
            });
        }
    },
    review: {
        handler:  async function(request, h) {
            const id = request.auth.credentials.id;
            const user = await User.findById(id);
            const data = request.payload;
            const newReview = new Reviewed({
                amount: data.amount,
                method: data.method,
                reviewer:user._id
            });
            await newReview.save();
            return h.redirect('/report');
        }
    }
};

module.exports = Reviews;