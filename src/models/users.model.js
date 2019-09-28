module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define(
      'users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password: {
          allowNull: true,
          type: DataTypes.STRING
        },
      },
      {
        timestamps: true,
        underscored: true
      }
    );
  
    // eslint-disable-next-line no-unused-vars
    User.associate = function(models) {
      // Define associations here
      // See http://docs.sequelizejs.com/en/latest/docs/associations
    };
  
    return User;
  };
  