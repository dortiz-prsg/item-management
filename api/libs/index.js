// libs - index.js
const fs            = require('fs')
const path          = require('path')

const walk = (dir, basename) => {
    var files = []
    fs.readdirSync(dir).forEach((f) => {
        const file  = path.join(dir, f)
        const stat  = fs.statSync(file)

        if (stat && stat.isDirectory()) { 
            files = files.concat(walk(file))
        } else if (f !== basename && f.slice(-3) === '.js') {
            files.push(file)
        }
    })

    return files
}

const getErrorMessage = (err) => {
    if (err.name === 'SequelizeValidationError' && err.errors) {
        return err.errors.map(e => e.message).join(', ')
    } else {
        return err.message
    } 
}

const formatDate        = (date, opts = { month: 'short', day: 'numeric', year: 'numeric' }) => {
    if (!date) return ''
    date = new Date(date)
    return (new Intl.DateTimeFormat('en-US', opts)).format(date)
}

module.exports  = {
    walk,
    getErrorMessage,
    formatDate
}