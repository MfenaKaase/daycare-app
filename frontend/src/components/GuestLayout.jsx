import React from 'react'
import {Outlet, Navigate} from "react-router-dom"
import { useStateContext } from '../contexts/ContextProvider'

function GuestLayout() {
  const {token} = useStateContext()

  if (token) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="container">
      <Outlet />
    </div>
  )
}

export default GuestLayout