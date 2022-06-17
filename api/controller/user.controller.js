const UserModel = require("../modal/user.model");
const RevenueData = require("../modal/revenue.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  UserModel.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(401).send({
        message: "User not found!",
      });
    }
    bcrypt.compare(user.password, req.body.password, (err, data) => {
      
      if (data) {
        jwt.sign(
          {
            email: user.email,
          },
          "secretKey",
          (error, token) => {
            return res.status(200).send({
              email: user.email,
              token: token,
            });
          }
        );
      } else {
        return res.status(401).send({ message: "Invalid Password" });
      }
    });
  });
};
exports.register = async (req, res) => {
  let user = new UserModel({
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};


exports.revenue = async (req, res) => {
  if (req.body) {
    const bearerHeader = req.headers["authorization"];
    if (req.headers["authorization"]) {
        if(bearerHeader !== 'undefined'){
         const bearer = bearerHeader.split(" ")
         
         const bearerToken = bearer[1]
         jwt.verify(bearerToken,"secretKey", (error, decode)=>{
            
             if(error){
                 return res.status(401).send({ message: "Unauthorized Access" })
             }
             
             RevenueData.find().then(data=>{
                   res.status(200).send(data)
               }).catch(err=>{
                   res.status(400).send(err)
               })
         })
        }else {
      res.status(403).send({ message: "Access Denied" });
    }
    } else {
      res.status(403).send({ message: "Access Denied" });
    }
  } else {
    res
      .status(400)
      .send({
        message:
          "Server could not understand the syntax due to invalid syntax",
      });
  }
};
