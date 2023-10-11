import { useEffect, useState } from "react"

import WorkoutDetails from "../components/WorkoutDetails"

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
        </div>
    )
}

export default Home

