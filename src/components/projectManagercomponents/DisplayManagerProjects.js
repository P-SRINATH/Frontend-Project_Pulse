import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
export default function DisplayManagerProjects() {
  let navigate = useNavigate();
  let { userObj } = useSelector((state) => state.login);
  console.log("user object in Project manager", userObj);
  let [project, setProjects] = useState([]);
  const token = sessionStorage.getItem("token");
  const getProjects = async () => {
    let res = await axios.get(
      `http://localhost:4000/projectManager/getProjectByManager/${userObj.user_email}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setProjects(res.data.projects);
  };
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <div>
      <p className=" lead fw-bold fs-3 text-center">PROJECTS</p>
      <table class="table table-hover table-bordered table-responsive shadow ">
        <thead>
          <tr>
            <th>Project Id</th>
            <th>GDO</th>
            <th>Project Manager</th>
            <th>Project Name</th>
            <th>Project Client</th>
            <th>Status of Project</th>
            <th>Project Start Date</th>
            <th>Project Fitness</th>
            <th>Domain of Project</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {project?.map((proObj) => (
            <tr key={proObj.id}>
              <td>{proObj.project_id}</td>
              <td>{proObj.gdoemail}</td>
              <td>{proObj.project_manager_email}</td>
              <td>{proObj.project_name}</td>
              <td>{proObj.project_client}</td>
              <td>{proObj.status_of_project}</td>
              <td>{moment(proObj.project_start_date).format("YYYY-MM-DD")}</td>
              <td>{proObj.project_fitness}</td>
              <td>{proObj.domain_of_project}</td>
              <td>
                <button
                  className="btn btn-dark"
                  onClick={() => navigate(`/getspecific/${proObj.project_id}`)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-box-arrow-up-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
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
