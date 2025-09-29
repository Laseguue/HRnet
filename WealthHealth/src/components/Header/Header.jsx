import { Link, useLocation } from 'react-router-dom'


function Header() {
    const { pathname } = useLocation()
    const onCurrentEmployees = pathname === '/current-employees'

    return (
        <div className="header">
            <img className="logo" src="/HRnet.png" alt="logo-HRnet" />
            <p className="p-header">{onCurrentEmployees ? 'Current Employees' : 'Create Employee'}</p>
            {onCurrentEmployees ? (
              <Link to="/">
                <button className="btn-current-employee">Create Employee</button>
              </Link>
            ) : (
              <Link to="/current-employees">
                <button className="btn-current-employee">View Current Employees</button>
              </Link>
            )}
        </div>
    )
  }
  
  export default Header
  