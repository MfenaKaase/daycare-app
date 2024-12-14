import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Register from "./views/Register";
import Users from "./views/Users";
import DaycareWebsite from "./views/DaycareWebsite";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/users',
                element: <Users />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },

])

export default router;