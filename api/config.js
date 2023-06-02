// config.js
const express           = require('express')
const app               = express()
const cors              = require('cors')
const cookieParser      = require('cookie-parser')
const session           = require('express-session')
const passport          = require('passport')
const ActiveDirectory   = require('passport-activedirectory')
const { User }          = require('./db/models/218')

require('dotenv').config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

app.use(session({
    secret: process.env.TOKEN_SECRET,
    cookie: {
        maxAge: 3600000 * 24 * 7,
        secure: !true
    },
    saveUninitialized: false,
    resave: false,
    unset: 'destroy'
}))

app.use(cors({
    origin: ['http://localhost:5173', 'http://dev.prsupplies.com'],
    credentials: true,
    exposedHeaders: ['set-cookie']
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user._json.sAMAccountName)
})

passport.deserializeUser(async (username, done) => {
    const user = await User.findOne({ where: { username, active: true }})
    done(null, user)
});

passport.use(new ActiveDirectory({ 
    integrated: false,
    passReqToCallback: true,
    ldap: {
        url: process.env.LDAP_URL,
        baseDN: process.env.LDAP_BASE_DN,
        username: process.env.LDAP_USERNAME,
        password: process.env.LDAP_PASSWORD
    }
}, (req, profile, ad, done) => done(null, profile)))

module.exports  = { app, passport }