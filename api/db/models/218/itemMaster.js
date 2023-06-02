const { Model }         = require('sequelize')
const { formatDate }    = require('../../../libs')

module.exports = (sequelize, DataTypes) => {
	class ItemMaster extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate() {}
	}

	ItemMaster.init({ 
		itemNumber: { 
            allowNull: false,
			type: DataTypes.STRING(15),
            validate: {
                notEmpty: { 
                    msg: 'Item Number must not be empty'
                },
                len: {
                    args: [1, 15],
                    msg: 'Item Number must not exceed 10 characters'
                }
            }
		},
		field: { 
            allowNull: false,
			type: DataTypes.STRING(40),
            validate: {
                notEmpty: { 
                    msg: 'Field must not be empty'
                },
                len: {
                    args: [1, 40],
                    msg: 'Field must not exceed 40 characters'
                }
            }
		},
		description: { 
            allowNull: false,
			type: DataTypes.STRING(255),
            validate: {
                notEmpty: { 
                    msg: 'Description must not be empty'
                },
                len: {
                    args: [1, 255],
                    msg: 'Description must not exceed 40 characters'
                }
            }
		},
		value: { 
			type: DataTypes.STRING,
		},
		type: { 
            allowNull: false,
			type: DataTypes.STRING(1),
            validate: {
                notEmpty: { 
                    msg: 'Type must not be empty'
                },
                len: {
                    args: [1, 1],
                    msg: 'Type must not exceed 1 character'
                }
            }
		},
		length: { 
            allowNull: false,
			type: DataTypes.SMALLINT,
		},
		defaultValue: { 
			type: DataTypes.STRING(100),
		},
		comments: { 
			type: DataTypes.STRING,
		},
		required: { 
            allowNull: false,
			type: DataTypes.BOOLEAN,
		},
		panel: { 
			type: DataTypes.STRING(100),
		},
		transaction: { 
			type: DataTypes.STRING(100),
		},
        departmentId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
	}, {
		sequelize,
		tableName: 'ItemMaster',
		modelName: 'ItemMaster',
		timestamps: false,
	})

	return ItemMaster
}