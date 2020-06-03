'use strict';

const Accounts = require('./app/controllers/accounts');
const CheckIns = require('./app/controllers/check-in');
const Beaches = require('./app/controllers/beaches');


module.exports = [
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },

    { method: 'POST', path:  '/beach', config: Beaches.create },


    { method: 'POST', path: '/checkIn', config: CheckIns.create },
    { method: 'GET', path: '/checkIn', config: CheckIns.showCheckIns},

    //{ method: 'GET', path: '/home', config: Reviews.home },
    { method: 'GET', path: '/home', config: Beaches.showBeaches },
    { method: 'GET', path: '/report', config: Beaches.showAdminBeaches },

    { method: 'GET', path: '/update/{id}', config: Beaches.showUpdate},
    { method: 'POST', path: '/update/{id}', config: Beaches.updateBeach},
    { method: 'GET', path: '/update/delete/{id}', config: Beaches.deleteBeach},

    { method: 'GET', path: '/user/delete/{id}', config: Accounts.deleteUser},


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
    },
    {
        method: 'GET',
        path: '/welcome/{user}',
        handler: function (request, reply) {
            return 'Welcome ' + request.params.user;
        }
    }
    ];