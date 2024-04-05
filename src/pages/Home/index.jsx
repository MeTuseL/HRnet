import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import Dropdown from '../../components/Dropdown'
import { states, departments } from '../../__mock__/dropdownOptions'
import { useDispatch } from 'react-redux'
import { createUser, resetUser, updateListUsers } from '../../__features__/user'
import Modal from '../../components/Modal'

function Home() {
    const dispatch = useDispatch()
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
        setUserInfos({ ...userInfos, [name]: value })
    }
    const handleSelectionChange = (option, nameState) => {
        const valueOption =
            nameState === 'department'
                ? option
                : states.find((state) => state.name === option) // Find state with his abbreviation
        setUserInfos({
            ...userInfos,
            [nameState]:
                nameState === 'department'
                    ? valueOption
                    : {
                          name: valueOption.name,
                          abbreviation: valueOption.abbreviation,
                      },
        })
    }
    const handleDateChange = (date, nameDate) => {
        nameDate === 'dateOfBirth' ? setDateOfBirth(date) : setStartDate(date)
        setUserInfos({ ...userInfos, [nameDate]: date.toISOString() }) //Convert date to ISO 8601
    }
    const createId = () => {
        // Generate a unique ID using UUID (Universally Unique Identifier)
        const uniqueId = uuidv4()
        setUserInfos({ ...userInfos, id: uniqueId })
    }
    const createEmployee = (e) => {
        e.preventDefault()
        console.log(showModal)
        //
        dispatch(createUser(userInfos))
        dispatch(updateListUsers())
        dispatch(resetUser())
        setShowModal(true)
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
            {showModal && (
                <Modal
                    message="Employee created !"
                    onIconClick={(isOpen) => setShowModal(isOpen)}
                />
            )}
        </>
    )
}
export default Home
