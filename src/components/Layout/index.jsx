import { Outlet } from 'react-router-dom'
import styles from './styles/layout.module.css'
/**
 * Component representing a layout with outlet containing nested routes.
 *
 * @category Components
 * @component
 * @returns  { JSX.Element } A React component that renders a layout with an outlet containing nested routes.
 */
function Layout() {
    return (
        <>
            <div className={styles.container}>
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}
export default Layout
