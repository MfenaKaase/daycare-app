import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import DaycareWebsite from "./views/DaycareWebsite";
import UserRegistrationForm from "./views/UserRegistrationForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/home',
                element: <DaycareWebsite />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/registration',
                element: <UserRegistrationForm />
            },
        ]
    },
])

export default router;