const { Model } = require('sequelize')
module.exports  = (sequelize, DataTypes) => {
	class Salesperson extends Model {}
	Salesperson.init({ 
		id: {
			allowNull: false,
			type: DataTypes.INTEGER,
            field: 'Id',
			primaryKey: true,
		},
		employeeNumber: {
			allowNull: false,
			type: DataTypes.STRING(64),
            field: 'Emp_Num',
		},
		employeeName: {
			allowNull: false,
			type: DataTypes.STRING(40),
            field: 'Vend_Name',
		},
		businessArea: {
			allowNull: false,
			type: DataTypes.STRING(64),
            field: 'Business',
		},
		businessAreaDescription: {
			allowNull: false,
			type: DataTypes.STRING(64),
            field: 'Business_Name',
		},
		endDate: {
			type: DataTypes.DATE,
            field: 'End_Date'
		},
        salesDepartment: {
            type: DataTypes.INTEGER,
            field: 'Route',
        },
        concat1: {
            type: DataTypes.VIRTUAL,
            get() {
                return `(${this.salesDepartment}) - ${this.employeeName}`
            }
        },
        concat2: {
            type: DataTypes.VIRTUAL,
            get() {
                return `(${this.employeeNumber}) - ${this.employeeName}`
            }
        },
        concat3: {
            type: DataTypes.VIRTUAL,
            get() {
                return `(${this.businessArea}) - ${this.businessAreaDescription}`
            }
        },
	}, {
		sequelize,
		tableName: 'rtedivx',
		modelName: 'Salesperson',
		timestamps: false,
	})

	return Salesperson
}