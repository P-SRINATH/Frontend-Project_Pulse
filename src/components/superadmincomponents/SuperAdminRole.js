import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function SuperAdminRole(props) {

    let {register,handleSubmit,formState:{errors}}=useForm()
    const token=sessionStorage.getItem("token")
    let {status}=useSelector(state=>state.login)

    const onSubmit=async(userObj)=>{
        await axios.put('http://localhost:4000/super-admin/createUserRole',userObj,{
        headers:{Authorization: `Bearer ${token}`}})
        props.getUserData()
        
    }
    useEffect(()=>{
        onSubmit()
    },[status])
  return (
    <div>
        <div className='row'>
        <div className='col-10 col-sm-8 col-md-6 shadow mt-4 ms-5'>
            <form >
                <div className='mt-4'>
                    <label htmlFor="user_email">Email</label>
                    <input type="text" {...register('user_email',{required:true})} id='email' className='form-control'/>
                    {errors.user_email?.type==='required' && <p className='text-danger'>Email required*</p>}
                </div>
                
                <div className='mt-3'>
                    <label htmlFor="user_role">Role</label>
                    <select class="form-select" {...register('user_role',{required:true})} aria-label="Default select example">
                        <option selected>Add Role</option>
                        <option value="ProjectManager">Project Manager</option>
                        <option value="GDO">GDO</option>
                        <option value="Admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                    </select>
                    {errors.user_role?.type==='required' && <p className='text-danger'>Role required*</p>}
                </div>
                <button type='submit' className='btn btn-dark btn-rounded  mt-4 mb-4' onClick={handleSubmit(onSubmit)}>Add Role</button>
            </form>
        </div>
      </div>
    </div>
  )
}
