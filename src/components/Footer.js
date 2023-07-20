import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from './Task-filter'

function Footer({ completedCount, clearComplete, filter, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">{completedCount} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={clearComplete}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  onFilterChange: () => {},
  completedCount: 0,
  clearComplete: () => {},
}

Footer.propTypes = {
  onFilterChange: PropTypes.func,
  completedCount: PropTypes.number,
  clearComplete: PropTypes.func,
}

export default Footer
