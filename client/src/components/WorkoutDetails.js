import formatDistanceToNow from "date-fns/formatDistanceToNow"

import { useWorkoutContext } from "../hooks/userWorkoutContext"

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext()

    const handle_click = async () => {
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: "DELETE",
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: "DELETE", payload: json })
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.exercise}</h4>
            <p>Weight: {workout.weight}</p>
            <p>Reps: {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handle_click}>
                delete
            </span>
        </div>
    )
}

export default WorkoutDetails

