// Requiring bcrypt for password hashing.
const bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const Members = sequelize.define(
    "Members",
    {
      // The username cannot be null, and must be a proper email before creation
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      // The password cannot be null
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );
  Members.associate = function(models) {
    Members.hasMany(models.Task);
  };
  // Creating a custom method for our User model.
  Members.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // using hooks to automatically hash their password
  Members.addHook("beforeCreate", members => {
    members.password = bcrypt.hashSync(
      members.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return Members;
};
