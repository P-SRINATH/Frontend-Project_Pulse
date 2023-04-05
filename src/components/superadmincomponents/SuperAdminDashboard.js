import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SuperAdminRole from './SuperAdminRole'

export default function SuperAdminDashboard() {
  let {status}=useSelector(state=>state.login)
  let [users,setUsers]=useState([])
  const token=sessionStorage.getItem("token")
  const getUserData=async()=>{
    let res=await axios.get("http://localhost:4000/super-admin/viewAllUsers",{
      headers:{Authorization: `Bearer ${token}`}
    })
    setUsers(res.data.Users)
  }
  useEffect(()=>{
    getUserData()
  },[])
  return (
    <div>
      <div className='row'>
        <div className='col'>
            <div className="card shadow bg-warning">
              <div className="card-body">
                <h5 className="card-title">Hey!! SuperAdmin</h5>
                <p className="card-text">Let's Get Started.!!! Assign and Update Roles to your Team-Mates in the Organization.
                Type in the Email id of User you want to Assign Role. Add the Role and Click On Add Role button</p>
            </div>
        </div>
        <SuperAdminRole getUserData={getUserData}/>
        </div>
        <div className='col'>
        <p className='fs-3 text-center'>USER LIST</p>
        <table class="table table-hover table-bordered shadow">
            <thead>
                <tr className='bg-dark text-light'>
                    <th scope='col'>User-Email</th>
                    <th scope="row">User-Role</th>
                </tr>
            </thead>
            <tbody>
            {users.map((userObj)=>(<tr key={userObj.user_email}>
            <td>{userObj.user_email}</td>
            <td>{userObj.user_role}</td>
          </tr>
      ))}
            </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
