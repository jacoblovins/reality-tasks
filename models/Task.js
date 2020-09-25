module.exports = function(sequelize, DataTypes) {
  const Task = sequelize.define("Task", {
    // The username cannot be null, and must be a proper email before creation
    // eslint-disable-next-line camelcase
    task_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taskType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Task.associate = function(models) {
    Task.belongsTo(models.Members, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Task;
};
