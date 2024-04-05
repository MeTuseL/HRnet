import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import styles from './styles/modal.module.css'

function Modal(props) {
    const { message, onIconClick } = props
    const [isOpen, setIsOpen] = useState(true)

    const handleIconClick = () => {
        setIsOpen(false)
        onIconClick(false)
    }
    return (
        <>
            {isOpen && (
                <div className={styles.modalContainer}>
                    <div className={styles.modal}>
                        <FaTimes
                            className={styles.modal__closeIcon}
                            onClick={handleIconClick}
                        />
                        <span className={styles.modal__msg}>{message}</span>
                    </div>
                </div>
            )}
        </>
    )
}
export default Modal
