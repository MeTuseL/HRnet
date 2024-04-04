import { Link } from 'react-router-dom'

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
            <div>
                <h2>404 Page not found</h2>
                <Link to="/">Return to homepage</Link>
            </div>
        </>
    )
}
export default ErrorPage