import { useState, useEffect, useRef } from 'react'
import styles from './styles/dropdown.module.css'
import { FaAngleDown } from 'react-icons/fa'

function Dropdown({ label, options, onChange, customStyles }) {
    const [isActive, setIsActive] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const dropdownRef = useRef(null)
    // const defaultOption = options[0]
    // useEffect(() => {
    //     onChange(defaultOption)
    // }, [])
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

    const handleOptionClick = (option) => {
        setSelectedOption(option)
        setIsActive(false)
        onChange(option)
    }
    const toggleDropdown = () => {
        setIsActive(!isActive)
    }

    return (
        <>
            <div
                className={`${styles.dropdown} ${customStyles && customStyles.dropdown}`}
                ref={dropdownRef}
            >
                <div
                    className={`${styles.dropdown__select} ${customStyles && customStyles.dropdownSelect}`}
                    style={{ borderRadius: isActive ? '4px 4px 0 0' : '4px' }}
                    onClick={toggleDropdown}
                >
                    {selectedOption === null ? (
                        <span>{label}</span>
                    ) : (
                        <span>{selectedOption}</span>
                    )}
                    <FaAngleDown
                        className={`${styles.dropdown__icon} ${customStyles && customStyles.dropdownIcon}`}
                        style={{ transform: isActive ? 'rotate(180deg)' : '' }}
                    />
                </div>

                <div
                    className={`${styles.dropdown__options} ${customStyles && customStyles.dropdownOptions}`}
                    style={{ height: isActive ? '150px' : '0' }}
                >
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`${styles.dropdown__options__option} ${customStyles && customStyles.dropdownOption}`}
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
export default Dropdown
