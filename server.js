const express = require('express');
const app = express();
require('dotenv').config();

//allow bodyParser;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//use routes
app.use('/user',require('./routes/userRoutes.js'));
app.use("/user/andarBahar",require("./routes/andharBharRoute.js"));
app.use("/admin", require("./routes/adminRoute.js"));
app.use("/dev", require("./routes/devRoute.js"));

const server = app.listen(process.env.PORT , ()=>{
    console.log(`server listen at http://localhost:${process.env.PORT}`);
});

const io = require('socket.io')(server,{
    pingTimeOut:60000,
    cors:{
        origin:`http://127.0.0.1:${process.env.FPORT}`
    }
});

io.on('connection',(socket)=>{
    console.log("socket is connected");
});