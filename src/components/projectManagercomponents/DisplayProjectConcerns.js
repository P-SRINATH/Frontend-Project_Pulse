import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CreateProjectConcerns from "./CreateProjectConcerns";
import UpdateProjectConcern from "./UpdateProjectConcern";
import moment from "moment";
import { useSelector } from "react-redux";

export default function DisplayProjectConcerns() {
  let [concern, setProjectConcerns] = useState([]);
  let { userObj } = useSelector((state) => state.login);
  const token = sessionStorage.getItem("token");
  const getProjectConcern = async () => {
    let res = await axios.get(
      `http://localhost:4000/projectManager/getProjectConcerns/${userObj.user_email}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("concern response", res);
    setProjectConcerns(res.data.payload);
  };
  useEffect(() => {
    getProjectConcern();
  }, []);
  return (
    <div>
      <p className=" lead fw-bold fs-3 text-center">PROJECT CONCERNS</p>
      <table class="table table-hover table-bordered table-responsive shadow ">
        <thead>
          <tr>
            <th scope="col">Concern Id</th>
            <th scope="col">Concern Description</th>
            <th scope="col">Concern Raised By</th>
            <th scope="row">Concern Raised On</th>
            <th scope="col">Severity of concern</th>
            <th scope="col">Concern Raised Internal</th>
            <th scope="col">Status of Concern</th>
            <th scope="col">Concern Mitigated On</th>
            <th scope="col">Project-ID</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {concern?.map((proObj) => (
            <tr key={proObj.id}>
              <td>{proObj.id}</td>
              <td>{proObj.concern_description}</td>
              <td>{proObj.concern_raised_by}</td>
              <td>
                {moment(proObj.concern_raised_on_date).format("YYYY-MM-DD")}
              </td>
              <td>{proObj.severity_of_concern}</td>
              <td>{String(proObj.concern_raised_internally)}</td>
              <td>{proObj.status_of_concern}</td>
              <td>
                {moment(proObj.concern_mitigated_on_date).format("YYYY-MM-DD")}
              </td>
              <td>{proObj.project_id}</td>
              <td>
                <UpdateProjectConcern
                  getProjectConcern={getProjectConcern}
                  proObj={proObj}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreateProjectConcerns getProjectConcern={getProjectConcern} />
    </div>
  );
}
