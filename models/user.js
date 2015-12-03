'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    school: DataTypes.STRING,
    grade: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    emailKey: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      doesUsernameExist: function(username) {
        return sequelize.query("SELECT 1 from 'users' where username = ?",
                            { replacements: [ username ], type: sequelize.QueryTypes.SELECT })
          .spread(function(userExists) {
            return !userExists;
        });
      }
    }
  });
  return User;
};
