import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import styles from './styles/modal.module.css'

function Modal({ message, onIconClick, customStyles }) {
    const [isOpen, setIsOpen] = useState(true)

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
export default Modal
