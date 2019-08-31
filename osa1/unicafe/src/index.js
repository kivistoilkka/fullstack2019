import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
    if (props.all === 0) {
        return (
            <div>
                <h1>statistics</h1>
                No feedback given
            </div>
        )
    }

    return (
        <div>
            <h1>statistics</h1>
            <p>good {props.good}</p>
            <p>neutral {props.neutral}</p>
            <p>bad {props.bad}</p>
            <p>all {props.all}</p>
            <p>average {props.average}</p>
            <p>positive {(props.good / props.all) * 100} %</p>
        </div>
    )
}

const App = (props) => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const all = good + neutral + bad
    const average = ((good * 1) + (neutral * 0) + (bad * -1)) / all

    const handleGood = () => (setGood(good + 1))
    const handleNeutral = () => (setNeutral(neutral + 1))
    const handleBad = () => (setBad(bad + 1))

    return (
        <div>
            <h1>give feedback</h1>
            <p>
                <button onClick={handleGood}>good</button>
                <button onClick={handleNeutral}>neutral</button>
                <button onClick={handleBad}>bad</button>
            </p>
            <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));