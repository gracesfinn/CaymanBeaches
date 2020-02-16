'use strict';

const Accounts = require('./app/controllers/accounts');
const Reviews = require('./app/controllers/reviews');

module.exports = [
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },
    { method: 'POST', path: '/review', config: Reviews.review },

    { method: 'GET', path: '/home', config: Reviews.home },
    { method: 'GET', path: '/report', config: Reviews.report },
    {
        method:'GET',
        path:'/{param*}',
        handler:{
            directory:{
                path:'./public'
            }
        },
        options:{auth:false}
    }
    ];