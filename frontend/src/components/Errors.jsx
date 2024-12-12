import React from 'react'

function Errors({errors}) {
  console.log(errors)
  return (
    <>
        {
    errors  &&
    <div class="alert alert-warning" role="alert">
            {Object.keys(errors).map(key => (
                <li key={key}>{errors[key][0]}</li>
            ))}
    </div>
  }
    </>
  )
}

export default Errors