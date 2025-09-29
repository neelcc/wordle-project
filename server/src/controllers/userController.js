import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from '../model/userModel.js'

export const userRegister = async (req,res) =>{

    const { username , password } = req.body

    if(!username) {
        return res.status(400).send({
            message : "Username is missing!",
            success : false
        })
    }

    if(!password) {
        return res.status(400).send({
            message : "Password is missing!",
            success : false
        })
    }
    
    const isExist = await userModel.findOne({username:username})
    
    if(isExist){
        return res.status(400).send({
            message : "User Already Exist. Use Sign-in or Try Different Username.",
            success : false
        })
    }
    
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await userModel.create({
        username,
        password:hashedPassword
    })

    const token = await jwt.sign({username},process.env.JWT_SECRET,{ expiresIn: "24h" })


    res.status(200).send({
        success:true,
        user,
        token
    })

}


export const userLogin = async (req,res) => {

    const { username , password } = req.body

    if(!username) {
        return res.status(400).send({
            message : "Username is missing!",
            success : false
        })
    }

    if(!password) {
        return res.status(400).send({
            message : "Password is missing!",
            success : false
        })
    }

    const isExist = await userModel.findOne({username:username})
    
    if(!isExist){
        return res.status(400).send({
            message : "User does not exist!",
            success : false
        })
    }

    const isPassMatched = await bcrypt.compare(password,isExist.password)

    console.log(isPassMatched);
    

    if(!isPassMatched){
        return res.status(400).send({
           message : "Password does not matched!",
            success : false
        })
    }   

    const token = await jwt.sign({username},process.env.JWT_SECRET,{ expiresIn: "24h" })

    return res.status(200).send({
        success : true,
        message : "User Signed In",
        token,
        isExist
    })
    
}

export const getPoints = async (req,res) => {

    const userToken = req.user;
    console.log("hafi");
    
    console.log(userToken);
    
    const user = await userModel.findOne({username : userToken.username});
    
    
    return res.status(200).json({
        success:true,   
        user
    })
}