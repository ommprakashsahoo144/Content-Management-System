const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Article = sequelize.define('Article', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  status: {
    type: DataTypes.ENUM('DRAFT', 'SUBMITTED', 'PUBLISHED', 'REJECTED'),
    defaultValue: 'DRAFT'
  },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  authorId: { type: DataTypes.UUID, allowNull: false },  // 👈 Add this
  approvedBy: { type: DataTypes.UUID, allowNull: true },
}, {
  timestamps: true,
});

module.exports = Article;
