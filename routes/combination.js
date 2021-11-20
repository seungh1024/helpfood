const express = require('express');

const {Combination,Review, Food,sequelize} = require('../models');
const Sequelize = require('sequelize');
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

        const datas = req.body.hashtags;
        
        
        for(let data of datas){
            const review = await Review.findOne({
                where:{
                    tag:data,
                    CombinationName: combination[0].name
                }
            });
            
            if(review){
                await Review.update({
                    count:review.count+1
                },{
                    where:{
                        tag:data,
                        CombinationName:combination[0].name
                    }
                })
            }else{
                await Review.create({
                    tag:data,
                    count:0,
                    CombinationName:combination[0].name
                })
            }
            
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

router.get('/:main/list',async(req,res,next)=>{
    try{
        const food = await Combination.findAll({
            include:{
                model:Review,
                attributes:[
                    'tag'
                ],
                order: 'count desc'
                
            },
            attributes:['name','link'],
            distinct:true,
            where:{
                main:req.params.main
            }
        });
        
        res.json({
            code:200,
            food
        });
    }catch(error){
        console.error(error);
        next(error);
    }
})

module.exports = router;