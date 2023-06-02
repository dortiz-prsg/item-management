const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class RouteSequence extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Customer, Salesperson }) {
			this.hasOne(Customer, { 
                foreignKey: 'customerNumber',
				sourceKey: 'customerNumber',
                as: 'customer' 
            })

			this.hasOne(Salesperson, { 
                foreignKey: 'employeeNumber',
				sourceKey: 'employeeNumber',
                as: 'salesperson',
                scope: {
                    [sequelize.Sequelize.Op.and]: [
                        sequelize.where(sequelize.col('routeSequence.Route'), '=', sequelize.col('salesperson.Route')),
                        sequelize.where(sequelize.col('salesperson.End_Date'), '=', null),
                        sequelize.where(sequelize.col('salesperson.Created_Type'), '=', 1),
                    ],
                },
            })
		}
	}

	RouteSequence.init({ 
		salesDepartment: {
			allowNull: false,
			type: DataTypes.INTEGER,
			field: 'Route'
		},
		employeeNumber: {
			allowNull: false,
			type: DataTypes.STRING(10),
			field: 'Employee_Number',
            validate: {
                notEmpty: { 
                    msg: 'Empleado no puede estar vacío' 
                },
            }
		},
		customerNumber: {
			allowNull: false,
			type: DataTypes.STRING(10),
            field: 'Customer_Number',
            validate: {
                notEmpty: { 
                    msg: 'Cliente no puede estar vacío' 
                },
            }
		},
		type: {
			type: DataTypes.STRING(2),
			field: 'Type',
            validate: {
                notEmpty: { 
                    msg: 'Tipo de negocio no puede estar vacío' 
                },
            }
		},
		month: {
            allowNull: false,
			type: DataTypes.INTEGER,
            field: 'Month',
            validate: {
                notEmpty: { 
                    msg: 'Mes no puede estar vacío' 
                },
            },
		},
		year: {
            allowNull: false,
			type: DataTypes.INTEGER,
            field: 'Year',
            validate: {
                notEmpty: { 
                    msg: 'Año no puede estar vacío' 
                },
            }
		},
        visitFrequency: {
            allowNull: false,
            type: DataTypes.STRING(1),
            field: 'Visit_Frequency',
            validate: {
                notEmpty: { 
                    msg: 'Frecuencia no puede estar vacía' 
                },
            }
        },
		visitDay: {
            allowNull: false,
			type: DataTypes.STRING(10),
            field: 'Visit_Day',
            validate: {
                notEmpty: { 
                    msg: 'Día de visita no puede estar vacío' 
                },
            },
            get() {
                const s = this.getDataValue('visitDay')
                if (Array.isArray(s)) {
                    return s.join('')
                } else {
                    return !s ? [] : s.split('').map((w) => parseInt(w))
                }
            }
		},
		visitWeek: {
            allowNull: false,
            type: DataTypes.STRING(10),
            field: 'Visit_Week',
            validate: {
                notEmpty: { 
                    msg: 'Semana no puede estar vacía' 
                },
            },
            get() {
                const s = this.getDataValue('visitWeek')
                if (Array.isArray(s)) {
                    return s.join('')
                } else {
                    return !s ? [] : s.split('').map((w) => parseInt(w))
                }
            }
		},
        visitSequence: {
            type: DataTypes.INTEGER,
            field: 'Visit_Sequence'
        },
		timestamp: {
			type: DataTypes.DATE,
            field: 'Timestamp'
		},
		groceryDeliveryDays: {
			type: DataTypes.STRING(7),
            field: 'Grocery_Delivery_Days',
            validate: {
                notEmpty: { 
                    msg: 'Días Grocery no puede estar vacío' 
                },
            },
            get() {
                const s = this.getDataValue('groceryDeliveryDays')
                if (Array.isArray(s)) {
                    return [...Array(7)].map((_, i) => s.includes(i) ? ' ' : 'X').join('')
                } else {
                    return !s ? [] : s.split('').reduce((a, c, i) => (c === ' ' ? a.concat(i) : a), [])
                }
            },
		},
		dairyDeliveryDays: {
			type: DataTypes.STRING(7),
            field: 'Dairy_Delivery_Days',
            validate: {
                notEmpty: { 
                    msg: 'Días Dairy no puede estar vacío' 
                },
            },
            get() {
                const s = this.getDataValue('dairyDeliveryDays')
                if (Array.isArray(s)) {
                    return [...Array(7)].map((_, i) => s.includes(i) ? ' ' : 'X').join('')
                } else {
                    return !s ? [] : s.split('').reduce((a, c, i) => (c === ' ' ? a.concat(i) : a), [])
                }
            },
		},
	}, {
		sequelize,
		tableName: 'route_sequence',
		modelName: 'RouteSequence',
		timestamps: false,
	})

	return RouteSequence
}