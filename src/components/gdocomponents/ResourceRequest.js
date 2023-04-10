import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ResourceRequest(props) {
  //Token from session storage
  let token = sessionStorage.getItem("token");
  //We can get and set values in the form using getvalues and setvalue
  let {
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Function to create a project
  const raiseRequest = async () => {
    let userObj = getValues();
    await axios.post("http://localhost:4000/gdo/resourceRequest", userObj, {
      headers: { Authorization: `Bearer ${token}` },
    });
    props.getResourceData();
    reset();
    handleClose();
  };
  return (
    <div>
      {/* Creating a Project using Modal and React-Forms */}
      <div className="container me-2 h-100  text-dark shadow">
        <p className="mt-4">Raise your Project Resources Here!!!</p>
        <Button variant="dark mb-4 rounded" onClick={handleShow}>
          Raise Resource
        </Button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="bg-light"
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="w-75">
            <div className="mt-2">
              <label htmlFor="id">Resource ID</label>
              <input
                type="number"
                {...register("id", { required: true })}
                className="form-control"
              />
              {errors.id?.type === "required" && (
                <p className="text-danger">Required*</p>
              )}
            </div>
            <div className="mt-1">
              <label htmlFor="request_raised_by">Request Raised By</label>
              <input
                type="text"
                {...register("request_raised_by", { required: true })}
                className="form-control"
              />
              {errors.request_raised_by?.type === "required" && (
                <p className="text-danger">Required*</p>
              )}
            </div>
            <div className="mt-1">
              <label htmlFor="project_id">Project ID</label>
              <input
                type="text"
                {...register("project_id", { required: true })}
                className="form-control"
              />
              {errors.project_id?.type === "required" && (
                <p className="text-danger">Required*</p>
              )}
            </div>
            <div className="mt-1">
              <label htmlFor="resource_desc">Resource Description</label>
              <input
                type="text"
                {...register("resource_desc", { required: true })}
                className="form-control"
              />
              {errors.resource_desc?.type === "required" && (
                <p className="text-danger">Required*</p>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={raiseRequest}>
            Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
