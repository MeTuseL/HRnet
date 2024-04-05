import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import { Provider } from 'react-redux'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import EmployeeList from './pages/EmployeeList'
import store from './__store__/store'
import './styles/index.css'

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Outlet />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: 'employeelist',
                    element: <EmployeeList />,
                },
            ],
        },
    ],
    {
        basename: '/HRnet',
    }
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
