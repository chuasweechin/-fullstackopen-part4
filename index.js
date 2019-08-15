// const http = require('http')
require('dotenv').config()

const config = require('./utils/config')
const app = require('./app')

app.listen(config.PORT, () => {
    console.log(`Server running on port ${ config.PORT }`)
})