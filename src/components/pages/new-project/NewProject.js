import { useNavigate } from 'react-router-dom';

import ProjectForm from '../../project/project-form/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    /** Initializes project cost and services */
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        // redirect
        navigate("/projects", {
          state: { message: "Project Created Successfully!" },
        });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className={styles.new_project_container}>
      <h1>Create Project</h1>
      <p>Create your project then add services</p>
      <ProjectForm btnText="Create Project" handleSubmit={createPost} />
    </div>
  );
}

export default NewProject;
