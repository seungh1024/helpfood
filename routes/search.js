const express = require('express');

const {sequelize} = require('../models');

const router = express.Router();

router.get('/:main',async(req,res,next)=>{
    try{
        const [result,metadata] = await sequelize.query(`
            select foods.name as FoodName, 
            combinations.name as ComFood
            from foods, combinations 
            where foods.name = '${req.params.main}' or
            combinations.name = '%${req.params.main}%';
        `);
        
        var list = result.map(r=>r.ComFood);
        list.unshift(result[0].FoodName);
        
        res.json({
            code:200,
            list:list
        })
    }catch(error){
        console.error(error);
        next(error);
    }
})

module.exports = router;