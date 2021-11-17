const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            comment:{//리뷰 내용
                type:Sequelize.STRING(15),
                allowNull:true,
            }
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'Review',
            tableName:'reviews',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        })
    }
    static associate(db){
        
    }
}