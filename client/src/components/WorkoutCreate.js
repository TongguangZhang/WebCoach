import { useState } from "react"

import { useWorkoutContext } from "../hooks/userWorkoutContext"

const WorkoutCreate = () => {
    const { dispatch } = useWorkoutContext()
    const [exercise, set_exercise] = useState("")
    const [weight, set_weight] = useState("")
    const [reps, set_reps] = useState("")
    const [error, set_error] = useState(null)
    const [empty_fields, set_empty_fields] = useState([])

    const handle_submit = async (e) => {
        e.preventDefault()

        const workout = { exercise, weight, reps }

        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-type": "application/json",
            },
        })

        const json = await response.json()

        if (!response.ok) {
            set_error(json.error)
            set_empty_fields(json.empty_fields)
        } else {
            set_exercise("")
            set_weight("")
            set_reps("")
            set_error(null)
            set_empty_fields([])
            dispatch({ type: "CREATE_WORKOUT", payload: json })
        }
    }

    return (
        <form className="create" onSubmit={handle_submit}>
            <h3>Add a Workout</h3>

            <label>Exercise Name:</label>
            <input
                type="text"
                onChange={(e) => set_exercise(e.target.value)}
                value={exercise}
                className={empty_fields.includes("exercise") ? "error" : ""}
            />
            <label>Weight:</label>
            <input
                type="number"
                onChange={(e) => set_weight(e.target.value)}
                value={weight}
                className={empty_fields.includes("weight") ? "error" : ""}
            />
            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => set_reps(e.target.value)}
                value={reps}
                className={empty_fields.includes("reps") ? "error" : ""}
            />

            <button>Add Workout </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutCreate

