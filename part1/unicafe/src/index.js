import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ text, value }) => {
    if (text === "positiivisia") {
        return (
            <tr>
                <td>{text}</td>
                <td>{value}%</td>
            </tr>
        )
    }
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    if (total === 0) {
        return (
            <div>
                <h1>Statistiikka</h1>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    }
    return (
        <div>
            <h1>Statistiikka</h1>
            <table>
                <tbody>
                    <Statistic text='good' value={good} />
                    <Statistic text='neutraali' value={neutral} />
                    <Statistic text='bad' value={bad} />
                    <Statistic text='yhteensä' value={total} />
                    <Statistic text='keskiarvo' value={(good - bad) / total} />
                    <Statistic text='positiivisia' value={good / total * 100} />
                </tbody>
            </table>
        </div>
    )
}



const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }
    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }
    const handleBadClick = () => {
        setBad(bad + 1)
    }


    return (
        <div>
            <h1>Anna palautetta</h1>
            <div>
                <Button handleClick={handleGoodClick} text='good' />
                <Button handleClick={handleNeutralClick} text='neutral' />
                <Button handleClick={handleBadClick} text='bad' />
            </div>
            <div>
                <Statistics good={good} neutral={neutral} bad={bad} />
            </div>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)



