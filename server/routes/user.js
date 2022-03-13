const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

//routerHelper
const { validateBody, schemas } = require('../helpers/routerHelpers')

//user controller
const UsersController = require('../controllers/user')

//passport-middleware
const passportLocal = passport.authenticate('local', { session: false });
const passportJwt = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('google', { session: false });
const passportFacebook = passport.authenticate('facebook', { session: false });

//routers
router.route('/signup')
    .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.loginSchema), passportLocal, UsersController.signIn);

router.route('/oauth/google')
    .post(passportGoogle, UsersController.googleOAuth);

router.route('/oauth/facebook')
    .post(passportFacebook, UsersController.facebookOAuth);

router.route('/me')
    .get(passportJwt, UsersController.getUser)
    .put(passportJwt, validateBody(schemas.authSchema), UsersController.putUser)
    .delete(passportJwt, UsersController.deleteUser)


module.exports = router;