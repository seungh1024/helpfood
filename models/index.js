const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Food = require('./food');
const Hashtag = require('./hashtag');
const Combination = require('./combination');
const ComHash = require('./review');
const Review = require('./review');

const db ={};
const sequelize = new Sequelize(config.database,config.username,config.password,config,);

db.sequelize = sequelize;
db.User = User;
db.Food = Food;
db.Hashtag = Hashtag;
db.Combination = Combination;
db.Review = Review;

User.init(sequelize);
Food.init(sequelize);
Hashtag.init(sequelize);
Combination.init(sequelize);
Review.init(sequelize);

User.associate(db);
Food.associate(db);
Hashtag.associate(db);
Combination.associate(db);
Review.associate(db);

module.exports = db;