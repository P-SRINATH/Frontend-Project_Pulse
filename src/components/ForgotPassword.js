import React from 'react'
import {useForm} from 'react-hook-form' 
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import lock from './images/lock.svg'
import axios from 'axios'

export default function ForgotPassword() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let {errorMessage}=useSelector(state=>state.login)
    let navigate=useNavigate();
    const onSubmit=async(userObj)=>{
        await axios.post('http://localhost:4000/user/forgotPassword',userObj)
       navigate('/resetpassword')
    }
  
  return (
    <div className='row'>
    <div className='col'>
      {/* Insert an Login Image */}
      <img src={lock} alt="IMG"></img>
    </div>
    <div className='col'>
    <p className='display-5 text-dark justify-content-left'>RESET-PASSWORD</p>
    {errorMessage && <p className='text-danger'>{errorMessage}</p>}
      <div className='row mx-auto'>
        <div className='col-10 col-sm-8 col-md-6'>
            <form >
                <div className='mt-4'>
                    <label htmlFor="user_email">Email</label>
                    <input type="text" {...register('user_email',{required:true})} id='email' className='form-control'/>
                    {errors.user_email?.type==='required' && <p className='text-danger'>Email required*</p>}
                </div>
                <button type='submit' className='btn btn-dark btn-rounded  mt-4 me-2' onClick={handleSubmit(onSubmit)}>Request OTP</button>
            </form>
        </div>
      </div>
    </div>
    
  </div>
  )
}
