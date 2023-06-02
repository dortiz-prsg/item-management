const path 		= require('path')
const Sequelize = require('sequelize')
const basename 	= path.basename(__filename)
const env 		= process.env.NODE_ENV || 'development'
const config 	= require('../../config/231.js')[env]
const { walk } 	= require('../../../libs')
const db 		= {}

// Override timezone formatting
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options)
    return date.format('YYYY-MM-DD HH:mm:ss.SSS')
}

const sequelize = config.use_env_variable
	? new Sequelize(process.env[config.use_env_variable], config)
	: new Sequelize(config.database, config.username, config.password, config)

walk(__dirname, basename).forEach((file) => {
	const model = require(file)(sequelize, Sequelize.DataTypes)
	db[model.name] = model
})

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db