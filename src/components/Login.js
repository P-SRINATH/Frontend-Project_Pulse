import React from 'react'
import {useForm} from 'react-hook-form' 
import { useNavigate } from 'react-router-dom'
//import axios from 'axios'
import { useDispatch ,useSelector} from 'react-redux'
import { userLogin } from '../slices/loginSlice'
import { useEffect } from 'react'
import logup from './images/logup.svg'

export default function Login() {
    //Use form hook to handle the login form
  let {register,handleSubmit,formState:{errors},reset}=useForm()
  let navigate=useNavigate();
    //To dispatch the action
    let dispatch=useDispatch();

  let {userObj,status,errorMessage}=useSelector(state=>state.login)
  // console.log("User Object from login",userObj)

  useEffect(()=>{
    if(status==="success"){
      if(userObj.user_role==="GDO"){
        navigate(`/gdo/:${userObj.user_email}`)
      }
      else if(userObj.user_role==="ProjectManager"){
        navigate('/projectManager')
      }
      else if(userObj.user_role==="Admin"){
        navigate('/admin')
      }
      else if(userObj.user_role==="superadmin"){
        navigate('/superadmin')
      }
    }
  },[status])
  //console.log("Status of login : ",status)
//UseNavigate hook is used to navigate to other components

  const goToRegister=()=>{
    navigate('/register')
  }
  const forgotPwd=()=>{
    navigate('/forgotpassword')
  }
  const onSubmit=async(userObj)=>{
    dispatch(userLogin(userObj))
  }
  return (
    <div className='row'>
    <div className='col'>
      {/* Insert an Login Image */}
      <img src={logup} alt="IMG"></img>
    </div>
    <div className='col'>
    <p className='display-5 text-dark justify-content-left'>LOGIN</p>
    {errorMessage && <p className='text-danger'>{errorMessage}</p>}
      <div className='row mx-auto'>
        <div className='col-10 col-sm-8 col-md-6 shadow'>
            <form >
                <div className='mt-4'>
                    <label htmlFor="user_email">Email</label>
                    <input type="text" {...register('user_email',{required:true})} id='email' className='form-control'/>
                    {errors.user_email?.type==='required' && <p className='text-danger'>Email required*</p>}
                </div>
                <div className='mt-3'>
                    <label htmlFor="password">Password</label>
                    <input type="password" {...register('user_password',{required:true})} id='password' className='form-control'/>
                    {errors.user_password?.type==='required' && <p className='text-danger'>Password required*</p>}
                </div>
                <button type='submit' className='btn btn-dark btn-rounded  mt-4 me-2' onClick={handleSubmit(onSubmit)}>Login</button>
                <button className='btn btn-warning btn-rounded  mt-4 me-2' onClick={forgotPwd}>Forgot Password</button>
                <p className='mt-4'>New User ? <button className='btn btn-dark btn-rounded ' onClick={goToRegister}>Register</button></p>
            </form>
        </div>
      </div>
    </div>
    
  </div>
  )
}
