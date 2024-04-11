import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Dropdown from '../components/Dropdown'

/**
 * Test suite for the Dropdown component.
 *
 * @category Test
 * @group Dropdown
 */
describe('Dropdown Component', () => {
    /**
     * Test data for the Dropdown component.
     * @typedef {Object} TestData
     * @property {string} label - The label for the dropdown.
     * @property {string[]} options - The options for the dropdown.
     * @property {function} onChange - The onChange function for the dropdown.
     */

    /**
     * Test data to be used in the Dropdown component.
     * @type {TestData}
     */
    const testData = {
        label: 'Select an option',
        options: ['Option 1', 'Option 2', 'Option 3'],
        onChange: jest.fn(),
    }

    /**
     * Test to ensure that the Dropdown component renders correctly.
     * @function
     * @memberof Dropdown
     * @name shouldRenderCorrectly
     */
    it('should render correctly', () => {
        render(<Dropdown {...testData} />)

        expect(screen.getByText(testData.label)).toBeInTheDocument()
        testData.options.forEach((option) => {
            expect(screen.getByText(option)).toBeInTheDocument()
        })
    })

    /**
     * Test to ensure that the Dropdown component displays options when clicked.
     * @function
     * @memberof Dropdown
     * @name shouldDisplayOptions
     */
    it('should display options when clicked', () => {
        render(<Dropdown {...testData} />)

        const dropdownSelect = screen.getByText(testData.label)
        fireEvent.click(dropdownSelect)

        testData.options.forEach((option) => {
            expect(screen.getByText(option)).toBeInTheDocument()
        })
    })

    /**
     * Test to ensure that the Dropdown component calls onChange when an option is selected.
     * @function
     * @memberof Dropdown
     * @name shouldCallOnChange
     */
    it('should call onChange when an option is selected', () => {
        render(<Dropdown {...testData} />)

        const dropdownSelect = screen.getByText(testData.label)
        fireEvent.click(dropdownSelect)

        const selectedOption = testData.options[1]
        const optionElement = screen.getByText(selectedOption)
        fireEvent.click(optionElement)

        expect(testData.onChange).toHaveBeenCalledWith(selectedOption)
    })
})
