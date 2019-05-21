import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header header={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ header }) =>
    <h1>{header}</h1>

const Total = ({ parts }) => {
    const total = () => parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)
    return <p>yhteensä {total()} tehtävää</p>
}


const Part = ({ part }) =>
    <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
    const rows = () => parts.map(part => <Part key={part.name} part={part} />)
    return (
        <div>
            {rows()}
        </div>
    )
}
export default Course