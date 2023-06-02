const { Model } = require('sequelize')
module.exports  = (sequelize, DataTypes) => {
	class BusinessArea extends Model {
	}
	BusinessArea.init({ 
		ctstco: {
			allowNull: false,
			type: DataTypes.STRING(10),
            field: 'CTSTCO',
			primaryKey: true,

		},
		businessArea: {
			allowNull: false,
			type: DataTypes.STRING(64),
            field: 'CTSTKY',
			primaryKey: true,
		},
		description: {
			allowNull: false,
			type: DataTypes.STRING(40),
            field: 'CTTX40',
		},

        concat: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.businessArea} - ${this.description}`
            }
        }
	}, {
		sequelize,
		tableName: 'CSYTAB',
		modelName: 'BusinessArea',
		timestamps: false,
	})

	return BusinessArea
}