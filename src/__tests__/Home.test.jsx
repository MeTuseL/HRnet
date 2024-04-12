import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../__store__/store.js'
import Home from '../pages/Home/index.jsx'

/**
 * Test suite for the Home component.
 *
 * @category Test
 * @group Home
 */
describe('Home Component', () => {
    /**
     * Test to ensure that the Home component renders correctly.
     * @function
     * @memberof Home
     * @name shouldRenderCorrectly
     */
    it('should render correctly', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Home />
                </Router>
            </Provider>
        )

        expect(screen.getByText('HRnet')).toBeInTheDocument()
        expect(screen.getByText('View Current Employees')).toBeInTheDocument()
        expect(screen.getByLabelText('First Name')).toBeInTheDocument()
        expect(screen.getByLabelText('Last Name')).toBeInTheDocument()
        expect(screen.getByText('Save')).toBeInTheDocument()
    })

    /**
     * Test to ensure that error messages are displayed for invalid inputs.
     * @function
     * @memberof Home
     * @name shouldDisplayErrorMessages
     */
    it('should display error messages for invalid inputs', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Home />
                </Router>
            </Provider>
        )

        const saveButton = screen.getByText('Save')
        fireEvent.click(saveButton) // Attempt to submit form without filling any fields

        // Error messages should be displayed for all required fields
        expect(screen.getByText('First name is required')).toBeInTheDocument()
        expect(screen.getByText('Last name is required')).toBeInTheDocument()
    })

    /**
     * Test to ensure that the form submits with valid inputs.
     * @function
     * @memberof Home
     * @name shouldSubmitFormWithValidInputs
     */
    it('should submit form with valid inputs', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Home />
                </Router>
            </Provider>
        )

        fireEvent.change(screen.getByLabelText('First Name'), {
            target: { value: 'Test1' },
        })
        fireEvent.change(screen.getByLabelText('Last Name'), {
            target: { value: 'Test2' },
        })
        fireEvent.click(screen.getByText('Save'))
    })

    /**
     * Test to ensure that the userInfos state is updated when input value changes.
     * @function
     * @memberof Home
     * @name shouldUpdateUserInfosStateWhenInputChanges
     */
    it('should update userInfos state when input value changes', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Home />
                </Router>
            </Provider>
        )

        const firstNameInput = screen.getByLabelText('First Name')
        fireEvent.change(firstNameInput, { target: { value: 'Test1' } })

        expect(screen.getByLabelText('First Name')).toHaveValue('Test1')
    })

    /**
     * Test to ensure that the userInfos state is updated when date value changes.
     * @function
     * @memberof Home
     * @name shouldUpdateUserInfosStateWhenDateChanges
     */
    it('should update userInfos state when date value changes', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Home />
                </Router>
            </Provider>
        )

        const dateOfBirthInput = screen.getByLabelText('Date of Birth')
        fireEvent.change(dateOfBirthInput, { target: { value: new Date() } })

        expect(dateOfBirthInput).toHaveValue(
            new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
        )
    })
})
