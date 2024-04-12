import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectListUsers } from '../../__features__/users'
import DataTable from '../../components/DataTable/index.jsx'
import { formatDate } from '../../__services__/formatData'
import styles from './styles/employeeList.module.css'

/**
 * Component for displaying the list of employees.
 *
 * @category Pages
 * @component
 * @returns {JSX.Element} A React element representing the employee list page.
 */
function EmployeeList() {
    const listUsers = useSelector(selectListUsers)
    // Format the list of users by removing the ID
    // and replacing the state object with its abbreviation
    // and formatting the dates
    // eslint-disable-next-line no-unused-vars
    const formatListUsers = listUsers.map(({ id, ...user }) => ({
        ...user,
        startDate: formatDate(user.startDate),
        dateOfBirth: formatDate(user.dateOfBirth),
        state: user.state.abbreviation,
    }))

    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.container__title}>Current Employees</h1>
                <div className={styles.container__main}>
                    <DataTable data={formatListUsers} />

                    <Link to="/" className={styles.container__main__Link}>
                        Go back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default EmployeeList
