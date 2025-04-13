
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium'
      },
      dueDate: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed', 'archived'),
        defaultValue: 'pending'
      }
    });
  
    Task.associate = (models) => {
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    };
  
    return Task;
  };
