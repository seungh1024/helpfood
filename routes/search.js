const express = require('express');

const {Combination} = require('../models');

router.get('/:main',async(req,res,next)=>{
    try{
        const menu = await Combination.findAll({
            where:{
                main:req.params.main
            }
        });
        res.json({
            code:200,
            list:menu.map(i=>i.side)
        })
    }catch(error){
        console.error(error);
        next(error);
    }
})

const router = express.Router();

module.exports = router;