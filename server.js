const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')

app.use(cors())
app.use(express.static(__dirname))

const borrowRoute = require('./routes/borrow.route')
app.use(`/borrow`, borrowRoute)

const bookRoute = require('./routes/book.route')
app.use(`/book`, bookRoute)

const memberRoute = require('./routes/member.route')
app.use(`/member`, memberRoute)

const adminRoute = require('./routes/admin.route')
app.use(`/admin`, adminRoute)
app.listen(port, () => {
    console.log(`Server of School's Library runs on port ${port}`)
    })