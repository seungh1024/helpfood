const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            email:{
                type:Sequelize.STRING(40),
                allowNull:true,
                primaryKey:true,
            },
            password:{
                type:Sequelize.STRING(100),
                allowNull:true,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'User',
            tableName:'users',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        })
    }
    static associate(db){
        db.User.belongsToMany(db.Food,{
            through:'UserFood',
            // as:'Food',
            timestamps:false
        });
    }
}