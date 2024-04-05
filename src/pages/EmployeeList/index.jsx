import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectListUsers } from '../../__features__/user'

function EmployeeList() {
    const listUsers = useSelector(selectListUsers)
    return (
        <>
            <div id="employee-div" className="container">
                <h1>Current Employees</h1>
                {/* componant pluging table*/}
                <ul className="listEmployee">
                    {listUsers.map((user, index) => (
                        <li key={index} id={`${user}-${index}`}>
                            {`id : ${user.id} 
                            /${user.firstName} /${user.lastName} 
                            /${user.startDate} /${user.department}
                            /${user.dateOfBirth} /${user.street}
                            /${user.city} /${user.state.name}
                            /${user.zipCode}`}
                        </li>
                    ))}
                </ul>

                <Link to="/">Home</Link>
            </div>
        </>
    )
}
export default EmployeeList
