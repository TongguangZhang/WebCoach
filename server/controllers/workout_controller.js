const mongoose = require("mongoose")

const Workout = require("../models/workout_model")

const get_workouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

const get_workout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout not found" })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: "Workout not found" })
    }

    res.status(200).json(workout)
}

const create_workout = async (req, res) => {
    const { exercise, weight, reps } = req.body

    let empty_fields = []

    if (!exercise) {
        empty_fields.push("exercise")
    }
    if (!weight) {
        empty_fields.push("weight")
    }
    if (!reps) {
        empty_fields.push("reps")
    }

    if (empty_fields.length > 0) {
        return res.status(400).json({ error: "Fill out all fields", empty_fields })
    }

    try {
        const workout = await Workout.create({ exercise, weight, reps })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const delete_workout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout not found" })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(404).json({ error: "Workout not fond" })
    }

    res.status(200).json(workout)
}

const update_workout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout not found" })
    }

    const workout = await Workout.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    )

    if (!workout) {
        return res.status(404).json({ error: "Workout not fond" })
    }

    res.status(200).json(workout)
}

module.exports = {
    get_workouts,
    get_workout,
    create_workout,
    delete_workout,
    update_workout,
}

