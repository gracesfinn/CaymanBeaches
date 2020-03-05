'use strict';

const Accounts = require('./app/controllers/accounts');
const Reviews = require('./app/controllers/reviews');
const Beaches = require('./app/controllers/beaches');


module.exports = [
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },
    { method: 'POST', path: '/review', config: Reviews.review },
    { method: 'POST', path:  '/beach', config: Beaches.create },

    //{ method: 'GET', path: '/home', config: Reviews.home },
    { method: 'GET', path: '/home', config: Beaches.showBeaches },
    { method: 'GET', path: '/report', config: Beaches.showBeaches },

    { method: 'GET', path: '/update', config: Beaches.showUpdate},
    { method: 'POST', path: '/update', config: Beaches.updateBeach },

    { method: 'GET', path: '/image', config: Beaches.create },
    { method: 'GET', path: '/beaches/{id}', config: Beaches.selectedBeach },


    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings },



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