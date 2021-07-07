const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const passport = require('./passport/passport');
const port = 3000;
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// app.use('/public', express.static(path.join(__dirname, '/public')))
const connect = require('./database/connect');

//import routing
const registerAPI = require('./routes/registerAPI');
const loginAPI = require('./routes/loginAPI');
const logoutAPI = require('./routes/logoutAPI');
// const forgetpasswordAPI = require('./routes/forgetpasswordAPI');
// const resetpasswordAPI = require('./routes/resetpasswordAPI');
// const dashboardAPI = require('./routes/dashboarAPI');


//use routing
app.use('', registerAPI);
app.use('', loginAPI);
app.use('', logoutAPI);
// app.use('', forgetpasswordAPI);
// app.use('', resetpasswordAPI);
// app.use('', dashboardAPI);





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});