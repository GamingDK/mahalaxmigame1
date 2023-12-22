const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

//allow bodyParser;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//use routes
app.use('/user',require('./routes/userRoutes.js'));
app.use("/user/andarBahar",require("./routes/andharBharRoute.js"));
app.use("/admin", require("./routes/adminRoute.js"));
app.use("/dev", require("./routes/devRoute.js"));

const server = app.listen(process.env.PORT , ()=>{
    console.log(`server listen at http://localhost:${process.env.PORT}`);
});