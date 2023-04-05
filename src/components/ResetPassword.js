import React from 'react'
import {useForm} from 'react-hook-form' 
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import lock from './images/lock.svg'
import axios from 'axios'

export default function ResetPassword() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let {errorMessage}=useSelector(state=>state.login)
    let navigate=useNavigate();
    const onSubmit=async(userObj)=>{
        let res=await axios.post('http://localhost:4000/user/resetPassword',userObj)
        console.log(userObj)
        console.log(res);
        //navigate('/login')
    }
  return (
    <div className='row'>
    <div className='col'>
      {/* Insert an Login Image */}
      <img src={lock} alt="IMG"></img>
    </div>
    <div className='col'>
    <p className='display-5 text-dark justify-content-left'>RESET-DETAILS</p>
    {errorMessage && <p className='text-danger'>{errorMessage}</p>}
      <div className='row mx-auto'>
        <div className='col-10 col-sm-8 col-md-6'>
            <form >
                <div className='mt-4'>
                    <label htmlFor="email">Email</label>
                    <input type="text" {...register('email',{required:true})} id='email' className='form-control'/>
                    {errors.email?.type==='required' && <p className='text-danger'>Email required*</p>}
                </div>
                <div className='mt-3'>
                    <label htmlFor="otp">Enter OTP</label>
                    <input type="number" {...register('otp',{required:true})} id='password' className='form-control'/>
                    {errors.otp?.type==='required' && <p className='text-danger'>OTP required*</p>}
                </div>
                <div className='mt-3'>
                    <label htmlFor="password">New Password</label>
                    <input type="password" {...register('password',{required:true})} id='password' className='form-control'/>
                    {errors.password?.type==='required' && <p className='text-danger'>Password required*</p>}
                </div>
                <button type='submit' className='btn btn-dark btn-rounded  mt-4 me-2' onClick={handleSubmit(onSubmit)}>Reset Password</button>
            </form>
        </div>
      </div>
    </div>
    
  </div>
  )
}
