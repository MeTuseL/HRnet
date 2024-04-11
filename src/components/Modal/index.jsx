import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import styles from './styles/modal.module.css'
import PropTypes from 'prop-types'

/**
 * Modal component for displaying messages.
 *
 * @category Components
 * @component
 * @param {object} props - The props passed to the Modal component.
 * @param {string} props.message - The message to display in the modal.
 * @param {Function} props.onIconClick - The function to handle icon click event.
 * @param {object} props.customStyles - Custom styles for the modal.
 * @returns {JSX.Element} A React element representing the modal.
 */
function Modal({ message, onIconClick, customStyles }) {
    const [isOpen, setIsOpen] = useState(true)

    // Function to handle the click event of the close icon
    const handleIconClick = () => {
        setIsOpen(false)
        onIconClick(false)
    }
    return (
        <>
            {isOpen && (
                <div
                    className={`${styles.modalContainer} ${customStyles && customStyles.modalContainer}`}
                >
                    <div
                        className={`${styles.modal} ${customStyles && customStyles.modal}`}
                    >
                        <FaTimes
                            data-testid="close-icon"
                            className={`${styles.modal__closeIcon} ${customStyles && customStyles.closeIcon}`}
                            onClick={handleIconClick}
                        />
                        <span
                            className={`${styles.modal__msg} ${customStyles && customStyles.msg}`}
                        >
                            {message}
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}
Modal.propTypes = {
    message: PropTypes.string.isRequired,
    onIconClick: PropTypes.func.isRequired,
    customStyles: PropTypes.shape({
        modalContainer: PropTypes.string,
        modal: PropTypes.string,
        closeIcon: PropTypes.string,
        msg: PropTypes.string,
    }),
}

export default Modal
