const fs    = require('fs')
const path  = require('path')
const { getErrorMessage } = require('../libs')

module.exports = (err, req, res, next) => {
    if (!err) return next()
    console.error(err)
    const { originalUrl, user: { username = 'none' } } = req
    const message = getErrorMessage(err)

    fs.appendFile(path.join(__dirname, '../logs/error.log'), `[${new Date().toUTCString()}] ${username} requested ${originalUrl}\n${err.stack}\n`, (err) => {
        if (err) console.error(err)
    })
    
    res.status(500).json({ message })
}