import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
    if (props.all === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }

    return (
        <div>
            <Statistic text="good" value={props.good} />
            <Statistic text="neutral" value={props.neutral} />
            <Statistic text="bad" value={props.bad} />
            <Statistic text="all" value={props.all} />
            <Statistic text="average" value={props.average} />
            <Statistic text="positive" value={props.positive + " %"} />
        </div>
    )
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
)

const Statistic = ({ text, value }) => (
    <p>{text} {value}</p>
)

const App = (props) => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const all = good + neutral + bad
    const average = ((good * 1) + (neutral * 0) + (bad * -1)) / all
    const positive = (good / all) * 100

    const handleGood = () => (setGood(good + 1))
    const handleNeutral = () => (setNeutral(neutral + 1))
    const handleBad = () => (setBad(bad + 1))

    return (
        <div>
            <h1>give feedback</h1>
            <p>
                <Button onClick={handleGood} text='good' />
                <Button onClick={handleNeutral} text='neutral' />
                <Button onClick={handleBad} text='bad' />
            </p>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));