import { useEffect } from "react"

import { useWorkoutContext } from "../hooks/userWorkoutContext"

import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutCreate from "../components/WorkoutCreate"

const Home = () => {
    const { workouts, dispatch } = useWorkoutContext()

    useEffect(() => {
        const fetch_workouts = async () => {
            const response = await fetch("/api/workouts")
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_WORKOUTS", payload: json })
            }
        }
        fetch_workouts()
    }, [dispatch])

    return (
        <div className="home">
            <div className="workouts">
                {workouts &&
                    workouts.map((workout) => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))}
            </div>
            <WorkoutCreate />
        </div>
    )
}

export default Home

