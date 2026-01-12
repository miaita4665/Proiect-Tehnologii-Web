'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ... asocierile vechi (author, conference)
      this.hasMany(models.Review, { foreignKey: 'paperId' });
    }
  }
  Paper.init({
    title: DataTypes.STRING,
    fileUrl: DataTypes.STRING,
    status: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    conferenceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Paper',
  });
  return Paper;
};