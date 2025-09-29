import { useState } from 'react'
import EmployeeAdress from './EmployeeAdress'
import EmployeeInfos from './EmployeeInfos'
import SaveBtn from './SaveBtn'
import Modal from '../Modal/Modal'

function Main() {
        const [errors, setErrors] = useState({})
        const [showModal, setShowModal] = useState(false)

        function validate(formData) {
                const e = {}
                const firstName = formData.get('first-name')?.trim() || ''
                const lastName = formData.get('last-name')?.trim() || ''
                const dob = formData.get('dob')?.trim() || ''
                const startDate = formData.get('start-date')?.trim() || ''
                const department = formData.get('department') || ''
                const street = formData.get('street')?.trim() || ''
                const city = formData.get('city')?.trim() || ''
                const state = formData.get('state') || ''
                const zip = formData.get('zip')?.trim() || ''

                if (!firstName || firstName.length < 2) e['first-name'] = 'Please enter a first name (min 2 chars)'
                if (!lastName || lastName.length < 2) e['last-name'] = 'Please enter a last name (min 2 chars)'

                if (!dob) e['dob'] = 'Please provide a date of birth'
                if (!startDate) e['start-date'] = 'Please provide a start date'

                if (!department) e['department'] = 'Please select a department'

                if (!street) e['street'] = 'Please enter a street'
                if (!city) e['city'] = 'Please enter a city'
                if (!state) e['state'] = 'Please select a state'

                if (!zip) e['zip'] = 'Please enter a zip code'
                else if (!/^\d{5}(-\d{4})?$/.test(zip)) e['zip'] = 'Zip code should be 5 digits'

                const dobDate = new Date(dob)
                const startDateObj = new Date(startDate)
                if (dob && startDate) {
                    if (!isFinite(dobDate) || !isFinite(startDateObj)) {
                    } else if (startDateObj < dobDate) {
                        e['start-date'] = 'Start date cannot be before date of birth'
                    }
                }

                return e
        }

        function handleSubmit(event) {
                event.preventDefault()
                const form = event.target
                const formData = new FormData(form)
                const validationErrors = validate(formData)
                setErrors(validationErrors)
                if (Object.keys(validationErrors).length === 0) {
            const employee = {
                firstName: formData.get('first-name')?.trim() || '',
                lastName: formData.get('last-name')?.trim() || '',
                dateOfBirth: formData.get('dob')?.trim() || '',
                startDate: formData.get('start-date')?.trim() || '',
                department: formData.get('department') || '',
                street: formData.get('street')?.trim() || '',
                city: formData.get('city')?.trim() || '',
                state: formData.get('state') || '',
                zipCode: formData.get('zip')?.trim() || ''
            }

            const employees = JSON.parse(localStorage.getItem('employees')) || []
            employees.push(employee)
            localStorage.setItem('employees', JSON.stringify(employees))

            window.dispatchEvent(new CustomEvent('employees:added', { detail: [employee] }))

            setShowModal(true)
            form.reset()
                }
        }

        return (
                <div>
                    <form id="create-employee" onSubmit={handleSubmit} noValidate>
                        <div className="main">
                                <EmployeeInfos errors={errors} />
                                <EmployeeAdress errors={errors} />
                        </div>
                        <SaveBtn />
                    </form>

                    {showModal && (
                        <Modal message="Employee Created !" onClose={() => setShowModal(false)} />
                    )}
                </div>
        )
    }
  
    export default Main
  