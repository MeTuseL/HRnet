import { useState, useEffect, useRef } from 'react'
import styles from './styles/dropdown.module.css'

function Dropdown(props) {
    const { options, onChange } = props
    const [isActive, setIsActive] = useState(false)
    const [selectedOption, setSelectedOption] = useState(options[0])
    const [isBlock, setIsBlock] = useState('none')
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
                setIsBlock('none')
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
        setIsBlock('none')
        onChange(option) // Call the onChange function with the selected option
    }
    return (
        <>
            <div className={styles.dropdown} ref={dropdownRef}>
                <div
                    className={styles.dropdown__select}
                    onClick={() => {
                        setIsActive(!isActive)
                        setIsBlock('block')
                    }}
                >
                    {selectedOption}
                </div>
                {isActive && (
                    <div
                        className={styles.dropdown__options}
                        style={{ display: isBlock }}
                    >
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={styles.dropdown__options__option}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
export default Dropdown
