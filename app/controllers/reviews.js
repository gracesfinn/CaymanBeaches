'use strict';

const Reviews = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Write a Review' });
        }
    },
    report: {
        handler: function(request, h) {
            return h.view('report', { title: 'Reviews so far' });
        }
    },
    review: {
        handler: function(request, h) {
            const data = request.payload;
            var reviewerEmail = request.auth.credentials.id;
            data.reviewer = this.users[reviewerEmail];
            this.reviews.push(data);
            return h.redirect('/report');
        }
    }
};

module.exports = Reviews;