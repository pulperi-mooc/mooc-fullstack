const Persons = ({persons, filter, remove}) => {
    return (
        <>
            {persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map((person) => 
                    <div key={person.name}>
                        {person.name} {person.number}
                        <button onClick={() => remove(person) }>Delete</button>
                    </div>)}
        </>
    )
}

export default Persons