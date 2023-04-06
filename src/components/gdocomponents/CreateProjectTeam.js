import React from 'react'
import {Modal} from 'react-bootstrap' 
import {Button} from 'react-bootstrap'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function CreateProjectTeam() {
    //Get the token from the session Storage
    let token=sessionStorage.getItem("token")
    //We can get and set values in the form using getvalues and setvalue
    let {register,formState:{errors},getValues,reset}=useForm()
  
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      //Function to create project team 
      const createProjectTeam=async()=>{
          let userObj=getValues()
          let res=await axios.post('http://localhost:4000/gdo/addProjectTeam',userObj,{
              headers:{Authorization:`Bearer ${token}`}
          })
          console.log(res.data)
          reset()
          handleClose()
      }
  
    return (
    <div className='mt-4'>
      {/*Create Project Team using Bootstrap Modal and React */}
      <div className='container me-2 h-100  text-dark shadow'>
        <p className='mt-4'>Hey GDO, Welcome !!! Create your project team Here!!!</p>
       <Button variant="dark mb-4 rounded" onClick={handleShow}>Create Project Team</Button>
       </div>
        <Modal show={show} onHide={handleClose} backdrop="static" className='bg-light'>
        <Modal.Header closeButton>
          <Modal.Title>Enter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className='w-75'>
          <div className='mt-1'>
            <label htmlFor="resource_name">Resource Email</label>
            <input type="text" {...register('resource_name',{required:true})}  className='form-control'/>
            {errors.resource_name?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="role_in_project">Role in project</label>
            <input type="text" {...register('role_in_project',{required:true})}  className='form-control'/>
            {errors.role_in_project?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="project_start_date">Project Start Date</label>
            <input type="date" {...register('project_start_date',{required:true})}  className='form-control'/>
            {errors.project_start_date?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="project_end_date">Project End Date</label>
            <input type="date" {...register('project_end_date')}  className='form-control'/>
          </div>
          <div>
          <label htmlFor="project_status">Project Status</label>
            <select class="form-select" aria-label="Default select example" {...register('project_status',{required:true})} >
                <option selected disabled>Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            {errors.project_status?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="billing_status">Billing Status</label>
            
            <select class="form-select" aria-label="Default select example" {...register('billing_status',{required:true})} >
                <option selected disabled>Select</option>
                <option value="billed">Billed</option>
                <option value="unbilled">Unbilled</option>
            </select>
            {errors.billing_status?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div>
          <label htmlFor="exposed_to_customer">Exposed To Customer</label>
           
            <select class="form-select" aria-label="Default select example" {...register('exposed_to_customer',{required:true})} >
                <option selected disabled>Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            {errors.exposed_to_customer?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="allocation_type">Allocation Type</label>
            <input type="text" {...register('allocation_type',{required:true})}  className='form-control'/>
            {errors.allocation_type?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-2'>
            <label htmlFor="project_id">Add Resource to Project(Mention Project ID)</label>
            <input type="number" {...register('project_id',{required:true})} className='form-control'/>
            {errors.project_id?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={createProjectTeam}>Create</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}