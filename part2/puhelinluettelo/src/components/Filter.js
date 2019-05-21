import React from 'react'

const Filter = ({ keyValue, handleMethod }) => {
    return (
        <div>
            rajaa näytettäviä: <input value={keyValue} onChange={handleMethod} />
        </div>
    )
}

export default Filter