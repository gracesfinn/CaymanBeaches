'use strict';

const Reviewed = require('../models/reviewed');
const User = require('../models/user');



const Reviews = {
    home: {
        handler: async function(request, h) {
            const candidates = await Candidate.find().lean();
            return h.view('home', { title: 'Write a Review', candidates: candidates});
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
                const rawCandidate = request.payload.candidate.split(',');
                const candidate = await Candidate.findOne({
                    lastName: rawCandidate[0],
                    firstName: rawCandidate[1]
                });
                const newReview = new Reviewed({
                    location: data.location,
                    rating: data.rating,
                    reviewer: user._id
                });
                await newReview.save();
                return h.redirect('/home');
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    }
};

module.exports = Reviews;