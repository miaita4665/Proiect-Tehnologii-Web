'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // models/review.js
      static associate(models) {
        this.belongsTo(models.Paper, { foreignKey: 'paperId' });
        this.belongsTo(models.User, { foreignKey: 'reviewerId', as: 'reviewer' });
      }
  }
  Review.init({
    paperId: DataTypes.INTEGER,
    reviewerId: DataTypes.INTEGER,
    feedback: DataTypes.TEXT,
    score: DataTypes.INTEGER,
    status: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'Review',
  });
  
  return Review;
};
