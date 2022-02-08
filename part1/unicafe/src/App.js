import React, { useState } from 'react'

const Header = ({text}) => <><h1>{text}</h1></>
const Button = ({text, onClick}) => <><button onClick={onClick} >{text}</button></>
const StatisticLine = ({text, value, unit}) => 
  <tr>
    <td>
      {text}
    </td>
    <td style={{paddingLeft: '1em'}}>
      {value} 
    </td>
    <td style={{paddingLeft: '0.3em'}}>
      {unit ? ' ' + unit : ''}
    </td>
  </tr>

const Statistics = ({good, neutral, bad}) => {
  const sum = good+neutral+bad
  const avg = (good-bad)/sum
  const positive = good/sum

  if (sum > 0 ) {
    return (
      <>
        <Header text={'statistics'}/>
        <StatisticLine text={'good'} value={good}/>
        <StatisticLine text={'neutral'} value={neutral}/>
        <StatisticLine text={'bad'} value={bad}/>
        <StatisticLine text={'all'} value={sum}/>
        <StatisticLine text={'average'} value={avg}/>
        <StatisticLine text={'positive'} value={positive*100} unit={'%'}/>
      </>
    )
  } else {
    return (
      <>
        <Header text={'statistics'}/>
        <p>No feedback given</p>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header text={'give feedback'}/>
      <Button text={'good'} onClick={() => setGood(good+1)}/>
      <Button text={'neutral'} onClick={() => setNeutral(neutral+1)}/>
      <Button text={'bad'} onClick={() => setBad(bad+1)}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App