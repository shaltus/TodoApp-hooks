import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import ParentTask from './ParentTask'

function TaskList({
  todos,
  onDeleted,
  onToggleCompleted,
  editTask,
  onSubmitEdit,
  changeTimerValue,
  onPlay,
  onPause,
}) {
  return (
    <ul className="todo-list">
      {todos.map(({ id, description, time, ...item }) => (
        <ParentTask
          key={id}
          description={description}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          editTask={() => editTask(id)}
          onSubmitEdit={(event) => onSubmitEdit(event, id)}
          time={formatDistanceToNow(time, { includeSeconds: true })}
          changeTimerValue={(id, value) => changeTimerValue(id, value)}
          onPlay={onPlay}
          onPause={onPause}
          id={id}
          {...item}
        />
      ))}
    </ul>
  )
}
TaskList.defaultProps = {
  todos: {},
  onDeleted: () => {},
  onToggleCompleted: () => {},
  editTask: () => {},
  onSubmitEdit: () => {},
  changeTimerValue: () => {},
}
TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  editTask: PropTypes.func,
  onSubmitEdit: PropTypes.func,
  changeTimerValue: PropTypes.func,
}
export default TaskList
