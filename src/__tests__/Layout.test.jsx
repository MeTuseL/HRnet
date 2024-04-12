import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from '../components/Layout'

/**
 * Test suite for the Layout component.
 *
 * @category Test
 * @group Layout
 */
describe('Layout Component', () => {
    /**
     * Test to ensure that the layout container is rendered.
     * @function
     * @memberof Layout
     * @name shouldRenderLayoutContainer
     */
    it('renders the layout container', () => {
        render(
            <Router>
                <Layout />
            </Router>
        )

        expect(screen.getByTestId('layout-container')).toBeInTheDocument()
    })

    /**
     * Test to ensure that the main outlet for nested routes is rendered.
     * @function
     * @memberof Layout
     * @name shouldRenderMainOutletForNestedRoutes
     */
    it('renders the main outlet for nested routes', () => {
        render(
            <Router>
                <Layout />
            </Router>
        )

        expect(screen.getByRole('main')).toBeInTheDocument()
    })
})
