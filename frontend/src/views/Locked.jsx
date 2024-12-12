import React from 'react'
import notFoundSvg from '../assets/not-found.svg'
import { Link } from 'react-router-dom'

function Locked() {
  return (
    <div className='container'>
      <section className="error-404">
        <h1 className='' style={{
          fontSize : '40px'
        }}>403 - FORBIDDEN</h1>
        <h2>The Website Has Been Locked! Contact The Website Admin</h2>
        <Link className="btn" to="/login">Back to Login</Link>
        {/* <img src={'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik02IDZjMC0zLjMxMSAyLjY4OS02IDYtNnM2IDIuNjg4IDYgNnY0aDN2MTRoLTE4di0xNGgzdi00em0xNCA1aC0xNnYxMmgxNnYtMTJ6bS0xMy01djRoMTB2LTRjMC0yLjc2LTIuMjQtNS01LTVzLTUgMi4yNC01IDV6Ii8+PC9zdmc+'} className="img-fluid py-5" alt="Page Locked" /> */}
      </section>
    </div>
  )
}

export default Locked