import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './service/persons'
import './App.css'

const SuccessNotification = ({ message, success }) => {
    if (message == null) {
        return null
    }
    if (success) {
        return (
            <div className="success">
                {message}
            </div>
        )
    }
    return (
        <div className="error">
            {message}
        </div>
    )

}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [keyWord, setNewKeyWord] = useState('')
    const [personsToShow, setPersonsToShow] = useState(persons)
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(true)

    useEffect(() => {
        personService
            .getAll()
            .then(initPersons => {
                setPersons(initPersons)
                setPersonsToShow(initPersons)
            })
    }, [])

    const messageTimeout = () => {
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNum,
            //id: persons.length + 1
        }
        const filteredPersons = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
        if (filteredPersons.length > 0) {
            const confirm = window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)
            if (confirm) {
                const personToUpdate = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
                const changedPerson = { ...personToUpdate, number: newNum }
                personService
                    .update(personToUpdate.id, changedPerson)
                    .then(ret => {
                        setPersons(persons.map(p => p.id !== personToUpdate.id ? p : ret))
                        setPersonsToShow(persons.map(p => p.id !== personToUpdate.id ? p : ret))
                        setSuccess(true)
                        setMessage(`Henkilön ${personToUpdate.name} puhelinnumero vaihdettiin`)
                        messageTimeout()
                    })
                    .catch(error => {
                        setSuccess(false)
                        setMessage(`${personToUpdate.name} on jo poistettu`)
                        setPersons(persons.filter(p => p.id !== personToUpdate.id))
                        setPersonsToShow(persons.filter(p => p.id !== personToUpdate.id))
                    })
            }
        } else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNum('')
                    setPersonsToShow(persons.concat(returnedPerson))
                    setSuccess(true)
                    setMessage(`${returnedPerson.name} lisättiin`)
                    messageTimeout()
                })
        }
        //console.log(persons)
    }

    const handlNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumChange = (event) => {
        setNewNum(event.target.value)
    }
    const handleKeyWord = (event) => {
        const newKeyWord = event.target.value //solve the problem that setState is one step behind
        if (newKeyWord.length > 0) {
            setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(newKeyWord.toLowerCase())))
        } else {
            setPersonsToShow(persons)
        }
        setNewKeyWord(newKeyWord)
    }

    const toggleRemove = id => {
        const personToRemove = persons.filter(p => p.id === id)[0]
        const confirm = window.confirm(`poistetaanko ${personToRemove.name}`)
        if (confirm) {
            personService
                .remove(id)
                .then(ret => {
                    const newPersonRows = [...persons].filter(p => p.id !== id)
                    setPersons(newPersonRows)
                    setPersonsToShow(newPersonRows)
                    setSuccess(true)
                    setMessage(`${personToRemove.name} poistettiin`)
                    messageTimeout()
                })
                .catch(error => {
                    setSuccess(false)
                    setMessage(`${personToRemove.name} on jo poistettu`)
                    setPersons(persons.filter(p => p.id !== id))
                    setPersonsToShow(persons.filter(p => p.id !== id))
                })
        }

    }

    const rows = () => {
        return (
            personsToShow.map(person =>
                <Person key={person.id} name={person.name} num={person.number} toggleRemove={() => toggleRemove(person.id)} />
            )
        )
    }

    return (
        <div>
            <SuccessNotification message={message} success={success} />
            <div>
                <h1>Puhelinluettelo</h1>
                <Filter keyValue={keyWord} handleMethod={handleKeyWord} />
            </div>
            <div>
                <h2>Lisää uusi</h2>
                <PersonForm addPerson={addPerson} newName={newName} handlNameChange={handlNameChange} newNum={newNum} handleNumChange={handleNumChange} />
            </div>
            <div>
                <h2>Persons</h2>
                {rows()}
            </div>
        </div>
    )

}

export default App