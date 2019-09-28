module.exports = function(sequelize, DataTypes) {
    const Product = sequelize.define(
      'products',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        nama: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        code: {
          allowNull: true,
          type: DataTypes.STRING
        },
        categori_id: {
          allowNull: true,
          type: DataTypes.INTEGER,
        },
      },
      {
        timestamps: true,
        underscored: true
      }
    );
  
    // eslint-disable-next-line no-unused-vars
    Product.associate = function(models) {
      // Define associations here
      // See http://docs.sequelizejs.com/en/latest/docs/associations
    };
  
    return Product;
  };
  