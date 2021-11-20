const express =require('express');

const {verifyToken} = require('./middlwares');
const {User,Hashtag,Food} = require('../models');
const { sequelize } = require('../models');
const Op = sequelize.Op;

const router = express.Router();

//선호하는 메뉴 선택
router.post('/choice',verifyToken,async(req,res,next)=>{
    try{
        const user = await User.findOne({
            where:{
                email:req.user.email
            }
        });

        for(let food of req.body.foods){
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
router.get('/my',verifyToken,async(req,res,next) => {
    try{
        const user = await User.findOne({
            where:{
                email:req.user.email
            }
        });
        if(user){
            const food = await user.getFood({});
            console.log(food);
            const datas = food.map(i => i.name);
            
            const [result,metadata] = await sequelize.query(
            `select count(side) as count from combinations
             where main in 
             (select FoodName from UserFood 
                where UserEmail = '${req.user.email}');`
            );

            res.json({
                code:200,
                food:food,
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
            food:food
        });
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/rechoice',verifyToken,async(req,res,next)=>{
    try{
        const user = await User.findOne({
            where:{
                email:req.user.email
            }
        });
        const datas = await user.getFood();

        for(let data of datas){
            await user.removeFood(data);
        };

        for(let food of req.body.foods){
            await user.addFood(food);
        }
        res.json({
            code:200,
            message:'취향 업데이트 성공'
        })
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.get('/',async(req,res,next)=>{
    try{
        const food = await Food.findAll({});
        res.json({
            code:200,
            food
        })
    }catch(error){
        console.error(error);
        next(error);
    }
})


module.exports = router;
