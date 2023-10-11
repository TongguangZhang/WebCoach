const express = require("express")
const Workout = require("../models/workout_model")
const {
    get_workouts,
    get_workout,
    create_workout,
    delete_workout,
    update_workout,
} = require("../controllers/workout_controller")

const router = express.Router()

router.get("/", get_workouts)

router.get("/:id", get_workout)

router.post("/", create_workout)

router.delete("/:id", delete_workout)

router.patch("/:id", update_workout)

module.exports = router
