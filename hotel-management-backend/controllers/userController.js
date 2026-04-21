const userSchema = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user ={}
user.register =  async(req, res)=>{
    try{
        const data = req.body;
        const findUser  = await userSchema.findOne({email: data.email});
        if(findUser){
            res.status(400).json({
                message: "User already exists"
            })
        }else{
            const hashedPassword =  await bcrypt.hash(data.password, 10)
            data.password = hashedPassword;
            
            const result = await userSchema.create(data)
             const token =  jwt.sign({userId: result._id}, "secretkey");
             res.status(201).json({
            message: "user registers successfully",
            result,
            token
        })
        }
       
    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}


//signup
user.login =  async(req, res)=>{
    try{
        const data = req.body;
        const findUser  = await userSchema.findOne({email: data.email});
        if(findUser){
            const matchPass = await bcrypt.compare(data.password, findUser.password)
            if(matchPass){
                const token = await jwt.sign({userId: findUser._id}, "secretkey");
                console.log(token)
  res.status(200).json({
                message: "user is successfully signin",
                result:findUser,
                token
            })
            }else{
  res.status(400).json({
                message: "wrong password"
            })
            }
          
        }else{
            res.status(400).json({
                message: "user is not exists"
            })
        }
       
    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

module.exports = user;