const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

//require expensyaUser schema   
const ExpensyaUser = require('../models/expensyaUserSchema');


//register
router.post('/register', async (req, res) => {
    try {
        const expensyaUserFound = await ExpensyaUser.findOne({ email: req.body.email });
        if (expensyaUserFound == null) {
            // hashage de password
            bcrypt.hash(req.body.password, 10, async (error, hash) => {
                if (error) {
                    res.status(500).json({ message: 'server error!' });
                }
                //store hash in your password DB.
                req.body.password = hash;
                await ExpensyaUser.create(req.body);
                res.json({ message: 'registred successfully!' });
            });
        } else {
            res.status(400).json({ message: 'E-mail exist' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }
});


module.exports = router;