import React from 'react'

const TextArea = ({ label, id, value, onChange }) => {
  const valueChange = (e) => {
    let input = e.target.value
    onChange(id, input)
  }

  return (
    <p>
      <label>{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={valueChange}
      />
    </p>
  )
}

export default TextArea