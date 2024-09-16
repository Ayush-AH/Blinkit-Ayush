const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const userModel = require("../models/user-model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://www.example.com/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await userModel.findOne({
          email: profile.emails[0].value,
        });

        if (!user) {
          const newUser = await userModel.create({
            email: profile.emails[0].value,
          });
          return cb(err, newUser);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  return cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await userModel.findOne({ _id: id });
  return cb(null, user);
});

module.exports = passport;
