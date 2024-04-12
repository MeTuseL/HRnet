import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'

/**
 * Test suite for the ErrorPage component.
 *
 * @category Test
 * @group ErrorPage
 */
describe('ErrorPage Component', () => {
    /**
     * Test to ensure that the ErrorPage component renders correctly.
     * @function
     * @memberof ErrorPage
     * @name shouldRenderCorrectly
     */
    it('should render correctly', () => {
        render(
            <Router>
                <ErrorPage />
            </Router>
        )

        expect(screen.getByText('404 Page not found')).toBeInTheDocument()
        expect(screen.getByText('Return to homepage')).toBeInTheDocument()
        expect(
            screen.getByRole('link', { name: 'Return to homepage' })
        ).toHaveAttribute('href', '/')
    })
})
