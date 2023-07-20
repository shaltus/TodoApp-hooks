import React, { useState } from 'react'
import PropTypes from 'prop-types'

function NewTaskForm({ addItem }) {
  const [description, setDescription] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLabelChange = (e) => {
    setDescription(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const timerSec = parseInt(min || 0, 10) * 60 + parseInt(sec || 0, 10) * 1
    if (!description.trim().length) return
    if (description.length !== 0) {
      addItem(description, timerSec)
      setDescription('')
      setMin('')
      setSec('')
    }
  }

  const clamp = (value, minVal, maxVal) => {
    if (value > maxVal) return maxVal
    if (value < minVal) return minVal
    return value
  }

  const onChangeInputMin = (e) => {
    const { value } = e.target
    if (value !== '') e.target.value = clamp(+value, 0, 1440) || 0
    setMin(e.target.value)
  }

  const onChangeInputSec = (e) => {
    const { value } = e.target
    if (value !== '') e.target.value = clamp(+value, 0, 60) || 0
    setSec(e.target.value)
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          type="text"
          className="new-todo"
          onChange={onLabelChange}
          value={description}
          placeholder="Task"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={onChangeInputMin}
          value={min}
          pattern="([0-5]?[0-9])"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={onChangeInputSec}
          value={sec}
          pattern="([0-5]?[0-9])"
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </header>
  )
}
NewTaskForm.defaultProps = {
  addItem: () => {},
}
NewTaskForm.propTypes = {
  addItem: PropTypes.func,
}
export default NewTaskForm
