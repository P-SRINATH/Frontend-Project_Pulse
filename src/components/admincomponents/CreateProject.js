import React from 'react'
import {Modal} from 'react-bootstrap' 
import {Button} from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function CreateProject(props) {

    let token=sessionStorage.getItem("token")
  //We can get and set values in the form using getvalues and setvalue
  let {register,formState:{errors},getValues,reset}=useForm()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createProject=async()=>{
        let userObj=getValues()
        let res=await axios.post('http://localhost:4000/admin/createProject',userObj,{
            headers:{Authorization:`Bearer ${token}`}
        })
        props.getProjectData()
        reset()
        handleClose()

    }
    return (
     <div>
        <Button variant="dark" onClick={handleShow}>Create Project</Button>
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
            <label htmlFor="gdoemail">GDO Email</label>
            <input type="text" {...register('gdoemail',{required:true})}  className='form-control'/>
            {errors.gdoemail?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="project_manager_email">Project Manager Email</label>
            <input type="text" {...register('project_manager_email',{required:true})} className='form-control'/>
            {errors.project_manager_email?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="project_name">Project Name</label>
            <input type="text" {...register('project_name',{required:true})}  className='form-control'/>
            {errors.project_name?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="project_client">Project Client</label>
            <input type="text" {...register('project_client',{required:true})}  className='form-control'/>
            {errors.project_client?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="client_account">Client Account</label>
            <input type="number" {...register('client_account',{required:true})}  className='form-control'/>
            {errors.client_account?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="client_account_manager">Client Account Manager</label>
            <input type="text" {...register('client_account_manager',{required:true})} className='form-control'/>
            {errors.client_account_manager?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="status_of_project">Status Of Project</label>
            <input type="text" {...register('status_of_project',{required:true})} i className='form-control'/>
            {errors.status_of_project?.type==='required' && <p className='text-danger'>Required*</p>}
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
          <div className='mt-1'>
            <label htmlFor="project_fitness">Project Fitness</label>
            {/* <input type="text" {...register('project_fitness',{required:true})}  className='form-control'/> */}
            <select class="form-select" aria-label="Default select example"  {...register('project_fitness',{required:true})} >
                <option selected disabled>Select</option>
                <option value="amber">Amber</option>
                <option value="green">Green</option>
                <option value="red">Red</option>
            </select>
            {errors.project_fitness?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="domain_of_project">Domain of Project</label>
            <input type="text" {...register('domain_of_project',{required:true})}  className='form-control'/>
            {errors.domain_of_project?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          <div className='mt-1'>
            <label htmlFor="type_of_project">Type of Project</label>
            <input type="text" {...register('type_of_project',{required:true})}  className='form-control'/>
            {errors.type_of_project?.type==='required' && <p className='text-danger'>Required*</p>}
          </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={createProject}>Create</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
