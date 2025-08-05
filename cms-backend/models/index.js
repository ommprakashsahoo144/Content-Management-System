const sequelize = require('../config/db');

const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');
const Like = require('./Like');

// Define associations
User.hasMany(Article, { foreignKey: 'authorId' });
Article.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Article.hasMany(Comment, { foreignKey: 'articleId' });
Comment.belongsTo(Article, { foreignKey: 'articleId' });

User.hasMany(Like, { foreignKey: 'userId' });
Like.belongsTo(User, { foreignKey: 'userId' });

Article.hasMany(Like, { foreignKey: 'articleId' });
Like.belongsTo(Article, { foreignKey: 'articleId' });

Comment.hasMany(Comment, { as: 'Replies', foreignKey: 'parentId' });
Comment.belongsTo(Comment, { as: 'Parent', foreignKey: 'parentId' });

module.exports = {
  sequelize,
  User,
  Article,
  Comment,
  Like
};
