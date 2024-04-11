import { useState, useEffect, useRef } from 'react'
import styles from './styles/dropdown.module.css'
import { FaAngleDown } from 'react-icons/fa'
import PropTypes from 'prop-types'

/**
 * Dropdown component for selecting options from a list.
 *
 * @category Components
 * @component
 * @param {object} props - The props passed to the Dropdown component.
 * @param {string} props.label - The label for the dropdown.
 * @param {string[]} props.options - The options to be displayed in the dropdown.
 * @param {Function} props.onChange - The function to be called when an option is selected.
 * @param {object|string} props.customStyles - Custom styles for the dropdown.
 * @returns {JSX.Element} A React element representing the dropdown.
 */
function Dropdown({ label, options, onChange, customStyles }) {
    const [isActive, setIsActive] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const dropdownRef = useRef(null)

    useEffect(() => {
        // Function to handle clicks outside the dropdown
        const handleClickOutside = (e) => {
            // Check if dropdown reference exists and if the clicked element is outside the dropdown
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                // If clicked outside, close the dropdown
                setIsActive(false)
            }
        }
        // Add event listener for clicks outside the dropdown when the component mounts
        document.addEventListener('mousedown', handleClickOutside)
        // Remove event listener when the component unmounts to avoid memory leaks
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownRef])

    // Function to handle option click
    const handleOptionClick = (option) => {
        setSelectedOption(option)
        setIsActive(false)
        onChange(option)
    }
    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setIsActive(!isActive)
    }

    return (
        <>
            <div
                className={`${styles.dropdown} ${
                    customStyles &&
                    typeof customStyles.dropdown === 'string' &&
                    customStyles.dropdown
                }`}
                style={{
                    ...(customStyles &&
                        typeof customStyles.dropdown === 'object' &&
                        customStyles.dropdown),
                }}
                ref={dropdownRef}
            >
                <div
                    className={`${styles.dropdown__select} ${
                        customStyles &&
                        typeof customStyles.dropdownSelect === 'string' &&
                        customStyles.dropdownSelect
                    }`}
                    style={{
                        borderRadius: isActive ? '4px 4px 0 0' : '4px',
                        ...(customStyles &&
                            typeof customStyles.dropdownSelect === 'object' &&
                            customStyles.dropdownSelect),
                    }}
                    onClick={toggleDropdown}
                >
                    {selectedOption === null ? (
                        <span>{label}</span>
                    ) : (
                        <span>{selectedOption}</span>
                    )}
                    <FaAngleDown
                        className={`${styles.dropdown__icon} ${
                            customStyles &&
                            typeof customStyles.dropdownIcon === 'string' &&
                            customStyles.dropdownIcon
                        }`}
                        style={{
                            transform: isActive ? 'rotate(180deg)' : '',
                            ...(customStyles &&
                                typeof customStyles.dropdownIcon === 'object' &&
                                customStyles.dropdownIcon),
                        }}
                    />
                </div>

                <div
                    className={`${styles.dropdown__options} ${
                        customStyles &&
                        typeof customStyles.dropdownOptions === 'string' &&
                        customStyles.dropdownOptions
                    }`}
                    style={{
                        maxHeight: isActive ? '150px' : '0',
                        ...(customStyles &&
                            typeof customStyles.dropdownOptions === 'object' &&
                            customStyles.dropdownOptions),
                    }}
                >
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`${styles.dropdown__options__option} ${
                                customStyles &&
                                typeof customStyles.dropdownOption ===
                                    'string' &&
                                customStyles.dropdownOption
                            }`}
                            style={{
                                ...(customStyles &&
                                    typeof customStyles.dropdownOption ===
                                        'object' &&
                                    customStyles.dropdownOption),
                            }}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
Dropdown.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    customStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

export default Dropdown
