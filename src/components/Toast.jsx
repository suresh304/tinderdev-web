import React from 'react'

const Toast = ({message}) => {
  return (
    <div className="toast toast-end">
  
  <div className="alert alert-success">
    <span>{message}</span>
  </div>
</div>
  )
}

export default Toast