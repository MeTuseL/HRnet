import styles from './styles/errorField.module.css'

function ErrorField({ messageError }) {
    return (
        <>
            <span className={styles.errorMessage}>{messageError}</span>
        </>
    )
}
export default ErrorField
