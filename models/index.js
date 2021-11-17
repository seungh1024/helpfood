const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Food = require('./food');
const Combination = require('./combination');
const Review = require('./review');
const Hashtag = require('./hashtag');

const db ={};
const sequelize = new Sequelize(config.database,config.username,config.password,config,);

db.sequelize = sequelize;
db.User = User;
db.Food = Food;
db.Combination = Combination;
db.Reivew = Review;
db.Hashtag = Hashtag;

User.init(sequelize);
Food.init(sequelize);
Combination.init(sequelize);
Review.init(sequelize);
Hashtag.init(sequelize);

User.associate(db);
Food.associate(db);
Combination.associate(db);
Review.associate(db);
Hashtag.associate(db);

module.exports = db;