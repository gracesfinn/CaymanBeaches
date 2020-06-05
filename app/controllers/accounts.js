'use strict';

const User = require('../models/user');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const Accounts = {
    index: {
        auth:false,
        handler: function(request, h) {
            return h.view('main', { title: 'Cayman Beaches' });
        }
    },
    showSignup: {
        auth: false,
        handler: function(request, h) {
            return h.view('signup', { title: 'Sign up' });
        }
    },
    signup: {
        auth: false,
        validate: {
            payload: {
                // begin with upper case letter and then 2+ lower case letters
                firstName: Joi.string().regex(/^[A-Z][a-z]{2,}$/),

                // begin with upper case letter, then any 2+ characters
                lastName: Joi.string().regex(/^[A-Z]/).min(3),
                email: Joi.string().email().required(),

                password: Joi.string().min(8)               // min 8 characters
            },
            options: {
                abortEarly: false
            },
            failAction: function(request, h, error) {
                return h
                  .view('signup', {
                      title: 'Sign up error',
                      errors: error.details
                  })
                  .takeover()
                  .code(400);
            }
        },
        handler: async function(request, h) {
            try {
                const payload = request.payload;
                let user = await User.findByEmail(payload.email);
                if (user) {
                    const message = 'Email address is already registered';
                    throw Boom.badData(message);
                }
                const hash = await bcrypt.hash(payload.password, saltRounds);    // ADDED

                const newUser = new User({
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    password: hash
                });
                user = await newUser.save();
                request.cookieAuth.set({ id: user.id });
                return h.redirect('/home');
            } catch (err) {
                return h.view('signup', { errors: [{ message: err.message }] });
            }
        }
    },
    showLogin: {
        auth: false,
        handler: function(request, h) {
            return h.view('login', { title: 'Login to Review' });
        }
    },
    about: {
        auth: false,
        handler: function(request, h) {
            return h.view('about', { title: 'About Us' });
        }
    },
    login: {
        auth: false,
        validate: {
            payload: {
                email: Joi.string()
                  .email()
                  .required(),
                password: Joi.string().required()
            },
            options: {
                abortEarly: false
            },
            failAction: function(request, h, error) {
                return h
                  .view('login', {
                      title: 'Login error',
                      errors: error.details
                  })
                  .takeover()
                  .code(400);
            }
        },
        handler: async function(request, h) {
            const { email, password } = request.payload;
            try {
                let user = await User.findByEmail(email);
                if (!user) {
                    const message = 'Email address is not registered';
                    throw Boom.unauthorized(message);
                }
                else if (user.email === "admin@caymanbeaches.com"){
                    request.cookieAuth.set({ id: user.id });
                    return h.redirect('/report');
                }
                if (!await user.comparePassword(password)) {         // EDITED (next few lines)
                    const message = 'Password mismatch';
                    throw Boom.unauthorized(message);
                } else {
                    request.cookieAuth.set({ id: user.id });
                    return h.redirect('/home');
                }                                                    // END OF EDITED PART
            } catch (err) {
                return h.view('login', { errors: [{ message: err.message }] });
            }
        }
    },
    logout: {
        handler: function(request, h) {
            request.cookieAuth.clear();
            return h.redirect('/');
        }
    },
    showSettings: {
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id).lean();
                return h.view('settings', { title: 'Settings', user: user });
            } catch (err) {
                return h.view('login', { errors: [{ message: err.message }] });
            }
        }
    },
    updateSettings: {
        validate: {
            payload: {
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string()
                  .email()
                  .required(),
                password: Joi.string().required()
            },
            options: {
                abortEarly: false
            },
            failAction: function(request, h, error) {
                return h
                  .view('settings', {
                      title: 'Sign up error',
                      errors: error.details
                  })
                  .takeover()
                  .code(400);
            }
        },

        handler: async function(request, h) {
            try {

                const userEdit = request.payload;
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const hash = await bcrypt.hash(userEdit.password, saltRounds);
                user.firstName = userEdit.firstName;
                user.lastName = userEdit.lastName;
                user.email = userEdit.email;
                user.password = hash                            //User can edit their password safely
                await user.save();
                return h.redirect('/settings');
            }catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },

    deleteUser:{
        handler: async function(request, h) {
            const id = request.params.id;
            const beach = await User.findById(id).lean();
            await User.removeUser(id);
            return h.redirect('/report');
        }
    }

};

module.exports = Accounts;