import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

export default function GetSpecificProjectDetails() {
  let params = useParams();
  console.log(params);
  //let {state}=useLocation()
  let [fitness, setFitness] = useState([]);
  let [teams, setTeams] = useState([]);
  let [concerindi, setConcernIndi] = useState([]);
  let [proObj, setProjects] = useState({});
  let [concerns, setConcerns] = useState([]);
  let [updates, setUpdates] = useState([]);
  let [team, setTeam] = useState([]);
  let [message, setMessage] = useState("");
  let { userObj, status } = useSelector((state) => state.login);

  let token = sessionStorage.getItem("token");
  //getProjectDetails
  const getProjectDetails = async () => {
    if (userObj.user_role === "GDO") {
      let res = await axios.get(
        `http://localhost:4000/gdo/getProjectDetails/${userObj.user_email}/${params.project_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        setFitness(res.data.ProjectFitness);
        setTeams(res.data.TeamMembers);
        setConcernIndi(res.data.ConcernIndicator);
        setProjects(res.data.projects);
        setConcerns(res.data.projects.Project_concerns);
        setUpdates(res.data.projects.Project_updates);
        setTeam(res.data.projects.Project_Teams);
      } else {
        setMessage(res.data.message);
      }
    } else if (userObj.user_role === "ProjectManager") {
      let res = await axios.get(
        `http://localhost:4000/projectManager/getSpecificProjectDetails/${userObj.user_email}/${params.project_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        setFitness(res.data.ProjectFitness);
        setTeams(res.data.TeamMembers);
        setConcernIndi(res.data.ConcernIndicator);
        setProjects(res.data.projects);
        setConcerns(res.data.projects.Project_concerns);
        setUpdates(res.data.projects.Project_updates);
        setTeam(res.data.projects.Project_Teams);
      } else {
        setMessage(res.data.message);
      }
    } else if (userObj.user_role === "Admin") {
      let res = await axios.get(
        `http://localhost:4000/admin/getSpecificProjectDetails/${params.project_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        setFitness(res.data.ProjectFitness);
        setTeams(res.data.TeamMembers);
        setConcernIndi(res.data.ConcernIndicator);
        setProjects(res.data.projects);
        setConcerns(res.data.projects.Project_concerns);
        setUpdates(res.data.projects.Project_updates);
        setTeam(res.data.projects.Project_Teams);
      } else {
        setMessage(res.data.message);
      }
    }
  };
  useEffect(() => {
    // getUserByEmail()
    getProjectDetails();
  }, []);
  if (status === "success") {
    return (
      <div className=" container ">
        <div class="row text-center">
          <div class="col-sm-4">
            <div class="card shadow bg-warning">
              <div class="card-body">
                <h5 class="card-title">Project Fitness: </h5>
                <p class="card-text">
                  Shows the Fitness of this project with the organization
                </p>
                <h2 className="lead fw-bold">{fitness}</h2>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card shadow bg-dark text-light">
              <div class="card-body">
                <h5 class="card-title">Team Members</h5>
                <p class="card-text">
                  Number of employess working on this particular Project.
                </p>
                <h2 className="lead fw-bold">{teams}</h2>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card shadow bg-warning">
              <div class="card-body">
                <h5 class="card-title text-center">Concern Indicator</h5>
                <p class="card-text">
                  Shows the Number of Concerns raised for this Specific Project
                </p>
                <h2 className="lead fw-bold">{concerindi}</h2>
              </div>
            </div>
          </div>
        </div>
        <h2 className="lead mt-4 mb-4 fw-bold text-center">PROJECT DETAILS</h2>
        <h2 className="text-danger">{message}</h2>
        <table className="table  border-none shadow">
          <thead>
            {/* <tr className="bg-dark text-light">
            <th>Project Id</th>
            <th>GDO</th>
            <th>Project Manager</th>
            <th>Project Name</th>
            <th>Project Client</th>
            <th>Status of Project</th>
            <th>Project Start Date</th>
            <th>Project Fitness</th>
            <th>Domain of Project</th>
            <th>Type of Project</th>
          </tr> */}
          </thead>
          <tbody>
            <tr key={proObj.project_id}>
              <td>
                <b>Project ID :</b> {proObj.project_id}
              </td>
              <td>
                <b>GDO :</b> {proObj.gdoemail}
              </td>
              <td>
                <b>Project Manager :</b> {proObj.project_manager_email}
              </td>
              <td>
                <b>Project Name : </b>
                {proObj.project_name}
              </td>
            </tr>
            <tr>
              <td>
                <b>Project Client :</b> {proObj.project_client}
              </td>
              <td>
                <b>Client Account :</b> {proObj.client_account}
              </td>
              <td>
                <b>Client Manager :</b> {proObj.client_account_manager}
              </td>
              <td>
                <b>Status of Project:</b> {proObj.status_of_project}
              </td>
            </tr>
            <tr>
              <td>
                <b>Start Date :</b>
                {moment(proObj.project_start_date).format("YYYY-MM-DD")}
              </td>
              <td>
                <b>End Date :</b>
                {moment(proObj.project_end_date).format("YYYY-MM-DD")}
              </td>
              <td>
                <b>Domain of Project :</b> {proObj.domain_of_project}
              </td>
              <td>
                <b>Type of Project :</b> {proObj.type_of_project}
              </td>
            </tr>
          </tbody>
        </table>
        <h3 className=" lead fw-bold mt-4 mb-4 text-center">
          {" "}
          PROJECT CONCERNS
        </h3>
        <table className="table text-center table-bordered shadow ">
          <thead>
            <tr className="bg-warning">
              <th>Id</th>
              <th>Concern Description</th>
              <th>Concern Raised By</th>
              <th>Concern Raised Date</th>
              <th>Severity of Concern</th>
              <th>Concern Raised Internally</th>
              <th>Status of Concern</th>
              <th>Concern Mitigated on</th>
            </tr>
          </thead>
          <tbody>
            {concerns.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.concern_description}</td>
                <td>{item.concern_raised_by}</td>
                <td>
                  {moment(item.concern_raised_on_date).format("YYYY-MM-DD")}
                </td>
                <td>{item.severity_of_concern}</td>
                <td>{String(item.concern_raised_internally)}</td>
                <td>{item.status_of_concern}</td>
                <td>
                  {moment(item.concern_mitigated_on_date).format("YYYY-MM-DD")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="lead mt-4 mb-4 fw-bold text-center">PROJECT UPDATES</h3>
        <table className="table text-center table-bordered shadow">
          <thead>
            <tr className="bg-dark text-light">
              <th>Id</th>
              <th>Date</th>
              <th>Project status Update</th>
              <th>Resourcing status</th>
              <th>Quality Status</th>
              <th>Waiting for Client</th>
            </tr>
          </thead>
          <tbody>
            {updates.map((update, index) => (
              <tr key={index}>
                <td>{update.id}</td>
                <td>{moment(update.date).format("YYYY-MM-DD")}</td>
                <td>{update.project_status_update}</td>
                <td>{update.resourcing_status}</td>
                <td>{update.quality_status}</td>
                <td>{update.waiting_for_client}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="lead mt-4 mb-4 fw-bold text-center">PROJECT TEAM</h2>
        <table className="table text-center table-bordered shadow">
          <thead>
            <tr className="bg-warning">
              <th>Id</th>
              <th>Resource Email</th>
              <th>Role in Project</th>
              <th>Project Start Date</th>
              <th>Project End Date</th>
              <th>Project Status</th>
              <th>Billing Status</th>
              <th>Exposed to Customer</th>
              <th>Allocation Type</th>
            </tr>
          </thead>
          <tbody>
            {team.map((team, index) => (
              <tr key={index}>
                <td>{team.id}</td>
                <td>{team.resource_name}</td>
                <td>{team.role_in_project}</td>
                <td>{moment(team.project_start_date).format("YYYY-MM-DD")}</td>
                <td>{moment(team.project_end_date).format("YYYY-MM-DD")}</td>
                <td>{team.project_status}</td>
                <td>{team.billing_status}</td>
                <td>{String(team.exposed_to_customer)}</td>
                <td>{team.allocation_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div className="text-danger">Page not Found</div>;
  }
}
