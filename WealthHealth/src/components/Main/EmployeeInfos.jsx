import DatePicker from '../DatePicker/DatePicker'
import SelectMenu from 'hrnet-select-menu'

function EmployeeInfos({ errors = {} }) {
    const departments = [
                                        { value: 'sales', label: 'Sales' },
                                        { value: 'marketing', label: 'Marketing' },
                                        { value: 'engineering', label: 'Engineering' },
                                        { value: 'hr', label: 'Human Resources' },
                                        { value: 'legal', label: 'Legal' }
                                    ]

    return (
        <div className="EmployeeContainer EmployeeInfos">
            <p className="title-form">Employee Infos</p>
            <div className="form-employee">
                <label form="first-name">First Name :</label>
                <input type="text" id="first-name" name="first-name" placeholder="Enter your first name" required></input>
                <span className="field-error" id="error-first-name" aria-live="polite">{errors['first-name'] || ''}</span>
                <label form="last-name">Last Name :</label>
                <input type="text" id="last-name" name="last-name" placeholder="Enter your last name" required></input>
                <span className="field-error" id="error-last-name" aria-live="polite">{errors['last-name'] || ''}</span>
                <label form="dob">Date of Birth :</label>
                <DatePicker id="dob" name="dob" placeholder="Enter your date of Birth" required />
                <span className="field-error" id="error-dob" aria-live="polite">{errors['dob'] || ''}</span>
                <label form="start-date">Start Date :</label>
                <DatePicker id="start-date" name="start-date" placeholder="Enter your start Date" required />
                <span className="field-error" id="error-start-date" aria-live="polite">{errors['start-date'] || ''}</span>
                <label form="department">Department :</label>
                <SelectMenu id="department" name="department" placeholder="Select a department" options={departments} required />
                <span className="field-error" id="error-department" aria-live="polite">{errors['department'] || ''}</span>
            </div>
        </div>
    )
  }
  
  export default EmployeeInfos
