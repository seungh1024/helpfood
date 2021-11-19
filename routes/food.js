const express =require('express');

const {isLoggedIn} = require('./middlwares');
const {User,Hashtag} = require('../models');
const { sequelize } = require('../models');
const Op = sequelize.Op;

const router = express.Router();

//선호하는 메뉴 선택
router.post('/choice',isLoggedIn,async(req,res,next)=>{
    try{
        const user = await User.findOne({
            where:{
                email:req.user.email
            }
        });

        for(let food of req.body.foods){
            console.log(food);
            await user.addFood(food);
        };

        res.json({
            code:200,
            message:'메뉴 저장 성공'
        });
        
    }catch(error){
        console.error(error);
        next(error);
    }
})

//내가 선택한 메뉴 확인
router.get('/my',isLoggedIn,async(req,res,next) => {
    try{
        const user = await User.findOne({
            where:{
                email:req.user.email
            }
        });
        if(user){
            const food = await user.getFood({
                attributes:['name']
            });
            const datas = food.map(i => i.name);
            
            const [result,metadata] = await sequelize.query(
            `select count(side) as count from combinations
             where main in 
             (select FoodName from UserFood 
                where UserEmail = '${req.user.email}');`
            );

            res.json({
                code:200,
                food:food.map(i=>i.name),
                count:food.length,
                combination: result[0].count
            })
        }else{
            res.json({
                code:404,
                message: '존재하지 않는 사용자 입니다'
            })
        }
    }catch(error){
        console.error(error);
        next(error);
    }
});

//음식 맛에대한 해시태그 받아오기
router.get('/hashtag',async(req,res,next)=>{
    try{
        const hashtag = await Hashtag.findAll({
            attributes:['tag']
        });
        res.json({
            code:200,
            hashtag:hashtag.map(i=>i.tag)
        })
    }catch(error){
        console.error(error);
        next(error);
    }
});

//맛에 대한 해시태그로 음식 받아오기
router.get('/:hashtag/taste',async(req,res,next)=>{
    try{
        const hashtag = await Hashtag.findOne({
            where:{
                tag:req.params.hashtag
            }
        });
        
        const food = await hashtag.getFood();
        res.json({
            code:200,
            food:food.map(i => i.name)
        });
    }catch(error){
        console.error(error);
        next(error);
    }
});




module.exports = router;
