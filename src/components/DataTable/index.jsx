import React, { useState, useEffect } from 'react'
import styles from './styles/datatable.module.css'
import { FaSortUp, FaSortDown, FaSearch } from 'react-icons/fa'
import PropTypes from 'prop-types'

/**
 * DataTable component for displaying tabular data with sorting and pagination functionality.
 *
 * @category Components
 * @component
 * @param {object} props - The props passed to the DataTable component.
 * @param {object[]} props.data - The array of objects representing the data to be displayed in the table.
 * @param {object} [props.customStyles] - Custom styles for the DataTable.
 * @returns {JSX.Element} A React element representing the DataTable.
 */
function DataTable({ data, customStyles }) {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [search, setSearch] = useState('')
    const [filteredSearchData, setFilteredSearchData] = useState(data)
    const [sortKey, setSortKey] = useState('')
    const [sortOrder, setSortOrder] = useState('')

    useEffect(() => {
        // Filter data based on search
        const filtered = data.filter((user) =>
            Object.values(user).some((value) =>
                value.toString().toLowerCase().includes(search.toLowerCase())
            )
        )
        setFilteredSearchData(filtered)
        setPage(1) // Reset page when search  changes
    }, [data, search])

    // Sort data based on the selected key and order
    const sortedData = [...filteredSearchData].sort((a, b) => {
        const aValue = a[sortKey]
        const bValue = b[sortKey]

        // Custom comparison function
        const compareValues = (valueA, valueB) => {
            // Check if the values are numbers
            if (!isNaN(valueA) && !isNaN(valueB)) {
                return sortOrder === 'asc' ? valueA - valueB : valueB - valueA
            }
            // Check if the values are dates
            else if (Date.parse(valueA) && Date.parse(valueB)) {
                const dateA = new Date(valueA)
                const dateB = new Date(valueB)
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
            }
            // Compare the values as strings
            else {
                const stringA = String(valueA).toLowerCase()
                const stringB = String(valueB).toLowerCase()
                return sortOrder === 'asc'
                    ? stringA.localeCompare(stringB)
                    : stringB.localeCompare(stringA)
            }
        }

        // Call the custom comparison function
        return compareValues(aValue, bValue)
    })
    // Function to handle sorting by key
    const handleSort = (key) => {
        if (sortKey === key) {
            // Toggle sort order if the same key is clicked again
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            // Set the new sort key and order
            setSortKey(key)
            setSortOrder('asc')
        }
    }
    // Function to handle moving to previous page
    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1))
    }
    // Function to handle moving to next page
    const handleNextPage = () => {
        setPage((prevPage) =>
            Math.min(
                prevPage + 1,
                Math.ceil(filteredSearchData.length / perPage)
            )
        )
    }
    // Function to handle changing entries per page
    const handlePerPageChange = (e) => {
        setPerPage(parseInt(e.target.value))
    }

    // Slice the sorted data to display only entries for the current page
    const currentPageData = sortedData.slice(
        (page - 1) * perPage,
        page * perPage
    )

    return (
        <div
            className={`${styles.tableContainer} ${customStyles && customStyles.tableContainer}`}
        >
            <div
                className={`${styles.tableSearch} ${customStyles && customStyles.tableSearch}`}
            >
                <input
                    className={`${styles.tableSearch__input} ${customStyles && customStyles.tableSearchInput}`}
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch
                    className={`${styles.tableSearch__icon} ${customStyles && customStyles.tableSearchIcon}`}
                />
            </div>
            <table
                className={`${styles.table} ${customStyles && customStyles.table}`}
            >
                <thead>
                    <tr>
                        {Object.keys(data[0]).map((key) => (
                            <th
                                className={`${styles.table__th} ${customStyles && customStyles.tableTh}`}
                                key={key}
                                onClick={() => handleSort(key)}
                            >
                                <div
                                    className={`${styles.table__th__header} 
                                    ${customStyles && customStyles.tableThHeader}`}
                                >
                                    <span
                                        className={`${styles.table__th__header__name} 
                                        ${customStyles && customStyles.tableThHeaderName}`}
                                    >
                                        {key.charAt(0).toUpperCase() +
                                            key.slice(1)}
                                    </span>
                                    <span>
                                        <FaSortUp
                                            className={`${styles.table__th__header__iconUp} 
                                        ${customStyles && customStyles.tableThHeaderIconUp}`}
                                            style={{
                                                color:
                                                    sortKey === key &&
                                                    sortOrder === 'asc'
                                                        ? '#615d5d'
                                                        : '#C7C4C4',
                                            }}
                                        />
                                        <FaSortDown
                                            className={`${styles.table__th__header__iconDown} 
                                        ${customStyles && customStyles.tableThHeaderIconDown}`}
                                            style={{
                                                color:
                                                    sortKey === key &&
                                                    sortOrder === 'desc'
                                                        ? '#615d5d'
                                                        : '#C7C4C4',
                                            }}
                                        />
                                    </span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody
                    className={`${styles.table__body} ${customStyles && customStyles.tableBody}`}
                >
                    {currentPageData.length === 0 ? (
                        <tr>
                            <td
                                colSpan={Object.keys(data[0]).length}
                                className={styles.table__body__noResults}
                            >
                                <span
                                    className={`${styles.noResultsMsg} ${customStyles && customStyles.tableNoResults}`}
                                >
                                    No results found
                                </span>
                            </td>
                        </tr>
                    ) : (
                        currentPageData.map((user, index) => (
                            <tr key={index}>
                                {Object.values(user).map((value, i) => (
                                    <td
                                        key={i}
                                        className={`${styles.table__body__cell}
                                            ${customStyles && customStyles.tableCell}`}
                                    >
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div
                className={`${styles.pagination} ${customStyles && customStyles.pagination}`}
            >
                <span
                    className={`${styles.pagination__page} ${customStyles && customStyles.paginationPage}`}
                >
                    {`Page ${page} of ${Math.ceil(filteredSearchData.length / perPage)}`}
                </span>
                <button
                    className={`${styles.pagination__btn} ${customStyles && customStyles.paginationBtn}`}
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className={`${styles.pagination__btn} ${customStyles && customStyles.paginationBtn}`}
                    onClick={handleNextPage}
                    disabled={
                        page === Math.ceil(filteredSearchData.length / perPage)
                    }
                >
                    Next
                </button>
                <label for="pagination-select" class={styles.visually_hidden}>
                    Choose an option :
                </label>
                <select
                    id="pagination-select"
                    className={`${styles.pagination__select} ${customStyles && customStyles.paginationSelect}`}
                    onChange={handlePerPageChange}
                    value={perPage}
                >
                    {[10, 25, 50, 100].map((value) => (
                        <option key={value} value={value}>
                            Show {value} entries
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
DataTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    customStyles: PropTypes.shape({
        tableContainer: PropTypes.string,
        tableSearch: PropTypes.string,
        tableSearchInput: PropTypes.string,
        tableSearchIcon: PropTypes.string,
        table: PropTypes.string,
        tableTh: PropTypes.string,
        tableThHeader: PropTypes.string,
        tableThHeaderName: PropTypes.string,
        tableThHeaderIconUp: PropTypes.string,
        tableThHeaderIconDown: PropTypes.string,
        tableBody: PropTypes.string,
        tableNoResults: PropTypes.string,
        tableCell: PropTypes.string,
        pagination: PropTypes.string,
        paginationPage: PropTypes.string,
        paginationBtn: PropTypes.string,
        paginationSelect: PropTypes.string,
    }),
}
export default DataTable
