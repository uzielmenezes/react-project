import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../../layout/container/Container";
import Loading from "../../layout/loading/Loading";
import styles from "./Project.module.css";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProject(data);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, [id]);

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project ? (
        <div className={styles.project_details}>
          <Container customClass="column">
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
                <div className={styles.project_info}>incoming form</div>
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
