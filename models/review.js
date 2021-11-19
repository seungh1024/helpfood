const Sequelize = require('sequelize');

//음식 조합에 들어가는 해시태그
module.exports = class Review extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            tag:{
                type:Sequelize.STRING(15),
                allowNull:true,
            },
            count:{
                type:Sequelize.INTEGER,
                allowNull:true
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Review',
            tableName:'reviews',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        })
    }
    static associate(db){
        db.Review.belongsTo(db.Combination)
    }
}