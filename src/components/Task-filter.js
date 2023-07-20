import React from 'react'
import PropTypes from 'prop-types'

function TaskFilter({ filter, onFilterChange }) {
  const buttons = [
    { name: 'all', task: 'All' },
    { name: 'active', task: 'Active' },
    { name: 'completed', task: 'Completed' },
  ]
  const renderButtons = buttons.map(({ name, task }) => {
    const isActive = filter === name
    return (
      <li key={name}>
        <button
          type="button"
          className={`${isActive ? 'selected' : ''}`}
          onClick={() => onFilterChange(name)}
        >
          {task}
        </button>
      </li>
    )
  })

  return <ul className="filters">{renderButtons} </ul>
}

TaskFilter.defaultProps = {
  onFilterChange: () => {},
}

TaskFilter.propTypes = {
  onFilterChange: PropTypes.func,
}

export default TaskFilter
