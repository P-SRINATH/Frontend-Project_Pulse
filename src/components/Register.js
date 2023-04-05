import React from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import axios from 'axios'
import signup from './images/signup.svg'

export default function Register() {
    let {register,handleSubmit,formState:{errors}}=useForm()

    let {errorMessage}=useSelector(state=>state.login)

    let navigate=useNavigate()
    const onSubmit=async(userObj)=>{
        try{
            
           let res=await axios.post("http://localhost:4000/user/registerUser",userObj);
           console.log("result status :",res.status)
           if(res.status===200){
             navigate('/login')
           }
         }
         catch(err){
            console.log("Error occured")
         }
        console.log("Submitted")
      }
  return (
    <div>
        <div className='row'>
            <div className='col mx-auto'>
                {/* Add the Image for interactiveness*/}
                <img src={signup} alt="Img"></img>
            </div>
            {/* Adding the Form for Registeration */}
            <div className='col'>
                <div className='row mx-auto'>
                    <p className='display-5 text-dark justify-content-left'>REGISTER</p>
                    {errorMessage && <p className='text-danger'>{errorMessage}</p>}
                    <div className='col-10 col-sm-8 col-md-6 shadow'>
                        <form  onSubmit={handleSubmit(onSubmit)}>
                            <div className='mt-3'>
                                <label htmlFor="user_email"className='fs-6 mb-1'>Email</label>
                                <input type="text" {...register('user_email',{required:true})} placeholder="....Email" className='form-control'/>
                                {errors.user_email?.type==='required' && <p className='text-danger'>Email required*</p>}
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="user_password" className='fs-6 mb-1'>Password</label>
                                <input type="password" {...register('user_password',{required:true})} placeholder="....Password" className='form-control'/>
                                {errors.user_password?.type==='required' && <p className='text-danger'>Password required*</p>}
                            </div>
                            <button type='submit' className='btn btn-dark mt-4 mb-2 me-2'>Register</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}
