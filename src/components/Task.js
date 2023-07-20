import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function Task({
  id,
  description,
  time,
  onDeleted,
  onToggleCompleted,
  editTask,
  completed,
  onSubmitEdit,
  timerSet,
  onPlay,
  edit,
  onPause,
}) {
  const [value, setValue] = useState(description)

  useEffect(() => {
    const handleClickOutside = (event) => {
      const editNode = document.querySelector('.editing')
      if (editNode) {
        if (
          (!editNode.contains(event.target) && edit) ||
          (event.key === 'Escape' && edit)
        ) {
          setValue(description)
          editTask(id)
        }
      }
    }

    document.addEventListener('click', handleClickOutside, true)
    document.addEventListener('keydown', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleClickOutside)
    }
  }, [description, editTask, id, edit])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return edit ? (
    <li className="editing">
      <form onSubmit={onSubmitEdit}>
        <input
          className="edit"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </form>
    </li>
  ) : (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input
          id={id}
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={onToggleCompleted}
        />
        <label htmlFor={id}>
          <span className="title">{description}</span>
          <span className="description">
            <button className="icon icon-play" onClick={onPlay} />
            <button className="icon icon-pause" onClick={onPause} />
            <span className="timer">{timerSet}</span>
          </span>
          <span className="description">created {time}</span>
        </label>
        <button className="icon icon-edit" onClick={editTask} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
    </li>
  )
}

Task.defaultProps = {
  description: '',
  onDeleted: () => {},
  onToggleCompleted: () => {},
  completed: false,
  id: 1,
  edit: false,
  onSubmitEdit: () => {},
  editTask: () => {},
}

Task.propTypes = {
  description: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  completed: PropTypes.bool,
  id: PropTypes.number,
  edit: PropTypes.bool,
  onSubmitEdit: PropTypes.func,
  editTask: PropTypes.func,
}

export default Task
