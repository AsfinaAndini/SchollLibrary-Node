const express = require('express')
const app = express()
app.use(express.json())
const borrowController = require('../controllers/borrow.controller')
app.get('/', borrowController.getAllBorrow)
app.post('/', borrowController.addBorrow)
app.post('/find', borrowController.findBorrow)
app.put("/:id", borrowController.updateBorrow)
app.delete("/:id", borrowController.deleteBorrow)
module.exports = app