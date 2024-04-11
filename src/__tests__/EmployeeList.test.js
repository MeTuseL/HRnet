import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../__store__/store.js'
import { useSelector } from 'react-redux'
import EmployeeList from '../pages/EmployeeList/'
import { users } from '../__mock__/users'

// Mocking react-redux's useSelector hook
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}))

/**
 * Test suite for the EmployeeList component.
 *
 * @category Test
 * @group EmployeeList
 */
describe('EmployeeList Component', () => {
    beforeEach(() => {
        useSelector.mockReturnValue(users)
    })

    /**
     * Test to ensure that the EmployeeList component renders the employee list.
     * @function
     * @memberof EmployeeList
     * @name shouldRenderEmployeeList
     */
    it('should render the employee list', () => {
        render(
            <Provider store={store}>
                <Router>
                    <EmployeeList />
                </Router>
            </Provider>
        )

        expect(screen.getByText('Current Employees')).toBeTruthy()
    })

    /**
     * Test to ensure that the EmployeeList component renders a link to go back to Home.
     * @function
     * @memberof EmployeeList
     * @name shouldRenderLinkToHome
     */
    it('should render a link to go back to Home', () => {
        render(
            <Provider store={store}>
                <Router>
                    <EmployeeList />
                </Router>
            </Provider>
        )

        expect(screen.getByText('Go back to Home')).toHaveAttribute('href', '/')
    })
})
