import PropTypes from 'prop-types'
import React from 'react'

import Task from './Task'

function ParentTask({
  id,
  timer,
  onPlay,
  onPause,
  changeTimerValue,
  ...taskProps
}) {
  const timerSet = () => {
    if (timer < 0) return '00:00'
    return `${Math.floor(timer / 60)
      .toString()
      .padStart(2, '0')}:${Math.floor(timer % 60)
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <Task
      changeTimerValue={changeTimerValue}
      timerSet={timerSet()}
      onPlay={() => onPlay(id)}
      onPause={() => onPause(id)}
      {...taskProps}
    />
  )
}

ParentTask.defaultProps = {
  changeTimerValue: () => {},
  timer: 0,
}

ParentTask.propTypes = {
  changeTimerValue: PropTypes.func,
  timer: PropTypes.number,
}

export default ParentTask
