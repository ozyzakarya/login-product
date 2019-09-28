require("module-alias/register");
const express = require('express');
const router = express.Router()
const crypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { users : User } = require('@models');
const { response, passport } = require('@helpers');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: {email : email}})
    if (!user){
        return res.status(400).json(response(false, 'User not found'));
    } else {
        const comperepassword = await crypt.compare(password, user.password)
        if (comperepassword) {
            const payload = { id : user.id, email : user.email, password : user.password}
            const token  = await jwt.sign(payload, 'you_jwt_secret')
            return res.status(200).json({response : true,  token: 'Bearer ' + token})
        }
    }
})

router.get('/user', passport.authenticate('jwt'), async( req, res) => {
    const user = await User.findAll()
    res.json(user);
})

module.exports = router