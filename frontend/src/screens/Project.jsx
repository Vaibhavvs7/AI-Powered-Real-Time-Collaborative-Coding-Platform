import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Project = ({navigate}) => {
    const location = useLocation()
    console.log(location.state)
  return (
    <div>Project</div>
  )
}

export default Project