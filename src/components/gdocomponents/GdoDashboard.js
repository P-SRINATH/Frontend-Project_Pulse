import React from 'react'
import GdoProjects from './GdoProjects'
import projects2 from '../images/projects2.svg'
import CreateProjectTeam from './CreateProjectTeam'

export default function GdoDashboard() {
  return (
    <div>
      <div className='row'>
        <div className='container col-sm-2'>
          <img src={projects2} width="200px" height="300px"alt="img" ></img>
          <CreateProjectTeam />
        </div>
        <div className='col-sm-10'>
          <GdoProjects />
        </div>
      </div>
    </div>
  )
}
