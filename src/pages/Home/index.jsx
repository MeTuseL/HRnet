import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import Dropdown from '../../components/Dropdown'
import { states, departments } from '../../__mock__/dropdownOptions'
import { useDispatch, useSelector } from 'react-redux'
import {
    createUser,
    resetUser,
    selectListUsers,
    updateListUsers,
} from '../../__features__/user'

function Home() {
    const dispatch = useDispatch()
    const listUsers = useSelector(selectListUsers)
    const [startDate, setStartDate] = useState(null)
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [userInfos, setUserInfos] = useState({
        id: null,
        firstName: '',
        lastName: '',
        startDate: '',
        department: '',
        dateOfBirth: '',
        street: '',
        city: '',
        state: {
            name: '',
            abbreviation: '',
        },
        zipCode: '',
    })
    const statesNames = states.map(({ name }) => name)
    const nameDate = ['dateOfBirth', 'startDate']
    const nameState = ['state', 'department']

    // Function to handle field changes
    const handleFieldChange = (e) => {
        const { name, value } = e.target
        const userInfos_ = { ...userInfos }
        userInfos_[name] = value
        setUserInfos(userInfos_)
    }
    const handleSelectionChange = (option, nameState) => {
        const userInfos_ = { ...userInfos }

        if (nameState === 'department') {
            userInfos_[nameState] = option
        } else {
            const globalState = states.find((state) => state.name === option)
            userInfos_[nameState] = {
                ...userInfos_[nameState],
                name: globalState.name,
                abbreviation: globalState.abbreviation,
            }
        }

        setUserInfos(userInfos_)
    }
    const handleDateChange = (date, nameDate) => {
        nameDate === 'dateOfBirth' ? setDateOfBirth(date) : setStartDate(date)
        const userInfos_ = { ...userInfos }
        userInfos_[nameDate] = date.toISOString() //Convert date to ISO 8601
        setUserInfos(userInfos_)
    }
    const createId = () => {
        //Create a unique ID
        const lastUser = listUsers[listUsers.length - 1]
        const userInfos_ = { ...userInfos }
        userInfos_.id = lastUser.id + 1
        setUserInfos(userInfos_)
    }
    const createEmployee = (e) => {
        e.preventDefault()
        //
        dispatch(createUser(userInfos))
        dispatch(updateListUsers())
        dispatch(resetUser())
        console.log(userInfos)
    }
    return (
        <>
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="container">
                <Link to="/employeelist">View Current Employees</Link>
                <h2>Create Employee</h2>
                <form action="#" id="create-employee" onSubmit={createEmployee}>
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        autoComplete="firstName"
                        value={userInfos.firstName}
                        onChange={handleFieldChange}
                    />

                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        name="lastName"
                        autoComplete="lastName"
                        value={userInfos.lastName}
                        onChange={handleFieldChange}
                    />

                    <label htmlFor="date-of-birth">Date of Birth</label>
                    {/*  componant plugin datapicker */}
                    <DatePicker
                        showIcon
                        toggleCalendarOnIconClick
                        placeholderText="Select a date"
                        selected={dateOfBirth}
                        onChange={(date) => handleDateChange(date, nameDate[0])}
                    />
                    <label htmlFor="start-date">Start Date</label>
                    {/*  componant plugin datapicker */}
                    <DatePicker
                        name="startDate"
                        autoComplete="startDate"
                        showIcon
                        toggleCalendarOnIconClick
                        placeholderText="Select a date"
                        selected={startDate}
                        onChange={(date) => handleDateChange(date, nameDate[1])}
                    />

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input
                            id="street"
                            type="text"
                            name="street"
                            autoComplete="street"
                            value={userInfos.street}
                            onChange={handleFieldChange}
                        />

                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            type="text"
                            name="city"
                            autoComplete="city"
                            value={userInfos.city}
                            onChange={handleFieldChange}
                        />

                        <label htmlFor="state">State</label>
                        {/*  componant plugin  dropdown */}
                        <Dropdown
                            options={statesNames}
                            onChange={(option) =>
                                handleSelectionChange(option, nameState[0])
                            }
                        />

                        <label htmlFor="zip-code">Zip Code</label>
                        <input
                            id="zip-code"
                            type="number"
                            name="zipCode"
                            autoComplete="zipCode"
                            value={userInfos.zipCode}
                            onChange={handleFieldChange}
                        />
                    </fieldset>

                    <label htmlFor="department">Department</label>
                    {/*  componant plugin  dropdown */}
                    <Dropdown
                        options={departments}
                        onChange={(option) =>
                            handleSelectionChange(option, nameState[1])
                        }
                    />
                    <button onClick={createId}>Save</button>
                </form>
            </div>
            {/* {showModal && <Modal message="Employee created !" />} */}
        </>
    )
}
export default Home
