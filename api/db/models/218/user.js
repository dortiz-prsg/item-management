const { INTEGER } = require('sequelize')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
            this.belongsTo(models.Department, { 
                foreignKey: 'departmentId', 
                foreignKeyConstraint: true, 
                as:'department',
            })
        }
	}

	User.init({ 
        id: {
            allowNull: false,
            primaryKey: true,
            type: INTEGER,
        },
		username: { 
            allowNull: false,
            unique: true,
			type: DataTypes.STRING,
		},
		email: { 
            allowNull: false,
            unique: true,
			type: DataTypes.STRING,
		},
		admin: {
			allowNull: false,
			defaultValue: false,
			type: DataTypes.BOOLEAN
		},
		active: {
			allowNull: false,
			defaultValue: true,
			type: DataTypes.BOOLEAN
		},
	}, {
		sequelize,
		tableName: 'User',
		modelName: 'User',
		timestamps: false,
	})

	return User
}