
const User = require('../model/userModel')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')


const createUser =async(req,res)=>{

    try {

        const {firstName,lastName,email,password}= req.body

        const userExist = await User.findOne({email:email})
        console.log(userExist);

        if (userExist) {

            return res.status(400).json({message:'User already exist'})
        }

        const newUser = new User({firstName,lastName,email,password})

        await newUser.save()

        res.status(201).json({status:'success',message:'User created succesfully',data:newUser})

       
    } catch (error) {

        res.status(400).json({error:error.message})

        
    }
}

const login = async(req,res)=>{
    try {

        const {email,password} = req.body
        // console.log(req.body);

        const userExist = await User.findOne({email})

        
        if (userExist) {

            const isMatch = await userExist.comparePassword(password)


            if (!isMatch) {
                res.status(400).json({message:'incorrect password'})                
            }

            const token = jwt.sign({id:userExist._id},process.env.secretKey)
            console.log(token);

            res.json({status:'true',token:token})
            
        }

        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports ={createUser,login}