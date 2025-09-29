import React from 'react'
import './Modal.css'

function Modal({ message = 'Form successfully submitted', onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-box">
        <button className="modal-close" aria-label="Close modal" onClick={onClose}>
          ×
        </button>
        <div className="modal-content">
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Modal
