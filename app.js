const http = require('http')
const https = require('https')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const fs = require('fs')
const httpsRedirect = require('express-https-redirect')



HTTP_PORT = 3000
HTTPS_PORT = 3001

const app = express()

app.use(httpsRedirect())
app.use(favicon('./client/favicon.ico'))
app.use(express.static('client'))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))




function start() {

    try {
        http.createServer(app).listen(HTTP_PORT, () => { console.log(`Server listening port ${HTTP_PORT}`) })

        https.createServer({
            
            key: fs.readFileSync('./sslcert/privkey.pem'),
            cert: fs.readFileSync('./sslcert/cert.pem'),
            ca: fs.readFileSync('./sslcert/chain.pem'),
        }, app).listen(HTTPS_PORT, () => { console.log(`Server listening port ${HTTPS_PORT}`) })

    } catch (e) {
        console.log(`Server error: ${e.message}`)
        process.exit(1)
    }

}

start()