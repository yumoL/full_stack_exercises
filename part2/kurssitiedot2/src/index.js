import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

const App = () => {
    const courses = [
        {
            name: 'Half Stack -sovelluskehitys',
            id: 1,
            parts: [
                {
                    name: 'Reactin perusteet',
                    exercises: 10
                },
                {
                    name: 'Tiedonvälitys propseilla',
                    exercises: 7
                },
                {
                    name: 'Komponenttien tila',
                    exercises: 14
                },
                {
                    name: 'Redux',
                    exercises: 7
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewaret',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]
    const coursesList = () => courses.map(course => <Course key={course.id} course={course} />)
    return (
        <div>
            {coursesList()}
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)