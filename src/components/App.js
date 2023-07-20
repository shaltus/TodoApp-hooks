import React, { useState, useEffect, useRef } from 'react'

import NewTaskForm from './New-task'
import TaskList from './Task-list'
import Footer from './Footer'

function counter() {
  let maxId = 1
  return () => maxId++
}
const maxId = counter()
function App() {
  const [filter, setFilter] = useState('all')
  const [todoData, setTodoData] = useState([])
  const intervalRef = useRef()

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => {
      const newArr = prevTodoData.filter((item) => item.id !== id)
      return newArr
    })
  }

  const addItem = (text, timerSec) => {
    const newItem = {
      description: text,
      completed: false,
      id: maxId(),
      time: new Date(),
      timer: timerSec,
    }
    setTodoData([...todoData, newItem])
  }

  const editTask = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id)
      const oldItem = prevTodoData[idx]
      const newItem = { ...oldItem, edit: !oldItem.edit }
      const newArray = [
        ...prevTodoData.slice(0, idx),
        newItem,
        ...prevTodoData.slice(idx + 1),
      ]
      return newArray
    })
  }

  const onSubmitEdit = (event, id) => {
    event.preventDefault()
    const index = todoData.findIndex((el) => el.id === id)
    const oldData = todoData[index]
    const newData = {
      ...oldData,
      edit: !oldData.edit,
      description: event.target[0].value,
    }
    setTodoData([
      ...todoData.slice(0, index),
      newData,
      ...todoData.slice(index + 1),
    ])
  }

  const onToggleCompleted = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[idx]
    const newItem = { ...oldItem, completed: !oldItem.completed }
    setTodoData([
      ...todoData.slice(0, idx),
      newItem,
      ...todoData.slice(idx + 1),
    ])
  }

  const clearComplete = () => {
    setTodoData(todoData.filter((item) => !item.completed))
  }

  const filterTask = () => {
    if (filter === 'all') return todoData
    return todoData.filter((item) =>
      filter === 'completed' ? item.completed : !item.completed,
    )
  }

  const onFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const changeTimerValue = (id, value) => {
    setTodoData((prevTodoData) => {
      const index = prevTodoData.findIndex((el) => el.id === id)
      if (index === -1) return prevTodoData
      const oldItem = prevTodoData[index]
      const newItem = { ...oldItem, timer: value }
      const newArray = [
        ...prevTodoData.slice(0, index),
        newItem,
        ...prevTodoData.slice(index + 1),
      ]
      return newArray
    })
  }

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTodoData((prevTodoData) =>
        prevTodoData.map((todo) =>
          todo.pause ? todo : { ...todo, timer: todo.timer - 1 },
        ),
      )
    }, 1000)
  }

  useEffect(() => {
    startTimer()

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  const onPlay = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo) =>
        todo.id !== id ? todo : { ...todo, pause: false },
      ),
    )
  }

  const onPause = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo) =>
        todo.id !== id ? todo : { ...todo, pause: true },
      ),
    )
  }

  const completedCount = todoData.filter((el) => !el.completed).length
  const visibleItems = filterTask()

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          editTask={editTask}
          onSubmitEdit={onSubmitEdit}
          changeTimerValue={changeTimerValue}
          onPlay={onPlay}
          onPause={onPause}
        />
        <Footer
          completedCount={completedCount}
          clearComplete={clearComplete}
          filter={filter}
          onFilterChange={onFilterChange}
        />
      </section>
    </section>
  )
}

export default App
