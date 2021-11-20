const express = require('express');

const {sequelize} = require('../models');

const router = express.Router();

router.get('/:main',async(req,res,next)=>{
    try{
        var list = [];
        const [result,metadata1] = await sequelize.query(`
            select foods.name as FoodName, foods.link as FoodLink 
            from foods
            where foods.name = '${req.params.main}';
        `);

        const [com,metadata2] = await sequelize.query(`
            select combinations.name as ComFood, 
            combinations.link as ComLink 
            from combinations
            where combinations.name like '%${req.params.main}%';
        `)
        
        
        list.push({"FoodName":result[0].FoodName,"FoodLink":result[0].FoodLink});
        for(let data of com){
            list.push({"FoodName":data.ComFood,"FoodLink":data.ComLink})
        }

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