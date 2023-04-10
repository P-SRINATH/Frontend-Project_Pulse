import React, { useEffect } from "react";
import GdoProjects from "./GdoProjects";
import projects2 from "../images/projects2.svg";
import CreateProjectTeam from "./CreateProjectTeam";
import { useState } from "react";
import axios from "axios";
import ResourceRequest from "./ResourceRequest";

//GDO dashboard is the default page that appears when GDO head Logs-in
export default function GdoDashboard() {
  let [resource, setResource] = useState([]);

  const token = sessionStorage.getItem("token");

  const getResourceData = async () => {
    let res = await axios.get(
      `http://localhost:4000/gdo/displayResourceRequest`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setResource(res.data.payload);
  };
  useEffect(() => {
    getResourceData();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="container col-sm-2">
          <img src={projects2} width="200px" height="300px" alt="img"></img>
          {/* Create a Project Team component */}
          <CreateProjectTeam />
          {/* Component to raise Resource request*/}
          <ResourceRequest getResourceData={getResourceData} />
        </div>
        <div className="col-sm-10">
          {/* Component to get all Projects under the GDO */}
          <GdoProjects />
          <p className="fs-3 text-center">RESOURCE REQUESTS</p>
          <table class="table table-hover table-bordered table-responsive shadow">
            <thead>
              <tr className="bg-warning">
                <th scope="col">Resource ID</th>
                <th scope="col">Resource_Raised_BY</th>
                <th scope="col">Project ID</th>
                <th scope="col">Resource Description</th>
              </tr>
            </thead>
            <tbody>
              {resource.map((Obj) => (
                <tr key={Obj.project_id}>
                  <td>{Obj.id}</td>
                  <td>{Obj.request_raised_by}</td>
                  <td>{Obj.project_id}</td>
                  <td>{Obj.resource_desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
