const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            tag:{
                type:Sequelize.STRING(15),
                allowNull:true,
                primaryKey:true,
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Hashtag',
            tableName:'hashtags',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        })
    }
    static associate(db){
        db.Hashtag.belongsToMany(db.Food,{
            through: 'FoodHashtag',
            foreignKey:'tag',
            timestamps:false
        })
    }
}