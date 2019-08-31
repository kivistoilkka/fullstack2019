import React, { useState } from 'react';
import ReactDOM from 'react-dom';

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

            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {average}</p>
            <p>positive {(good / all) * 100} %</p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
