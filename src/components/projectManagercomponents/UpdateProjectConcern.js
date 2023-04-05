import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios';

export default function UpdateProjectConcern(props) {
    let loadedData=props.proObj
    let token=sessionStorage.getItem("token")
    //We can get and set values in the form using getvalues and setvalue
    let {register,formState:{errors},getValues,setValue}=useForm()
  
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const updateConcern=async()=>{
        let userObj=getValues()
        console.log(userObj)
        await axios.put(`http://localhost:4000/projectManager/updateProjectConcerns/${props.proObj.id}`,userObj,{
            headers:{Authorization:`Bearer ${token}`}
        })
        props.getProjectConcern()
        handleClose()

    }
    useEffect(()=>{
        setValue("project_id",loadedData.project_id)
        setValue("concern_description",loadedData.concern_description)
        setValue("concern_raised_by",loadedData.concern_raised_by)
        setValue("concern_raised_on_date",loadedData.concern_raised_on_date)
        setValue("severity_of_concern",loadedData.severity_of_concern)
        setValue("concern_raised_internal",loadedData.concern_raised_internal)
        setValue("status_of_concern",loadedData.status_of_concern)
        setValue("concern_mitigated_on_date",loadedData.concern_mitigated_on_date)

    },[])
  return (
    <div>
      <Button variant="warning" onClick={handleShow}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </Button>
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
                <option disabled>Select</option>
                <option value="high">High</option>
                <option value="low">Low</option>
                <option value="intermediate">Intermediate</option>
            </select>
            {errors.severity_of_concern?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="concern_raised_internal">Concern Raised Internal</label>
            <select class="form-select" aria-label="Default select example" {...register('concern_raised_internal',{required:true})} >
                <option disabled>Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            {errors.concern_raised_internal?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="status_of_concern">Status of Concern</label>
            {/* <input type="text" {...register('status_of_concern',{required:true})} className='form-control'/> */}
            <select class="form-select" aria-label="Default select example" {...register('status_of_concern',{required:true})}>
                <option disabled>Select</option>
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
          <Button variant="warning" onClick={updateConcern}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
