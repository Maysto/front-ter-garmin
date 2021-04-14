const express = require('express')
const app = express()
const path = require('path')
const serveStatic = require('serve-static')
const history = require('connect-history-api-fallback')
const port = process.env.PORT || 8080

app.use(history({
    // OPTIONAL: Includes more verbose logging
    verbose: true
}))

app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.listen(port, () => console.log(`Example app listening on port ${port}, link : http://localhost:${port}`))