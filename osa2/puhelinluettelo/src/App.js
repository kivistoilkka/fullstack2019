import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.every((person) => person.name !== newName)) {
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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

      <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  )
}

export default App