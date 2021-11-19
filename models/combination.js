const Sequelize = require('sequelize');

module.exports = class Combination extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name:{// 음식 X 음식 형태의 이름
                type:Sequelize.STRING(30),
                allowNull: true,
                primaryKey: true
            },
            main:{//메인 음식
                type:Sequelize.STRING(15),
                allowNull:true,
            },
            side:{//사이드 음식
                type:Sequelize.STRING(15),
                allowNull:true,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Combination',
            tableName:'combinations',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        })
    }
    static associate(db){
        db.Combination.hasMany(db.Review)
    }
}