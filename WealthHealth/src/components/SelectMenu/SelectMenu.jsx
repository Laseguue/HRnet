import React, { useEffect, useRef, useState } from 'react'
import './SelectMenu.css'

function SelectMenu({ id, name, placeholder = 'Select...', options = [], value: controlledValue, onChange, required, defaultValue }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(controlledValue ?? defaultValue ?? '')
  const [highlight, setHighlight] = useState(-1)
  const rootRef = useRef(null)

  useEffect(() => {
    if (controlledValue !== undefined) setValue(controlledValue)
  }, [controlledValue])

  useEffect(() => {
    function onClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false)
        setHighlight(-1)
      }
    }
    window.addEventListener('mousedown', onClickOutside)
    return () => window.removeEventListener('mousedown', onClickOutside)
  }, [])

  function toggle() {
    setOpen((v) => !v)
  }

  function selectOption(opt) {
    setValue(opt.value)
    setOpen(false)
    setHighlight(-1)
    if (onChange) onChange({ target: { value: opt.value, name } })
  }

  function handleKeyDown(e) {
    if (!open && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault(); setOpen(true); return
    }
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault(); setHighlight((h) => Math.min(h + 1, options.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault(); if (highlight >= 0) selectOption(options[highlight])
    } else if (e.key === 'Escape') {
      setOpen(false); setHighlight(-1)
    }
  }

  return (
    <div className="select-menu" ref={rootRef}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`select-trigger ${open ? 'open' : ''}`}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        id={id}
      >
        <span className="select-value">{(options.find(o => o.value === value) || {}).label || placeholder}</span>
        <span className="select-caret">▾</span>
      </button>

      {open && (
        <ul role="listbox" className="select-panel" tabIndex={-1}>
          {options.map((opt, idx) => {
            const isSelected = opt.value === value
            const isHighlighted = idx === highlight
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={`select-option ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlight' : ''}`}
                onClick={() => selectOption(opt)}
                onMouseEnter={() => setHighlight(idx)}
              >
                {opt.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default SelectMenu
