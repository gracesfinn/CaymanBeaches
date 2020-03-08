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
        handler: async function(request, h) {
            const reviews = await Reviewed.find().populate('reviewer').lean();
            return h.view('report', {
                title: 'Reviews so far',
                reviews: reviews
            });
        }
    },
    review: {
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id).lean();
                const data = request.payload;
                const newReview = new Reviewed({
                    location: data.location,
                    rating: data.rating,
                    reviewer: user._id
                });
                await newReview.save();
                return h.redirect('/report');
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    }
};

module.exports = Reviews;