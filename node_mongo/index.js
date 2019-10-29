const express = require('express');
const db = require('./db/connect')
const path = require('path')

const app = express()

const userRouter = require('./router/userRouter');
const foodRouter = require('./router/foodRouter');
const fileRouter = require('./router/fileRouter');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname, './static')))
app.use('/user', userRouter)
app.use('/food', foodRouter)
app.use('/file', fileRouter)


app.listen(3000, () => {
    console.log('server 3000')
})