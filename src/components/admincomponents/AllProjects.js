import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import CreateProject from "./CreateProject";
import { useNavigate } from "react-router-dom";

export default function AllProjects() {
  let navigate = useNavigate();
  let [project, setAllProjects] = useState([]);

  const token = sessionStorage.getItem("token");
  //Function to delete project based on ID
  const deleteProj = async (id) => {
    await axios.delete(`http://localhost:4000/admin/deleteProject/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getProjectData();
  };
  //Function to get all the project details
  const getProjectData = async () => {
    let res = await axios.get(`http://localhost:4000/admin/getProjectDetails`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAllProjects(res.data.projects);
  };
  //Use Effect displays the Projects as soon as the admin page loads
  useEffect(() => {
    getProjectData();
  }, []);
  return (
    <div>
      {/* Component to create Project  */}
      <CreateProject getProjectData={getProjectData} />
      {/*Table to display The admin Dashboard with  all projects */}
      <p className="fs-3 text-center">PROJECT PORTFOLIO DASHBOARD</p>
      <table class="table table-hover table-bordered table-responsive shadow">
        <thead>
          <tr>
            <th scope="col">Project-ID</th>
            <th scope="col">GDO</th>
            <th scope="col">Project Manager</th>
            <th scope="row">Project Name</th>
            <th scope="col">Status of Project</th>
            <th scope="col">Project Start date</th>
            <th scope="col">Project End date</th>
            <th scope="col">Fitness</th>
            <th scope="col">Details</th>
            <th scope="col">Delete Project</th>
          </tr>
        </thead>
        <tbody>
          {project.map((proObj) => (
            <tr key={proObj.project_id}>
              <td>{proObj.project_id}</td>
              <td>{proObj.gdoemail}</td>
              <td>{proObj.project_manager_email}</td>
              <td>{proObj.project_name}</td>
              <td>{proObj.status_of_project}</td>
              <td>{proObj.project_start_date}</td>
              <td>{proObj.project_end_date}</td>
              <td>{proObj.project_fitness}</td>
              <td>
                <button
                  className="btn btn-dark"
                  onClick={() => navigate(`/getspecific/${proObj.project_id}`)}
                >
                  Details
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProj(proObj.project_id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
