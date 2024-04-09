import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectListUsers } from '../../__features__/users'
import DataTable from '../../components/DataTable'
import { formatDate } from '../../__services__/formatData'
import styles from './styles/employeeList.module.css'

function EmployeeList() {
    const listUsers = useSelector(selectListUsers)
    // Format the list of users by removing the ID
    //and replacing the state object with its abbreviation
    // and formatting the dates
    const formatListUsers = listUsers.map(({ id, ...user }) => ({
        ...user,
        startDate: formatDate(user.startDate),
        dateOfBirth: formatDate(user.dateOfBirth),
        state: user.state.abbreviation,
    }))

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.container__title}>Current Employees</h1>
                <div className={styles.container__main}>
                    <DataTable data={formatListUsers} />

                    <Link to="/" className={styles.container__main__Link}>
                        Go back to Home
                    </Link>
                </div>
            </div>
        </>
    )
}
export default EmployeeList
