import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../__features__/user'

export default configureStore({
    reducer: { userInfos: userSlice },
})
