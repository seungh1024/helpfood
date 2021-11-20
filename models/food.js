const Sequelize = require('sequelize');

module.exports = class Combination extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name:{//음식 이름
                type:Sequelize.STRING(15),
                allowNull:true,
                primaryKey:true,
            },
            link:{//음식 링크
                type:Sequelize.STRING(200),
                allowNull:true
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
        db.Food.belongsToMany(db.User,{
            through:'UserFood',
            // as:'User',
            timestamps:false
        });
        db.Food.belongsToMany(db.Hashtag,{
            through: 'FoodHashtag',
            as:'food',
            timestamps:false
        });
    }
}