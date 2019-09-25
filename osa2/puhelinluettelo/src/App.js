import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.every((person) => person.name !== newName)) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const handleDelete = (removedPerson) => {
    if (window.confirm(`Delete ${removedPerson.name} ?`)) {
      personService.remove(removedPerson.id)
      const newList = persons.filter(person => person.id !== removedPerson.id)
      setPersons(newList)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter nameFilter={nameFilter} handleNameFilter={handleNameFilter} />

      <h3>Add a new</h3>
      
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        addName={addName}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        nameFilter={nameFilter}
        personService={personService}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App