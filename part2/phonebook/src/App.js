import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const debugShow = false // Show debug stuff

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
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

  const addPerson = (event) => {
    event.preventDefault()
    if (newName && newNumber) {
      if ((persons.filter((person) => person.name.toLowerCase() === newName.toLowerCase()).length === 0)) 
        setPersons(persons.concat({name: newName, number: newNumber}))
      else
        alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} inputValue1={newName} inputValue2={newNumber} inputChange1={handleNameChange} inputChange2={handleNumberChange} />
      <div style={{display: debugShow ? 'block' : 'none'}}>debug: {newName}</div>
      <div style={{display: debugShow ? 'block' : 'none'}}>debug: {newNumber}</div>
      <div style={{display: debugShow ? 'block' : 'none'}}>debug: {filter}</div>

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App