const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { createUser, findUserByEmail } = require('../models/auth.model');

exports.register = async (req,res)=>{
    const {name,email, password}= req.body;
    try{
        const hashedpassword= await bcrypt.hash(password,10);
        const user = await createUser(name,email, hashedpassword);
        res.status(201).json({ message: 'User created', user });

    }
    catch(error){
        console.log(error);
        if(error.code==="23505"){
            res.status(409).json({ message: 'Email already exists' });
        }
        res.status(500).send('Server Error');
    }

}

exports.login = async (req,res)=>{
    const {email, password}= req.body;
    try{
        const user=await  findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatched =await bcrypt.compare(password,user.password);
        if(!isMatched){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({id: user.id, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: '55h'});
        res.status(200).json({token: token});

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Server Error'});
    }

}