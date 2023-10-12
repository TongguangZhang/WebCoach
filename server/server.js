const fs = require("fs")
const mongoose = require("mongoose")
const express = require("express")

const workout_routes = require("./routes/workouts")

//app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use("/api/workouts", workout_routes)

const configData = fs.readFileSync("config.json")
const config = JSON.parse(configData)

mongoose
    .connect(config.dbURI)
    .then(() => {
        app.listen(config.port, () => {
            console.log(`Listening on port ${config.port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

