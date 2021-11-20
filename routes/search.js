const express = require('express');

const {sequelize} = require('../models');

const router = express.Router();

router.get('/:main',async(req,res,next)=>{
    try{
        const [result,metadata] = await sequelize.query(`
            select foods.name as FoodName, foods.link as FoodLink ,
            combinations.name as ComFood
            from foods, combinations 
            where foods.name = '${req.params.main}' or
            combinations.name = '%${req.params.main}%';
        `);
        
        console.log(result);
        var list = result.map(r=>r.ComFood);
        list.unshift({"FoodName":result[0].FoodName,"FoodLink":result[0].FoodLink});
        
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