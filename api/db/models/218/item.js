const { Model }         = require('sequelize')
const { formatDate }    = require('../../../libs')

module.exports = (sequelize, DataTypes) => {
	class Item extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate() {}
	}

	Item.init({ 
		itemNumber: { 
            allowNull: false,
            unique: true,
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
		description: { 
            allowNull: false,
			type: DataTypes.STRING(40),
            validate: {
                notEmpty: { 
                    msg: 'Description must not be empty'
                },
                len: {
                    args: [1, 40],
                    msg: 'Description must not exceed 40 characters'
                }
            }
		},
		fullDescription: { 
            allowNull: false,
			type: DataTypes.STRING(60),
            validate: {
                notEmpty: { 
                    msg: 'Description must not be empty'
                },
                len: {
                    args: [1, 60],
                    msg: 'Description must not exceed 60 characters'
                }
            }
		},
		createdBy: { 
            allowNull: false,
			type: DataTypes.STRING(64),
            defaultValue: 'dortiz'
		},
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
            get() {
                const date = formatDate(this.dataValues.createdAt)
                const user = this.dataValues.createdBy
                return `${date} (${user})`
            }
        },
	}, {
		sequelize,
		tableName: 'Item',
		modelName: 'Item',
		timestamps: false,
	})

	return Item
}