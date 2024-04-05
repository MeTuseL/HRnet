import React, { useState, useEffect } from 'react'
import styles from './styles/datatable.module.css'

const DataTable = (props) => {
    const { data } = props
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [search, setSearch] = useState('')
    const [filteredSearchData, setFilteredSearchData] = useState(data)

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

    const handlePreviousPage = () => {
        // Go to previous page
        setPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    const handleNextPage = () => {
        // Go to next page
        setPage((prevPage) =>
            Math.min(
                prevPage + 1,
                Math.ceil(filteredSearchData.length / perPage)
            )
        )
    }

    const handlePerPageChange = (e) => {
        // Change number of entries per page
        setPerPage(parseInt(e.target.value))
    }

    // Slice the filtered data to display only entries for the current page
    const currentPageData = filteredSearchData.slice(
        (page - 1) * perPage,
        page * perPage
    )

    return (
        <div className={styles.tableContainer}>
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table className={styles.table}>
                <thead>
                    <tr>
                        {Object.keys(data[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((user, index) => (
                        <tr key={index}>
                            {Object.values(user).map((value, i) => (
                                <td key={i}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <span>
                    Page {page} of
                    {Math.ceil(filteredSearchData.length / perPage)}
                </span>
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={
                        page === Math.ceil(filteredSearchData.length / perPage)
                    }
                >
                    Next
                </button>
                <select onChange={handlePerPageChange} value={perPage}>
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

export default DataTable
