const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

// register route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email and password',
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
               success: false,
               message: 'Email already registered',
            });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRE ||'30d'},
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.log('Full error:', error);
        res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message,
        });
    }
});

//login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
        }

        // console.log(email, password);
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // console.log(user);
        const isPasswordMatch = await user.matchPassword(password);
        if(!isPasswordMatch){
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
        // console.log(isPasswordMatch);

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRE || '30d'},
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error loggin in',
            error: error.message,
        });
    }
});

module.exports = router;