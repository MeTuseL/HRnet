import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DataTable from '../components/DataTable'

/**
 * Test suite for the DataTable component.
 *
 * @category Test
 * @group DataTable
 */
describe('DataTable Component', () => {
    /**
     * Test data for the DataTable component.
     * @typedef {Object} TestData
     * @property {number} id - The ID of the data entry.
     * @property {string} name - The name of the data entry.
     * @property {number} age - The age of the data entry.
     * @property {string} city - The city of the data entry.
     */

    /**
     * Test data to be used in the DataTable component.
     * @type {TestData[]}
     */
    const data = [
        { id: 1, name: 'Test 1', age: 1, city: 'Paris' },
        { id: 2, name: 'Test 2', age: 2, city: 'Pointe à Pitre' },
    ]

    /**
     * Test to ensure that the DataTable component renders correctly.
     * @function
     * @memberof DataTable
     * @name shouldRenderCorrectly
     */
    it('should render correctly', () => {
        render(<DataTable data={data} />)

        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
        expect(screen.getByText('Test 1')).toBeInTheDocument()
        expect(screen.getByText('Test 2')).toBeInTheDocument()
    })

    /**
     * Test to ensure that the DataTable component sorts data when column header is clicked.
     * @function
     * @memberof DataTable
     * @name shouldSortData
     */
    it('should sort data when column header is clicked', () => {
        render(<DataTable data={data} />)

        const columnHeader = screen.getByText('Name')
        fireEvent.click(columnHeader)

        const test1Element = screen.getByText('Test 1')
        const test2Element = screen.getByText('Test 2')
        expect(test1Element).toBeInTheDocument()
        expect(test2Element).toBeInTheDocument()
        expect(test1Element.compareDocumentPosition(test2Element)).toBe(4)
    })

    /**
     * Test to ensure that the DataTable component filters data based on search input.
     * @function
     * @memberof DataTable
     * @name shouldFilterData
     */
    it('should filter data based on search input', () => {
        render(<DataTable data={data} />)

        const searchInput = screen.getByPlaceholderText('Search')
        fireEvent.change(searchInput, { target: { value: 'Test 2' } })

        expect(screen.getByText('Test 2')).toBeInTheDocument()
        expect(screen.queryByText('Test 1')).not.toBeInTheDocument()
    })
})
