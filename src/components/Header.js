import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { clearState } from '../slices/loginSlice';

export default function Header() {
  let {userObj,status}=useSelector((state)=>state.login);
  let dispatch=useDispatch()
  let logout=()=>{
    sessionStorage.removeItem("token")
    dispatch(clearState())
  }
  return (
    <div>
      {status==="success"?(
        <ul class="nav justify-content-end bg-dark p-2">
        <p className='mt-2'>Welcome , {userObj.user_email}</p>
        <li class="nav-item">
          <NavLink className={({isActive})=>isActive?"active nav-link":"inactive nav-link"} to="/login" onClick={logout}>
            Logout
          </NavLink>
        </li>
        </ul>
      ):(
      <ul class="nav justify-content-end bg-dark p-2">
           <li class="nav-item">
              <NavLink className={({isActive})=>isActive?"active nav-link":"inactive nav-link"} to="/" >
                Home
              </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className={({isActive})=>isActive?"active nav-link":"inactive nav-link"} to="/login" >
              Login
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className={({isActive})=>isActive?"active nav-link":"inactive nav-link"} to="/register">
              Register
            </NavLink>
          </li>
        </ul>)}
    </div>
  )
}
