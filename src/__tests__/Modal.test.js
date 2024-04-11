import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Modal from '../components/Modal'

/**
 * Test suite for the Modal component.
 *
 * @category Test
 * @group Modal
 */
describe('Modal Component', () => {
    const message = 'This is a modal message'
    const onIconClick = jest.fn()

    /**
     * Test to ensure that the modal renders correctly.
     * @function
     * @memberof Modal
     * @name shouldRenderCorrectly
     */
    it('should render correctly', () => {
        render(<Modal message={message} onIconClick={onIconClick} />)
        expect(screen.getByText(message)).toBeInTheDocument()
    })

    /**
     * Test to ensure that onIconClick is called when the close icon is clicked.
     * @function
     * @memberof Modal
     * @name shouldCallOnIconClick
     */
    it('should call onIconClick when close icon is clicked', () => {
        render(<Modal message={message} onIconClick={onIconClick} />)
        const closeIcon = screen.getByTestId('close-icon')
        fireEvent.click(closeIcon)
        expect(onIconClick).toHaveBeenCalledTimes(1)
        expect(onIconClick).toHaveBeenCalledWith(false)
    })

    /**
     * Test to ensure that the modal does not render when isOpen is false.
     * @function
     * @memberof Modal
     * @name shouldNotRenderWhenIsOpenIsFalse
     */
    it('should not render when isOpen is false', () => {
        render(<Modal message={message} onIconClick={onIconClick} />)
        expect(screen.getByText(message)).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('close-icon'))
        expect(screen.queryByText(message)).not.toBeInTheDocument()
    })
})
