import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import EmployeeList from './pages/EmployeeList'
import store from './__store__/store'
import './styles/index.css'
import Layout from './components/Layout'

/**
 * Main entry point for the Argent Bank application.
 *
 * This script sets up the application's routing and state management
 * using React Router and Redux.
 *
 * @category Router
= */

// Create the application's routing configuration
const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout />,
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
// Render the application with Redux Provider and Router Provider
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
