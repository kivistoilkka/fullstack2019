import React from 'react'

const Persons = (props) => {
    const personsToShow = props.persons.filter(person =>
        person.name.toLowerCase().includes(props.nameFilter.toLowerCase()))
    
    const rows = () => personsToShow.map(person => 
        <div key={person.name}>
            {person.name} {person.number}
            <button onClick={() => props.deletePerson(person)}>
                delete
            </button>
        </div>
        )

    return (
        <div>{rows()}</div>
    )
}

export default Persons