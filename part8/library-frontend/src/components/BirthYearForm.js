import React, { useState } from 'react'
import Select from 'react-select'

const BirthYearForm = (props) => {
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    await props.editBirthYear({
      variables: { name, birth: parseInt(birthYear) }
    })
    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h3>Set Birth Year to an Author</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            options={props.result.data.allAuthors.map(a => {
              return { value: a.name, label: a.name }
            })}
            onChange={(event) => setName(event.value)}
          />
        </div>
        <div>
          birth year
          <input value={birthYear} onChange={({ target }) => setBirthYear(target.value)} />
        </div>
        <button type='submit'>set birth year</button>
      </form>
    </div>
  )
}

export default BirthYearForm