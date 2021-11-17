const express = require('express');
const passport = require('passport');
const bcrypt =require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlwares');

const User = require('../models/user');

const router = express.Router();

router.post('/join',isNotLoggedIn,async(req,res,next)=>{
    const {email,password} = req.body;

    try{
        const exUser = await User.findOne({
            where:{email}
        });

        if(exUser){
            res.json({
                code:401,
                message: '이미 가입한 이메일 입니다'
            });
        };

        const hash = await bcrypt.hash(password,12);

        const user = await User.create({
            email,
            password: hash
        });

        if(user){
            res.json({
                code:200,
                message: '회원 가입이 완료'
            })
        }
        
        
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/login',isNotLoggedIn,(req,res,next)=>{
    passport.authenticate('local',(authError,user,info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.json({
                code:404,
                message:`${info.message}`
            })
        }

        return req.login(user,async(loginError)=>{
            if(loginError){
                console.error(loginError);
                next(loginError);
            }
            res.json({
                code:200,
                message:'로그인 성공'
            });
        });
    })(req,res,next);
});

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout();
    req.session.destroy();
    res.json({
        code:200,
        message: '로그아웃 성공'
    })
});

module.exports = router;