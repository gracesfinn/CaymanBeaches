const Users= require('./app/api/users');
const Beaches= require('./app/api/beaches-api');
const CheckIns= require('./app/api/check-in-api');

module.exports = [
  {method: 'GET', path:'/api/beaches', config:Beaches.find},
  {method: 'GET', path: '/api/beaches/{id}', config:Beaches.findOne},
  { method: 'POST', path: '/api/beaches', config: Beaches.create },
  { method: 'DELETE', path: '/api/beaches/{id}', config: Beaches.deleteOne },
  { method: 'DELETE', path: '/api/beaches', config: Beaches.deleteAll },

  { method: 'GET', path: '/api/users', config: Users.find },
  { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
  { method: 'POST', path: '/api/users', config: Users.create },
  { method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
  { method: 'DELETE', path: '/api/users', config: Users.deleteAll },

  { method: 'GET', path: '/api/checkIns', config: CheckIns.findAll },

];