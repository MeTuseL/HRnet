import styles from './styles/errorField.module.css'
import PropTypes from 'prop-types'

/**
 * Component for displaying error messages.
 *
 * @category Components
 * @component
 * @param {object} props - The props passed to the ErrorField component.
 * @param {string} props.messageError - The error message to display.
 * @returns {JSX.Element} A React element representing the error message.
 */
function ErrorField({ messageError }) {
    return (
        <>
            <span className={styles.errorMessage}>{messageError}</span>
        </>
    )
}
ErrorField.propTypes = {
    messageError: PropTypes.string.isRequired,
}
export default ErrorField
