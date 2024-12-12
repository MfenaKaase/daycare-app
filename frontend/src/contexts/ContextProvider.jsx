import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    roles: null,
    message: null,
    setUser: () => {},
    setToken: () => {},
    setRoles: () => {},
    setMessage: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [roles, setRoles] = useState([])
    const [message, setMessage] = useState(null)
    const [token, _setToken] = useState(sessionStorage.getItem('ACCESS_TOKEN'))

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            sessionStorage.setItem('ACCESS_TOKEN', token)
        } else {
            sessionStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            roles,
            message,
            setUser,
            setToken,
            setRoles,
            setMessage
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)