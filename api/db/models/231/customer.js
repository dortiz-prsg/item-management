const { Model } = require('sequelize')
module.exports  = (sequelize, DataTypes) => {
	class Customer extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ RouteSequence }) {
            this.hasMany(RouteSequence, { 
                foreignKey: 'customerNumber',
                as: 'routeSequence' 
            })
		}
	}

	Customer.init({ 
		customerNumber: {
			allowNull: false,
			type: DataTypes.STRING(10),
			primaryKey: true,
            field: 'OKCUNO',

		},
		customerName: {
			allowNull: false,
			type: DataTypes.STRING(64),
            field: 'OKCUNM'
		},
		status: {
			allowNull: false,
			type: DataTypes.STRING(2),
            field: 'OKSTAT'
		},
		deleted: {
			allowNull: false,
			type: DataTypes.BOOLEAN,
		},
        concat: {
            type: DataTypes.VIRTUAL,
            get() {
                return `(${this.customerNumber}) -  ${this.customerName}`
            }
        }
	}, {
		sequelize,
		tableName: 'OCUSMA',
		modelName: 'Customer',
		timestamps: false,
	})

	return Customer
}