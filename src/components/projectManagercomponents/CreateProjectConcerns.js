import React from 'react'
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios';

export default function CreateProjectConcerns(props) {
    let token=sessionStorage.getItem("token")
    //We can get and set values in the form using getvalues and setvalue
    let {register,formState:{errors},getValues,reset}=useForm()
  
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      //Function to get Project Concerns
      const projectConcern=async()=>{
          let userObj=getValues()
          console.log(userObj)
          let res=await axios.post('http://localhost:4000/projectManager/createProjectConcerns',userObj,{
              headers:{Authorization:`Bearer ${token}`}
          })
          props.getProjectConcern()
          reset()
          handleClose()
  
      }
  return (
    <div>
      {/*Modal to create/Raise Project Concern */}
      <Button variant="warning" onClick={handleShow}>Raise Concern</Button>
        <Modal show={show} onHide={handleClose} backdrop="static" className='bg-light'>
        <Modal.Header closeButton>
          <Modal.Title>Enter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className='w-75'>
          <div className='mt-2'>
            <label htmlFor="project_id">Project ID</label>
            <input type="number" {...register('project_id',{required:true})} className='form-control'/>
            {errors.project_id?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="concern_description">Concern Description</label>
            <input type="text" {...register('concern_description',{required:true})}  className='form-control'/>
            {errors.concern_description?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="concern_raised_by">Concern Raised By</label>
            <input type="text" {...register('concern_raised_by',{required:true})} className='form-control'/>
            {errors.concern_raised_by?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="concern_raised_on_date">Concern Raised On </label>
            <input type="date" {...register('concern_raised_on_date',{required:true})}  className='form-control'/>
            {errors.concern_raised_on_date?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="severity_of_concern">Severity of Concern</label>
            <select class="form-select" aria-label="Default select example" {...register('severity_of_concern',{required:true})} >
                <option selected disabled>Select</option>
                <option value="high">High</option>
                <option value="low">Low</option>
                <option value="intermediate">Intermediate</option>
            </select>
            {errors.severity_of_concern?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="concern_raised_internal">Concern Raised Internal</label>
            <select class="form-select" aria-label="Default select example" {...register('concern_raised_internal',{required:true})} >
                <option  selected disabled>Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            {errors.concern_raised_internal?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="status_of_concern">Status of Concern</label>
            <select class="form-select" aria-label="Default select example" {...register('status_of_concern',{required:true})}>
                <option  selected disabled>Select</option>
                <option value="inprogress">In-Progress</option>
                <option value="resolved">Resolved</option>
                <option value="waiting">Waiting</option>
            </select>
            {errors.status_of_concern?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="concern_mitigated_on_date">Concern Mitigated On</label>
            <input type="date" {...register('concern_mitigated_on_date',{required:true})} i className='form-control'/>
            {errors.concern_mitigated_on_date?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={projectConcern}>Create</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
