import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ errorState, setErrorState ] = useState(false)

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
        .catch(error => {
          setErrorState(true)
          setNotification(error.response.data.error)
          setTimeout(() => {
            setNotification(null)
            setErrorState(false)
          }, 5000)
        })
      
      setNotification(
        `Added ${personObject.name}`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber}
        personService
          .replace(changedPerson)
          .then(returnedPerson =>
            setPersons(persons.map(person => person.id !== changedPerson.id
              ? person
              : returnedPerson))
            ).catch(error => {
              setErrorState(true)
              setNotification(
                `Information of ${changedPerson.name} has already been removed from server`
              )
              setTimeout(() => {
                setNotification(null)
                setErrorState(false)
              }, 5000)
              setPersons(persons.filter(p => p.id !== person.id))
            })
        setNewName('')
        setNewNumber('')
        
        setNotification(
          `Changed number of ${changedPerson.name}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
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

  const deletePerson = (removedPerson) => {
    if (window.confirm(`Delete ${removedPerson.name} ?`)) {
      personService.remove(removedPerson.id)
      setPersons(persons.filter(person => person.id !== removedPerson.id))
      
      setNotification(
        `Deleted ${removedPerson.name}`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} isError={errorState} />

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
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App