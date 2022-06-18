import React, { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const debugShow = false // Show debug stuff

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const toggleNotificationMessage = (text, type) => {
    setNotificationMessage(
      { 
        text: text,
        messageType: type
      }
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newName && newNumber) {
      
      const personList = persons.filter((person) => person.name.toLowerCase() === newName.toLowerCase())
      const personObject = {
        name: newName,
        number: newNumber
      }

      // Add new Person if name not already in phonebook
      if ((personList.length === 0)) {
        personService
          .create(personObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            toggleNotificationMessage(`Added ${response.data.name}`, 'notification')
          })

      }
      // If Person already in phonebook, update Person  
      else {
        if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
          personObject.id = personList[0].id
          personService
          .update(personList[0].id, personObject)
          .then(response => {
            setPersons(persons.map(p => p.id !== personObject.id ? p : response.data))
            toggleNotificationMessage(`Updated ${response.data.name}`, 'notification')
          })
        }
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then( () => {
          setPersons(persons.filter(p => p.id !== person.id ))
          toggleNotificationMessage(`Removed ${person.name}!`, 'warning')
        })
        .catch(error => {
          toggleNotificationMessage(`${person.name} not found on server!`, 'warning')
          setPersons(persons.filter(p => p.id !== person.id ))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} inputValue1={newName} inputValue2={newNumber} inputChange1={handleNameChange} inputChange2={handleNumberChange} />
      <div style={{display: debugShow ? 'block' : 'none'}}>debug: {newName}</div>
      <div style={{display: debugShow ? 'block' : 'none'}}>debug: {newNumber}</div>
      <div style={{display: debugShow ? 'block' : 'none'}}>debug: {filter}</div>

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} remove={removePerson} />
    </div>
  )
}

export default App