const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect('mongodb://localhost:27017/expensyaDataBase', options).then(success => {
    console.log("successfully connected to Database");
}).catch(error => {
    console.log("error in connecting to Database");
});