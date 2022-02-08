import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const debugShow = false // Show debug stuff

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