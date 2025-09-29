import { useEffect, useState, useRef } from 'react'
import './CurrentEmployees.css'

function CurrentEmployees() {
  const [employees, setEmployees] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('employees')) || []
    } catch (e) {
      return []
    }
  })
  const listRef = useRef(null)

  useEffect(() => {
    function handleAdded(e) {
      const newEmployees = e.detail && Array.isArray(e.detail) ? e.detail : []
      if (newEmployees.length === 0) return
      setEmployees((prev) => [...prev, ...newEmployees])
    }

    window.addEventListener('employees:added', handleAdded)
    return () => window.removeEventListener('employees:added', handleAdded)
  }, [])

  return (
    <div className="current-employees-container">
      <div className="table-wrapper">
        <table className="employees-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Start Date</th>
              <th>Department</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
            </tr>
          </thead>
          <tbody ref={listRef}>
            {employees.map((emp, idx) => (
              <tr key={idx}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.dateOfBirth}</td>
                <td>{emp.startDate}</td>
                <td>{emp.department}</td>
                <td>{emp.street}</td>
                <td>{emp.city}</td>
                <td>{emp.state}</td>
                <td>{emp.zipCode || emp.zip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CurrentEmployees
