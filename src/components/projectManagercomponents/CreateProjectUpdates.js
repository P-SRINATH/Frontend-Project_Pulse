import React from 'react'
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios';

export default function CreateProjectUpdates(props) {
    let token=sessionStorage.getItem("token")
    //We can get and set values in the form using getvalues and setvalue
    let {register,formState:{errors},getValues,reset}=useForm()
  
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      //Function to create/Raise Project Update 
      const projectUpdate=async()=>{
          let userObj=getValues()
          console.log(userObj)
          let res=await axios.post(' http://localhost:4000/projectManager/createProjectUpdates',userObj,{
              headers:{Authorization:`Bearer ${token}`}
          })
          props.getProjectUpdates()
          reset()
          handleClose()
      }
  return (
    <div>
      {/*Modal to raise Project Update*/}
      <Button variant="dark" onClick={handleShow}>Raise Update</Button>
        <Modal show={show} onHide={handleClose} backdrop="static" className='bg-light'>
        <Modal.Header closeButton>
          <Modal.Title>Enter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className='w-75'>
          <div className='mt-1'>
            <label htmlFor="date">Date</label>
            <input type="date" {...register('date',{required:true})}  className='form-control'/>
            {errors.date?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="project_status_update">Project Status Update</label>
            <input type="text" {...register('project_status_update',{required:true})}  className='form-control'/>
            {errors.project_status_update?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="resourcing_status">Resourcing Status</label>
            <select class="form-select" aria-label="Default select example" {...register('resourcing_status',{required:true})} >
                <option selected disabled>Select</option>
                <option value="green">Green</option>
                <option value="red">Red</option>
                <option value="amber">Amber</option>
            </select>
            {errors.resourcing_status?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="quality_status">Quality Status</label>
            <select class="form-select" aria-label="Default select example" {...register('quality_status',{required:true})}  >
                <option selected disabled>Select</option>
                <option value="green">Green</option>
                <option value="red">Red</option>
                <option value="amber">Amber</option>
            </select>
            {errors.quality_status?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="waiting_for_client">Waiting for Client</label>
            <select class="form-select" aria-label="Default select example" {...register('waiting_for_client',{required:true})}  >
                <option selected disabled>Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            {errors.waiting_for_client?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-2'>
            <label htmlFor="project_id">Project ID</label>
            <input type="number" {...register('project_id',{required:true})} className='form-control'/>
            {errors.project_id?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={projectUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
