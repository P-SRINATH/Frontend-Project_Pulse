import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function GdoProjects() {

  //Get the userObj from the state
  let {userObj}=useSelector(state=>state.login)
  
  let navigate=useNavigate()
  let [project,setProjects]=useState([])
  const token=sessionStorage.getItem("token")

  //Function to get Projects under the GDO 
  const getProjectData=async()=>{
    let res=await axios.get(`http://localhost:4000/gdo/getPortfolioDashboard/${userObj.user_email}`,{
      headers:{Authorization: `Bearer ${token}`}
    })
    setProjects(res.data.projects)
  }

  useEffect(()=>{
    getProjectData()
  },[])
  return (
    <div>
        <p className='fs-3 text-center'>PROJECT PORTFOLIO DASHBOARD</p>
        {/*Project Dashboard displays the details of the project */}
        <table class="table table-bordered shadow">
            <thead>
                <tr className='bg-warning'>
                    <th scope='col'>Project-ID</th>
                    <th scope="row">Project Name</th>
                    <th scope="col">Client</th>
                    <th scope="col">Account</th>
                    <th scope='col'>Client account manager</th>
                    <th scope='col'>Status of Project</th>
                    <th scope='col'>Project Start date</th>
                    <th scope='col'>Project End date</th>
                    <th scope='col'>Fitness</th>
                    <th scope='col'>Project Details</th>
                </tr>
            </thead>
            <tbody>
            {project.map((proObj)=>(<tr key={proObj.id}>
            <td>{proObj.project_id}</td>
            <td>{proObj.project_name}</td>
            <td>{proObj.project_client}</td>
            <td>{proObj.client_account}</td>
            <td>{proObj.client_account_manager}</td>
            <td>{proObj.status_of_project}</td>
            <td>{proObj.project_start_date}</td>
            <td>{proObj.project_end_date}</td>
            <td>{proObj.project_fitness}</td>
            <td><button className='btn btn-dark'onClick={()=>navigate(`/getspecific/${proObj.project_id}`)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
            </svg>
              </button></td>
          </tr>))}
            </tbody>
        </table>
    </div>
  )
}
