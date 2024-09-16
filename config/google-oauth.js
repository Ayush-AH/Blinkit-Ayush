const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require("../model/user-model")
const jwt = require("jsonwebtoken")

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
},
    async function (accessToken, refreshToken, profile, done) {

        try{
        let user = await userModel.findOne({email:profile.emails[0].value})
            if(!user){
                user = await userModel.create({
                    name:profile.displayName,
                    email:profile.emails[0].value
                })
            }
    
            let token = jwt.sign({email:user.email,_id:user._id}, process.env.JWT_SECRET)
            return done(null, token);
        }
        catch(err){
            return done(null, err);
        }
    }));

// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

module.exports = passport