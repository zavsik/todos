const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todoRouters = require('./routes/todos')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use(todoRouters)


async function start() {
    try{
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.bddze.mongodb.net/todos', {
            useNewUrlParser: true
        })

        app.listen(PORT, () => {
            console.log(`Server has been started on Port ${PORT}`)
        })

    } catch(e) {
        console.log(e)
    }
}

start()