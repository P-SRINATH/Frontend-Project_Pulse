import React from "react";
import { useSelector } from "react-redux";
import projects2 from "../images/projects2.svg";
import DisplayProjectConcerns from "./DisplayProjectConcerns";
import DisplayProjectUpdates from "./DisplayProjectUpdates";
import DisplayManagerProjects from "./DisplayManagerProjects";

export default function PmDashboard() {
  let { state } = useSelector((state) => state.login);
  //console.log(state)
  return (
    <div>
      <div className="row">
        <div className="container col-sm-2">
          <img
            src={projects2}
            width="200px"
            height="200px"
            alt="img"
            className="mt-4"
          ></img>
        </div>
        <div className="col-sm-10">
          <DisplayManagerProjects />
          <DisplayProjectConcerns />
          <DisplayProjectUpdates />
        </div>
      </div>
    </div>
  );
}
