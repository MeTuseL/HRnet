import { configureStore } from '@reduxjs/toolkit'
import usersSlice from '../__features__/users'

export default configureStore({
    reducer: { usersInfos: usersSlice },
})
