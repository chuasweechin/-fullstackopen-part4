let MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT

if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI
}

if (MONGODB_URI === undefined || PORT === undefined ) {
    console.log('missing .env config')
    process.exit(1)
}

module.exports = {
    MONGODB_URI,
    PORT
}