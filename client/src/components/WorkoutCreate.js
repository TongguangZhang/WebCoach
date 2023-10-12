import { useState } from "react"

const WorkoutCreate = () => {
    const [exercise, set_exercise] = useState("")
    const [weight, set_weight] = useState("")
    const [reps, set_reps] = useState("")
    const [error, set_error] = useState(null)

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
        } else {
            set_exercise("")
            set_weight("")
            set_reps("")
            set_error(null)
            console.log("workout added", json)
        }
    }

    return (
        <form className="create" onSubmit={handle_submit}>
            <h3>Add a Workout</h3>

            <label>Exercise Name:</label>
            <input type="text" onChange={(e) => set_exercise(e.target.value)} value={exercise} />
            <label>Weight:</label>
            <input type="number" onChange={(e) => set_weight(e.target.value)} value={weight} />
            <label>Reps:</label>
            <input type="number" onChange={(e) => set_reps(e.target.value)} value={reps} />

            <button>Add Workout </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutCreate

