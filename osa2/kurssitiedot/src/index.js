import React from 'react'
import ReactDOM from 'react-dom'

const Header = props =>
    <h1>{props.course}</h1>

const Part = props => 
    <p>{props.part.name} {props.part.exercises}</p>

const Content = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
            <b>total of {total} exercises</b>
        </div>
    )
}

const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
    </div>
)

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)