import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../../layout/container/Container";
import Loading from "../../layout/loading/Loading";
import Message from "../../layout/message/Message";
import ProjectForm from "../../project/project-form/ProjectForm";
import styles from "./Project.module.css";

const url = "http://localhost:5000/projects";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(`${url}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProject(data);
          setShowProjectForm(!showProjectForm);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, [id]);

  function editPost(project) {
    if (project.budget < project.cost) {
      // to be reviewed
      // setMessage("Budget can't be lower than Project's Cost");
      // setType("error");
      // return;
    }

    fetch(`${url}/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(!showProjectForm);
        setMessage("Project updated!");
        setType("success");
      })
      .catch((err) => console.log(err));

    setMessage();
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} message={message} />}
            <div className={styles.details_container}>
              <h1>Project: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Edit Project" : "Close"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Category:</span> {project?.category.name}
                  </p>
                  <p>
                    <span>Total Budget:</span> USD {project?.budget}
                  </p>
                  <p>
                    <span>Total Consumed:</span> USD {project?.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    btnText="Save Project"
                    handleSubmit={editPost}
                    projectData={project}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
