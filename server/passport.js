const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

//user model
const User = require('./models/User');

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtBody, done) => {
        try {
            const user = await User.findById(jwtBody.sub);
            if (!user) {
                return done(null, false);
            }
            done(null, user)
        } catch (error) {
            done(error, false)
        }
    }
));

passport.use(new localStrategy(
    {
        usernameField: 'mail',
        passReqToCallback: true,
    },
    async (req, mail, password, done) => {
        const user = await User.findOne({ 'local.mail': mail })
        if (!user) {
            return done(null, false);
        }
        if (user.local.password !== password) {
            return done(null, false);
        }
        done(null, user);
    }
));

passport.use('google', new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_clientID,
    clientSecret: process.env.GOOGLE_clientSecret,
    passReqToCallback: true
},
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            const valid = await User.findOne({ "google.id": profile.id });
            if (valid) {
                return done(null, valid);
            }
            if (!req.user) {
                const newUser = new User({
                    google: {
                        id: profile.id,
                        name: profile.displayName
                    },
                    local: {
                        mail:profile.id
                    }
                });
                await newUser.save();
                return done(null, newUser);
            }
            const authUser = await User.findByIdAndUpdate(
                req.user._id,
                {
                    $set: {
                        google: {
                            id: profile.id,
                            name: profile.displayName
                        }
                    }
                },
                { new: true });
            return done(null, authUser);

        } catch (error) {
            done(error, false, error.message);
        }
    }
));

passport.use('facebook', new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_clientID,
    clientSecret: process.env.FACEBOOK_clientSecret,
    passReqToCallback: true
},
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            const valid = await User.findOne({ "facebook.id": profile.id });
            if (valid) {
                return done(null, valid);
            }
            if (!req.user) {
                const newUser = new User({
                    facebook: {
                        id: profile.id,
                        name: profile.displayName
                    },
                    local: {
                        mail:profile.id
                    }
                });
                await newUser.save();
                return done(null, newUser);
            }
            const authUser = await User.findByIdAndUpdate(
                req.user._id,
                {
                    $set: {
                        facebook: {
                            id: profile.id,
                            name: profile.displayName
                        }
                    }
                },
                { new: true });
            return done(null, authUser);
        } catch (error) {
            done(error, false, error.message);
        }
    }
));
