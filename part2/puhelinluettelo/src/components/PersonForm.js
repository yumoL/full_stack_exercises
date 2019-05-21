import React from 'react'

const PersonForm = ({ addPerson, newName, handlNameChange, newNum, handleNumChange }) => {
    return (
        <div>
            <form onSubmit={addPerson}>
                <div>
                    nimi: <input value={newName} onChange={handlNameChange} />
                    numero: <input value={newNum} onChange={handleNumChange} />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm