import { useRef } from 'react'
import { useSelector } from 'react-redux'
import './CurrentEmployees.css'

function CurrentEmployees() {
  const employees = useSelector((state) => state.employees)
  const listRef = useRef(null)

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
