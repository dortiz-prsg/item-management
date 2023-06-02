const { Model }         = require('sequelize')
const { formatDate }    = require('../../../libs')

module.exports = (sequelize, DataTypes) => {
	class Department extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate() {}
	}

	Department.init({ 
		name: { 
            allowNull: false,
			type: DataTypes.STRING,
            validate: {
                notEmpty: { 
                    msg: 'Name must not be empty'
                },
                len: {
                    args: [1, 255],
                    msg: 'Name must not exceed 255 characters'
                }
            }
		},
	}, {
		sequelize,
		tableName: 'Department',
		modelName: 'Department',
		timestamps: false,
	})

	return Department
}