import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'

function Home() {
    const [startDate, setStartDate] = useState(new Date())

    const saveEmployee = () => {}
    return (
        <>
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="container">
                <Link to="/employeelist">View Current Employees</Link>
                <h2>Create Employee</h2>
                <form action="#" id="create-employee">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" />

                    <label htmlFor="date-of-birth">Date of Birth</label>
                    {/*  componant pluging datapicker */}
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />

                    <label htmlFor="start-date">Start Date</label>
                    {/*  componant pluging datapicker */}
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" />

                        <label htmlFor="city">City</label>
                        <input id="city" type="text" />

                        <label htmlFor="state">State</label>
                        {/*  componant pluging  dropdown */}

                        <label htmlFor="zip-code">Zip Code</label>
                        <input id="zip-code" type="number" />
                    </fieldset>

                    <label htmlFor="department">Department</label>
                    {/*  componant pluging  dropdown */}
                </form>

                <button onClick={saveEmployee}>Save</button>
            </div>
            {/*  componant pluging modal */}
        </>
    )
}
export default Home
