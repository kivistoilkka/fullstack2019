import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>{props.p} {props.e}</p>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part p = {props.p1} e = {props.e1} />
            <Part p = {props.p2} e = {props.e2}  />
            <Part p = {props.p3} e = {props.e3}  />
        </div>
    )
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
        </>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course = {course} />
            <Content p1 = {part1} e1 = {exercises1} p2 = {part2} e2 = {exercises2} p3 = {part3} e3 = {exercises3} />
            <Total e1 = {exercises1} e2 = {exercises2} e3 = {exercises3} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));