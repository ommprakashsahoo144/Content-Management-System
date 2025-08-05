const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Like = sequelize.define('Like', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },       // 👈
  articleId: { type: DataTypes.UUID, allowNull: false },    // 👈
}, {
  timestamps: true,
});

module.exports = Like;
