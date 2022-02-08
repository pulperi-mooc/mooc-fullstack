const PersonForm = ({onSubmit, inputValue1, inputValue2, inputChange1, inputChange2}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: 
                <input 
                    value={inputValue1}
                    onChange={inputChange1}
                />
            </div>
            <div>
                number:
                <input
                    value={inputValue2}
                    onChange={inputChange2}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm