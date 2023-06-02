const router        = require('express').Router()
const asyncHandler  = require('../middleware/asyncHandler.js') 
const db            = require('../db/models/218')
const { passport }  = require('../config')

/** auth */
router.post('/login', passport.authenticate('ActiveDirectory', { failWithError: true }), asyncHandler(async(req, res) => {
    const username = req.body.username 
    const user = await db.User.findOne({ 
        include: ['department'],
        where: { 
            username, 
            active: true 
        } 
    })

    if (user) {
        res.json({ user })
    } else {   
        res.status(402).json({ message: 'Incorrect credentials' })
    }  
}), (err, req, res, next) => {
    res.status(402).json({ message: 'Incorrect credentials' })
})

/** logout */ 
router.post('/logout', (req, res) => {
    req.session?.destroy()
    res.json()
})

module.exports = router