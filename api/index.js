const express = require("express")
const config = require("./config.js")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const cors = require("cors")
require("./controller/mongoose.connect")
app.use(cors())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(config.port , ()=>{
    console.log(`Server is running on  http://localhost${config.port}`)
} )
require("./route/user.route")(app)