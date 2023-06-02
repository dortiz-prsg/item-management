const { app }   = require('./config')
app.use('/api', require('./routes'))
app.listen(process.env.PORT, (err) => {
    if (!err) {
        console.log(`AR server listening on port: ${process.env.PORT}`)
    }
})