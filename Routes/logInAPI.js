const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//require expensyaUser schema   
const ExpensyaUser = require('../models/expensyaUserSchema');


//login
router.post('/login', async (req, res) => {
    try {
        const expensyaUserFound = await ExpensyaUser.findOne({ email: req.body.email });
        if (expensyaUserFound == null) {
            res.status(400).json({ message: 'Please verify your email or password!' });
        }
        else {
            const passwordEqual = await bcrypt.compare(req.body.password, expensyaUserFound.password);
            if (passwordEqual == true) {
                // create a token
                const tokenData = {
                    email: expensyaUserFound.email,
                    expensyaUserId: expensyaUserFound._id,
                    expensyaUserName: expensyaUserFound.expensyaUserName
                };
                const createdToken = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
                res.json({ message: 'Login successfully', token: createdToken });
            }
            else {
                res.status(400).json({ message: 'Please verify your email or password!' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }
});

module.exports = router;