import React from 'react'
import home from './images/home.svg'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  let navigate=useNavigate()
  const gotologin=()=>{
    navigate('/login')
  }
  return (
    <div>
      <div className='row'>
        <div className='col'>
          <img src={home} alt="IMG"></img>
        </div>
        <div className='col justify-content-center mt-5'>
          <div class="container">
              <div class="row" >
                <div class="col mb-3">
                  <div className="card bg-dark text-light">
                    <div className="card-body">
                      <h5 className="card-title">GDO</h5>
                      <p className="card-text">Manages Teams and Projects here.</p>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div className="card bg-dark text-light">
                      <div className="card-body">
                        <h5 className="card-title">ADMIN</h5>
                        <p className="card-text">Manages Creation and Deletion of projects here.</p>
                      </div>
                  </div>
                </div>
                <div class="w-100"></div>
                <div class="col">
                  <div className="card bg-warning">
                    <div className="card-body">
                      <h5 className="card-title">Project Manager</h5>
                      <p className="card-text">Manages Project Concerns and Updates.</p>
                    </div>
                  </div>
                </div>
                <div class="col ">
                  <div className="card bg-warning">
                      <div className="card-body">
                        <h5 className="card-title">Super-Admin</h5>
                        <p className="card-text">Manages The User and Assigns Role.</p>
                      </div>
                  </div>
                </div>
          </div>
        </div>
            <div className="card mt-4 shadow">
              <div className="card-body">
                <h5 className="card-title">Welcome To WAL</h5>
                <p className="card-text">This product will serve as tracking tool for projects and portfolio for each GDO and overall organisation.</p>
                <button className='btn btn-dark' onClick={gotologin}>Lets get started</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
