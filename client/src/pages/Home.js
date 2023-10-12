import { useEffect, useState } from "react"

import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutCreate from "../components/WorkoutCreate"

const Home = () => {
    const [workouts, set_workouts] = useState(null)

    useEffect(() => {
        const fetch_workouts = async () => {
            const response = await fetch("/api/workouts")
            const json = await response.json()

            if (response.ok) {
                set_workouts(json)
            }
        }
        fetch_workouts()
    }, [])

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

