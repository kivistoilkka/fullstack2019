import React from 'react'

const Header = props =>
    <h2>{props.course}</h2>

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

export default Course