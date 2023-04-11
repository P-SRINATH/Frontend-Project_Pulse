import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CreateProjectUpdates from "./CreateProjectUpdates";
import moment from "moment";
import { useSelector } from "react-redux";
export default function DisplayProjectUpdates() {
  let [update, setProjectUpdates] = useState([]);
  let { userObj } = useSelector((state) => state.login);
  const token = sessionStorage.getItem("token");
  const getProjectUpdates = async () => {
    let res = await axios.get(
      `http://localhost:4000/projectManager/getProjectUpdates/${userObj.user_email}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setProjectUpdates(res.data.payload);
  };
  useEffect(() => {
    getProjectUpdates();
  }, []);
  return (
    <div>
      <p className=" lead fs-3 fw-bold text-center">PROJECT UPDATES</p>
      <table class="table table-hover table-bordered table-responsive shadow">
        <thead>
          <tr>
            <th scope="col">Updates ID</th>
            <th scope="col">Date</th>
            <th scope="col">Project Status Update</th>
            <th scope="row">Resourcing Status</th>
            <th scope="col">Quality Status</th>
            <th scope="col">Waiting For Client</th>
            <th scope="col">Project-ID</th>
          </tr>
        </thead>
        <tbody>
          {update?.map((proObj) => (
            <tr key={proObj.id}>
              <td>{proObj.id}</td>
              <td>{moment(proObj.date).format("YYYY-MM-DD")}</td>
              <td>{proObj.project_status_update}</td>
              <td>{proObj.resourcing_status}</td>
              <td>{proObj.quality_status}</td>
              <td>{proObj.waiting_for_client}</td>
              <td>{proObj.project_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreateProjectUpdates getProjectUpdates={getProjectUpdates} />
    </div>
  );
}
