import React, { useState, useRef, useEffect } from 'react'
import './DatePicker.css'

function pad(n) {
  return n < 10 ? `0${n}` : `${n}`
}

function formatDateDDMMYYYY(date) {
  if (!date) return ''
  const d = date.getDate()
  const m = date.getMonth() + 1
  const y = date.getFullYear()
  return `${pad(d)}/${pad(m)}/${y}`
}

function getMonthMatrix(year, month) {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const startDay = first.getDay()
  const shift = (startDay + 6) % 7
  const daysInMonth = last.getDate()

  const matrix = []
  let week = []
  for (let i = 0; i < shift; i++) week.push(null)

  for (let d = 1; d <= daysInMonth; d++) {
    week.push(new Date(year, month, d))
    if (week.length === 7) {
      matrix.push(week)
      week = []
    }
  }

  if (week.length > 0) {
    while (week.length < 7) week.push(null)
    matrix.push(week)
  }

  return matrix
}

export default function DatePicker({ id, name, placeholder }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [display, setDisplay] = useState('')
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear())
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth())

  const rootRef = useRef(null)

  useEffect(() => {
    function onClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => {
    setDisplay(formatDateDDMMYYYY(selected))
  }, [selected])

  function handleInputClick() {
    setOpen((s) => !s)
  }

  function handleSelect(date) {
    setSelected(date)
    setOpen(false)
  }

  function prevMonth() {
    const m = viewMonth - 1
    if (m < 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else setViewMonth(m)
  }

  function nextMonth() {
    const m = viewMonth + 1
    if (m > 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else setViewMonth(m)
  }

  const matrix = getMonthMatrix(viewYear, viewMonth)

  return (
    <div className="date-picker" ref={rootRef} style={{ position: 'relative' }}>
      <input
        id={id}
        name={name}
        type="text"
        readOnly
        value={display}
        onClick={handleInputClick}
        placeholder={placeholder}
        className="date-picker-input"
      />

      {open && (
        <div className="calendar-popup" role="dialog" aria-modal="true">
          <div className="calendar-header">
            <button type="button" onClick={prevMonth} aria-label="Previous month">‹</button>
            <div className="calendar-month">
              {new Date(viewYear, viewMonth).toLocaleString(undefined, { month: 'long' })} {viewYear}
            </div>
            <button type="button" onClick={nextMonth} aria-label="Next month">›</button>
          </div>

          <div className="calendar-grid">
            <div className="calendar-weekdays">
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (
                <div key={d} className="weekday">{d}</div>
              ))}
            </div>
            {matrix.map((week, i) => (
              <div key={i} className="calendar-week">
                {week.map((day, idx) => {
                  const isToday = day && (formatDateDDMMYYYY(day) === formatDateDDMMYYYY(new Date()))
                  const isSelected = day && selected && (formatDateDDMMYYYY(day) === formatDateDDMMYYYY(selected))
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`day ${day ? '' : 'disabled'} ${isToday ? 'day--today' : ''} ${isSelected ? 'day--selected' : ''}`}
                      onClick={() => day && handleSelect(day)}
                      disabled={!day}
                    >
                      {day ? day.getDate() : ''}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
