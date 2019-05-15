import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const indexOfMax = (arr) => {
    let max = arr[0]
    let idx = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            idx = i
            max = arr[i]
        }
    }
    return idx
}


const App = (props) => {
    //let i=0
    const [selected, setSelected] = useState(0)
    const [voted, setVoted] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf, 0))

    const handleSelectClick = () => {
        const i = Math.floor((Math.random() * props.anecdotes.length))
        setSelected(i)
    }

    const handleVoteClick = () => {
        const copy = [...voted]
        copy[selected] += 1
        setVoted(copy)
    }

    return (
        <div>
            <div>
                <h1>Anecdote of the day</h1>
                <p>{props.anecdotes[selected]}</p>
                <p>This anecdote has {voted[selected]} votes</p>
                <Button handleClick={handleSelectClick} text='next anecdote' />
                <Button handleClick={handleVoteClick} text='vote' />
            </div>
            <div>
                <h1>Anecdote with most votes</h1>
                <p>{anecdotes[indexOfMax(voted)]}</p>
            </div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)