const express = require("express")
const router = express.Router()
const passport = require("passport")


router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { session:false , failureRedirect: '/' }),
    (req, res) => {
        res.cookie("token",req.user)
        res.redirect('/products');
    }
);


module.exports = router