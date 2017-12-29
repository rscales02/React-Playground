import React from 'react'

const Input = ({ label, id, value, onChange }) => {
    const valueChange = (e) => {
        let input = e.target.value
        onChange(id, input)
    }

    return (
        <p>
            <label>{label}</label>
            <input
                id={id}
                value={value}
                onChange={valueChange}
            />
        </p>
    )
}

export default Input