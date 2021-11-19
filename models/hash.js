const Sequelize = require('sequelize');

//음식 조합에 들어가는 해시태그
module.exports = class Hash extends Sequelize.Model{
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
            modelName:'Hash',
            tableName:'hashs',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        })
    }
    static associate(db){
        db.Hash.belongsToMany(db.Combination,{
            through: 'ComHashtag',
            timestamps:false
        })
    }
}