import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import Dropdown from '../../components/Dropdown'
import { states, departments } from '../../__mock__/dropdownOptions'
import { useDispatch } from 'react-redux'
import { updateListUsers } from '../../__features__/users'
import Modal from '../../components/Modal'
import styles from './styles/home.module.css'
import ErrorField from '../../components/ErrorField'

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
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        startDate: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        department: '',
        emptyFirstName: '',
        emptyLastName: '',
        emptyDateOfBirth: '',
        emptyStartDate: '',
        emptyStreet: '',
        emptyCity: '',
        emptyState: '',
        emptyZipCode: '',
        emptyDepartment: '',
    })
    const statesNames = states.map(({ name }) => name)
    const nameDate = ['dateOfBirth', 'startDate']
    const nameState = ['state', 'department']

    // Function to handle field changes
    const handleFieldChange = (e) => {
        const { name, value } = e.target
        setUserInfos({ ...userInfos, [name]: value })
        // Reset the error message when user starts typing in the field
        const emptyFieldName = `empty${name.charAt(0).toUpperCase()}${name.slice(1)}`
        setErrors({ ...errors, [name]: '', [emptyFieldName]: '' })
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
        date && setUserInfos({ ...userInfos, [nameDate]: date.toISOString() }) //Convert date to ISO 8601

        // Reset the error message when user starts typing in the field
        const emptyFieldName = `empty${nameDate.charAt(0).toUpperCase()}${nameDate.slice(1)}`
        setErrors({ ...errors, [nameDate]: '', [emptyFieldName]: '' })

        // Check if date of birth is valid
        const today = new Date()
        const minDateOfBirth = new Date(
            today.getFullYear() - 16,
            today.getMonth(),
            today.getDate()
        )
        if (nameDate === 'dateOfBirth' && date > minDateOfBirth) {
            setErrors({
                ...errors,
                emptyDateOfBirth: 'Employee must be at least 16 years old',
            })
        }
    }
    const validateForm = () => {
        let valid = true
        const newErrors = {}

        // Validation for first name
        if (!userInfos.firstName.trim()) {
            newErrors.emptyFirstName = 'First name is required'
            valid = false
        } else if (
            userInfos.firstName.trim().length < 3 ||
            /\d/.test(userInfos.firstName)
        ) {
            newErrors.firstName = 'At least 3 letters and no numbers'
            valid = false
        }

        // Validation for last name
        if (!userInfos.lastName.trim()) {
            newErrors.emptyLastName = 'Last name is required'
            valid = false
        } else if (
            userInfos.lastName.trim().length < 3 ||
            /\d/.test(userInfos.lastName)
        ) {
            newErrors.lastName = 'At least 3 letters and no numbers'
            valid = false
        }
        // Validation for date of birth
        if (!dateOfBirth) {
            newErrors.emptyDateOfBirth = 'Date of birth is required'
            valid = false
        }
        const today = new Date()
        const minDateOfBirth = new Date(
            today.getFullYear() - 16,
            today.getMonth(),
            today.getDate()
        )
        if (dateOfBirth > minDateOfBirth) {
            newErrors.dateOfBirth = 'Employee must be at least 16 years old'
            valid = false
        }
        // Validation for start date
        if (!startDate) {
            newErrors.emptyStartDate = 'Start date is required'
            valid = false
        }
        // Validation for street
        if (!userInfos.street.trim()) {
            newErrors.emptyStreet = 'Street is required'
            valid = false
        } else if (userInfos.street.trim().length < 3) {
            newErrors.street = 'At least 3 letters'
            valid = false
        }

        // Validation for city
        if (!userInfos.city.trim()) {
            newErrors.emptyCity = 'City is required'
            valid = false
        } else if (userInfos.city.trim().length < 3) {
            newErrors.city = 'At least 3 letters'
            valid = false
        }
        // Validation for state
        if (!userInfos.state.name.trim()) {
            newErrors.emptyState = 'Select a State'
            valid = false
        }
        // Validation for zip code
        if (!userInfos.zipCode.trim()) {
            newErrors.emptyZipCode = 'Zip code is required'
            valid = false
        } else if (!/^\d+$/.test(userInfos.zipCode)) {
            newErrors.zipCode = 'Only numbers'
            valid = false
        }
        // Validation for state
        if (!userInfos.department.trim()) {
            newErrors.emptyDepartment = 'Select a Department'
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const createEmployee = (e) => {
        e.preventDefault()

        if (!validateForm()) return
        // Generate a unique ID using UUID (Universally Unique Identifier)
        const uniqueId = uuidv4()
        //
        dispatch(updateListUsers({ ...userInfos, id: uniqueId }))
        setShowModal(true)
    }
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.container__title}>HRnet</h1>
                <div className={styles.container__main}>
                    <Link
                        to="/employeelist"
                        className={styles.container__main__Link}
                    >
                        View Current Employees
                    </Link>
                    <h2>Create Employee</h2>
                    <form
                        action="#"
                        id="create-employee"
                        onSubmit={createEmployee}
                    >
                        <label htmlFor="first-name">First Name</label>
                        <input
                            type="text"
                            id="first-name"
                            name="firstName"
                            autoComplete="firstName"
                            value={userInfos.firstName}
                            onChange={handleFieldChange}
                        />
                        {errors.emptyFirstName && (
                            <ErrorField messageError={errors.emptyFirstName} />
                        )}
                        {errors.firstName && (
                            <ErrorField messageError={errors.firstName} />
                        )}

                        <label htmlFor="last-name">Last Name</label>
                        <input
                            type="text"
                            id="last-name"
                            name="lastName"
                            autoComplete="lastName"
                            value={userInfos.lastName}
                            onChange={handleFieldChange}
                        />
                        {errors.emptyLastName && (
                            <ErrorField messageError={errors.emptyLastName} />
                        )}
                        {errors.lastName && (
                            <ErrorField messageError={errors.lastName} />
                        )}

                        <label htmlFor="date-of-birth">Date of Birth</label>
                        <DatePicker
                            placeholderText="mm/dd/yyyy"
                            selected={dateOfBirth}
                            onChange={(date) =>
                                handleDateChange(date, nameDate[0])
                            }
                        />
                        {errors.emptyDateOfBirth && (
                            <ErrorField
                                messageError={errors.emptyDateOfBirth}
                            />
                        )}
                        {errors.dateOfBirth && (
                            <ErrorField messageError={errors.dateOfBirth} />
                        )}

                        <label htmlFor="start-date">Start Date</label>
                        <DatePicker
                            placeholderText="mm/dd/yyyy"
                            selected={startDate}
                            onChange={(date) =>
                                handleDateChange(date, nameDate[1])
                            }
                        />
                        {errors.emptyStartDate && (
                            <ErrorField messageError={errors.emptyStartDate} />
                        )}
                        <fieldset>
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
                            {errors.emptyStreet && (
                                <ErrorField messageError={errors.emptyStreet} />
                            )}
                            {errors.street && (
                                <ErrorField messageError={errors.street} />
                            )}

                            <label htmlFor="city">City</label>
                            <input
                                id="city"
                                type="text"
                                name="city"
                                autoComplete="city"
                                value={userInfos.city}
                                onChange={handleFieldChange}
                            />
                            {errors.emptyCity && (
                                <ErrorField messageError={errors.emptyCity} />
                            )}
                            {errors.city && (
                                <ErrorField messageError={errors.city} />
                            )}

                            <label htmlFor="state">State</label>
                            <Dropdown
                                label="State"
                                options={statesNames}
                                onChange={(option) =>
                                    handleSelectionChange(option, nameState[0])
                                }
                                customStyles={{
                                    dropdownSelect: styles.customDropdownSelect,
                                    dropdownOptions:
                                        styles.customDropdownOptions,
                                    dropdownOption: styles.customDropdownOption,
                                }}
                            />
                            {errors.emptyState && (
                                <ErrorField messageError={errors.emptyState} />
                            )}

                            <label htmlFor="zip-code">Zip Code</label>
                            <input
                                id="zip-code"
                                type="number"
                                name="zipCode"
                                autoComplete="zipCode"
                                value={userInfos.zipCode}
                                onChange={handleFieldChange}
                            />
                            {errors.emptyZipCode && (
                                <ErrorField
                                    messageError={errors.emptyZipCode}
                                />
                            )}
                            {errors.zipCode && (
                                <ErrorField messageError={errors.zipCode} />
                            )}
                        </fieldset>

                        <label htmlFor="department">Department</label>
                        <Dropdown
                            label="Department"
                            options={departments}
                            onChange={(option) =>
                                handleSelectionChange(option, nameState[1])
                            }
                            customStyles={{
                                dropdownSelect: styles.customDropdownSelect,
                                dropdownOptions: styles.customDropdownOptions,
                                dropdownOption: styles.customDropdownOption,
                            }}
                        />
                        {errors.emptyDepartment && (
                            <ErrorField messageError={errors.emptyDepartment} />
                        )}
                        <button className={styles.saveBtn}>Save</button>
                    </form>
                </div>
                {showModal && (
                    <Modal
                        message="Employee created !"
                        onIconClick={(isOpen) => setShowModal(isOpen)}
                        customStyles={{
                            modal: styles.customModal,
                        }}
                    />
                )}
            </div>
        </>
    )
}
export default Home
