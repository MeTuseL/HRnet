import { configureStore } from '@reduxjs/toolkit'
import usersSlice from '../__features__/users'

/**
 * Configures and creates a Redux store instance.
 *
 * This function creates a Redux store using the provided reducer.
 *
 * @category Store
 * @returns {Object} The configured Redux store.
 */
export default configureStore({
    reducer: { usersInfos: usersSlice },
})
