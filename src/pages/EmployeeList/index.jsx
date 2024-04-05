import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectListUsers } from '../../__features__/user'
import DataTable from '../../components/DataTable'

function EmployeeList() {
    const listUsers = useSelector(selectListUsers)
    // Format the list of users by removing the ID
    //and replacing the state object with its abbreviation
    const formatListUsers = listUsers.map(({ id, ...user }) => ({
        ...user,
        state: user.state.abbreviation,
    }))

    return (
        <>
            <div id="employee-div" className="container">
                <h1>Current Employees</h1>
                {/* componant pluging table*/}
                <DataTable data={formatListUsers} />

                <Link to="/">Home</Link>
            </div>
        </>
    )
}
export default EmployeeList
