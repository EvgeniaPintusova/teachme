const JWT = require('jsonwebtoken');
const User = require('../models/User');

const signToken = user => {
    return JWT.sign({
        iss: 'wunderlist',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 7) //one week
    }, process.env.JWT_SECRET)
}

module.exports = {
    signUp: async (req, res, next) => {
        const { username, password, mail } = req.body;
        //check users with this mail
        const foundUser = await User.findOne({ 'local.mail': mail })
        if (foundUser) {
            return res.status(403).json({
                success: false,
                message: 'Mail is already in use'
            })
        } else {
            //create a new user
            const newUser = new User({
                local: {
                    username: username,
                    mail: mail,
                    password: password
                }
            });
            await newUser.save();

            //respond token
            const token = signToken(newUser);
            return res.status(201).json({
                success: true,
                message: "Sign Up",
                token,
                name: newUser.local.username
            });
        }
    },

    signIn: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({
            success: true,
            message: "Sign In",
            token,
            name: req.user.local.username
        });
    },

    googleOAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(201).json({
            success: true,
            message: "google authorized",
            token,
            name: req.user.google.name
        });
    },

    facebookOAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(201).json({
            success: true,
            message: "facebook authorized",
            token,
            name: req.user.facebook.name
        });
    },

    getUser: async (req, res, next) => {
        const user = await User.findOne(req.user)
        const {  google, local, facebook } = user;
        const username = local.username || google.name || facebook.name;
        res.status(200).json({
            success: true,
            message: "Get me",
            user: {
                username,
            }
        });
    },

    putUser: async (req, res, next) => {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { local: req.body } },
            { new: true },
            (err, doc) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    });
                }
            });
        const token = signToken(user);

        res.status(200).json({
            success: true,
            message: "User update",
            token
        });
    },

    deleteUser: async (req, res, next) => {
        await User.findByIdAndRemove(req.user._id, (err, doc) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err
                });
            }
            res.status(200).json({
                success: true,
                message: "User deleted",
            });
        })
    },
}
