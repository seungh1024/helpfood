const express = require('express');

const {Combination,Review, Food,sequelize} = require('../models');

const router = express.Router();

router.post('/post',async(req,res,next)=>{
    try{
        await Food.findOrCreate({
            where:{
                name: req.body.main
            }
        });
        await Food.findOrCreate({
            where:{
                name: req.body.side
            }
        });

        const combination = await Combination.findOrCreate({
            where:{
                name:`${req.body.main} X ${req.body.side}`
            },
            defaults:{
                name:`${req.body.main} X ${req.body.side}`,
                main: req.body.main,
                side: req.body.side
            }
        });
        console.log(combination);

        const datas = req.body.hashtags;
        
        for(let data of datas){
            await Review.create({
                tag:data,
                CombinationName:combination[0].name
            })
        }
        
        res.json({
            code:200,
            message:'등록 완료',
        })
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;