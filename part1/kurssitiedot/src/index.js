import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
    return (
        <h1>
            {course}
        </h1>
    )
}

const Part = ({part,exercises}) => {
    return (
        <p>
            {part} {exercises}
        </p>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            <Part part={parts[0].name} exercises={parts[0].exercises} />
            <Part part={parts[1].name} exercises={parts[1].exercises} />
            <Part part={parts[2].name} exercises={parts[2].exercises} />
        </div>

    )
}

const Total = ({parts}) => {
    const total=parts[0].exercises+parts[1].exercises+parts[2].exercises
    return (
        <p>
            yhteensä {total} tehtävää
        </p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
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
          }
        ]
      }

    return (
        <div>
            <h1>
                <Header course={course.name} />
            </h1>
            <p>
                <Content parts={course.parts} />
            </p>

            <p>
                <Total parts={course.parts} />
            </p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))