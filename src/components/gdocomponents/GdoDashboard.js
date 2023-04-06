import React from 'react'
import GdoProjects from './GdoProjects'
import projects2 from '../images/projects2.svg'
import CreateProjectTeam from './CreateProjectTeam'

//GDO dashboard is the default page that appears when GDO head Logs-in
export default function GdoDashboard() {
  return (
    <div>
      <div className='row'>
        <div className='container col-sm-2'>
          <img src={projects2} width="200px" height="300px"alt="img" ></img>
          {/* Create a Project Team component */}
          <CreateProjectTeam />
        </div>
        <div className='col-sm-10'>
          {/* Component to get all Projects under the GDO */}
          <GdoProjects />
        </div>
      </div>
    </div>
  )
}
