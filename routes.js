const Reviews = require('./app/controllers/reviews');

module.exports = [
    { method: 'GET', path: '/', config: Reviews.index },
    {
        method:'GET',
        path:'/{param*}',
        handler:{
            directory:{
                path:'./public'
            }
        }
    }];