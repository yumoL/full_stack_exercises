import React from 'react'

const Person = ({ name, num, toggleRemove }) => {
    return (
        <div>
            <p>{name} {num} <button onClick={toggleRemove}>poista</button></p>

        </div>
    )
}

export default Person