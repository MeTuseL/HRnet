import { createSlice } from '@reduxjs/toolkit'
import { users as usersMocked } from '../__mock__/users'

/**
 * Initial state for the user information slice.
 *
 * @category Redux Slice
 * @namespace usersSlice
 * @property {Object} users - Object containing list users mocked and create.
 */
const initialState = {
    users: [...usersMocked],
}
/**
 * Redux slice for update user in list users.
 *
 * @category Redux Slice
 * @namespace usersSlice
 */
export const usersSlice = createSlice({
    name: 'users',
    initialState,

    reducers: {
        /**
         * Updates list of users.
         *
         * @function
         * @param {Object} state - Current state.
         * @param {Object} action - Redux action object.
         */
        updateListUsers: (state, action) => {
            state.users.push(action.payload)
        },
    },
})

/**
 * Actions generated by usersSlice.
 *
 * @category Redux Slice
 * @namespace usersSlice
 * @type {Object}
 */
export const { updateListUsers } = usersSlice.actions

/**
 * Selector function to  list of user's from state.
 *
 * @category Redux Selector
 * @param {Object} state - Redux state object.
 * @returns {Object} List of user's.
 */
export const selectListUsers = (state) => state.usersInfos.users

/**
 * Reducer function for usersSlice.
 *
 * @category Redux Reducer
 * @namespace userssSlice
 * @type {Function}
 */
export default usersSlice.reducer
