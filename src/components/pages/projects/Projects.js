import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Loading from "../../layout/loading/Loading";
import Message from "../../layout/message/Message";
import ProjectCard from "../../project/project-card/ProjectCard";
import Container from "./../../layout/container/Container";
import LinkButton from "./../../layout/link-button/LinkButton";
import styles from "./Project.module.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);

  const location = useLocation();
  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((e) => console.log(e));
    }, 300);
  }, []);

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>My Projects</h1>
        <LinkButton to="/newproject" text="Create New Project" />
      </div>
      {message && <Message type="success" message={message} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>You don't have any projects yet!</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
