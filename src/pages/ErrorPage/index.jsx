import { Link } from 'react-router-dom'
import styles from './styles/errorPage.module.css'

/**
 * Component representing the error page.
 *
 * This component renders a 404 error message and provides a link to return to the homepage.

 * @category Pages
 * @component
 * @returns  { JSX.Element } A React element representing the error page.
 */
function ErrorPage() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.errorPage}>
                    <h2 className={styles.errorPage__title}>
                        404 Page not found
                    </h2>
                    <Link to="/" className={styles.errorPage__Link}>
                        Return to homepage
                    </Link>
                </div>
            </div>
        </>
    )
}
export default ErrorPage
