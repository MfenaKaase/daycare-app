import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
// import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Register from "./views/Register";
import Agents from "./views/Agents";
import RecordTransaction from "./views/RecordTransaction";
import Transactions from "./views/Transactions";
import Traders from "./views/Traders";
import Loan from "./views/Loan";
import Withdraw from "./views/Withdraw";
import Save from "./views/Save";
import Option from "./views/Option";
import Withdrawals from "./views/Withdrawals";
import Loans from "./views/Loans";
import Savings from "./views/Savings";
import RepayLoan from "./views/RepayLoan";
import Users from "./views/Users";
import Locked from "./views/Locked";
import SavingReceipt from "./views/SavingReceipt";
import Profile from "./views/Profile";
import LoanReceipt from "./views/LoanReceipt";
import WithdrawalReceipt from "./views/WithdrawalReceipt";
import EditTraderProfile from "./views/EditTraderProfile";
import EditAgentProfile from "./views/EditAgentProfile";

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
            {
                path: '/users/:userID/profile',
                element: <Profile />
            },
            {
                path: '/agents/users/:userID/profile/edit',
                element: <EditAgentProfile />
            },
            {
                path: '/traders/users/:userID/profile/edit',
                element: <EditTraderProfile />
            },
            {
                path: '/agents',
                element: <Agents />
            },
            {
                path: '/transactions/record',
                element: <RecordTransaction />
            },
            {
                path: '/transactions',
                element: <Transactions />
            },
            {
                path: '/traders',
                element: <Traders/>
            },
            {
                path: '/traders/:userID/loan',
                element: <Loan/>
            },
            {
                path: '/traders/:userID/profile',
                element: <Profile/>
            },
            {
                path:'/loans',
                element: <Loans/>
            },
            {
                path: '/savings',
                element: <Savings/>
            },
            {
                path: '/traders/:userID/withdraw',
                element: <Withdraw />
            },
            {
                path: '/traders/:userID/save',
                element: <Save />
            },
            {
                path: "/traders/:userID/options",
                element: <Option />
            },
            {
                path: "/savings/:savingID/receipt",
                element: <SavingReceipt />
            },
            {
                path: "/withdrawals",
                element: <Withdrawals />
            },
            {
                path: "/withdrawals/:withdrawalID/view",
                element: <WithdrawalReceipt />
            },
            {
                path: "/traders/:userID/repay/loan",
                element: <RepayLoan />
            },
            {
                path:"/loans/:loanID/receipt",
                element: <LoanReceipt />
            },
            {
                path:'/locked',
                element: <Locked/>
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
            {
                path: '/locked',
                element: <Locked />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
    {
        path:'/profile',
        element: <Profile/>
    }

])

export default router;