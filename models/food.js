const Sequelize = require('sequelize');

module.exports = class Combination extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name:{//음식 이름
                type:Sequelize.STRING(15),
                allowNull:true,
                PrimaryKey:true,
            },
            info:{//한줄 설명
                type:Sequelize.STRING(100),
                allowNull:true,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Food',
            tableName:'foods',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        })
    }
    static associate(db){
        
    }
}