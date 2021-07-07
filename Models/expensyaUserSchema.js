const mongoose = require('mongoose');
const expensyaUserSchema = mongoose.Schema({
    expensyaUserName: String,
    email: String,
    password: String,
},
    {
        versionKey: false,
        timestamps: true
    });

module.exports = mongoose.model('expensyaUser', expensyaUserSchema);