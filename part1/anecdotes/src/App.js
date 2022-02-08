import React, { useState } from 'react'

const Button = ({text, onClick}) => <><button onClick={onClick}>{text}</button></>
const TextNode = ({text, isHeader}) => isHeader ? <h1>{text}</h1> : <div>{text}</div>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [votes, setVotes] = useState(anecdotes.map(() => 0))
  const [selected, setSelected] = useState(0)
  const [topVoted, setTopVoted] = useState({score: 0, anecdote: 0})

  const randomNumber = () => {
    let n = selected
    while (n === selected) {
      n = Math.floor(Math.random() * anecdotes.length)
    }
    return n
  }

  const vote = () => {
    // Create copy of votes and increment the selected anecdote vote count
    const cp_votes = { ...votes }
    cp_votes[selected] += 1
    setVotes(cp_votes)
    // Check if top voted anecdote has changed
    // If changed then update topVoted state
    if (cp_votes[selected] > topVoted.score) {
      setTopVoted({score: cp_votes[selected], anecdote: selected})
    }
  }

  return (
    <div>
      <TextNode text={'Anecdote of the day'} isHeader={true} />
      
      <TextNode text={anecdotes[selected]} />
      <TextNode text={'has ' + votes[selected] + (votes[selected] === 1 ? ' vote' : ' votes')} />

      <Button text={'vote'} onClick={() => vote()} />
      <Button text={'next anecdote'} onClick={() => setSelected(randomNumber())}/>
      
      <TextNode text={'Anecdote with most votes'} isHeader={true} />
      
      <TextNode text={anecdotes[topVoted.anecdote]} />
      <TextNode text={'has ' + votes[topVoted.anecdote] + (votes[topVoted.anecdote] === 1 ? ' vote' : ' votes')} />  
    </div>
  )
}

export default App