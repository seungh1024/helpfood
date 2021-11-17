const Sequelize = require('sequelize');

//게시글 개념의 음식 조합
module.exports = class Food extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name:{//음식 조합 이름
                type:Sequelize.STRING(30),
                allowNull:true,
                PrimaryKey:true,
            },
            main:{//메인 메뉴
                type:Sequelize.STRING(15),
                allowNull:true,
            },
            side:{//조합 메뉴
                type:Sequelize.STRING(15),
                allowNull:true
            },
            info:{//상세 정보
                type:Sequelize.STRING(100),
                allowNull:true,
            },
            star:{//별점
                type:Sequelize.FLOAT,
                allowNull:true
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
        
    }
}