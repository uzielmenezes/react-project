import ProjectForm from "../../project/project-form/ProjectForm";
import styles from "./NewProject.module.css";

function NewProject() {
  return (
    <div className={styles.new_project_container}>
      <h1>Create Project</h1>
      <p>Create your project then add services</p>
      <ProjectForm btnText="Create Project" />
    </div>
  );
}

export default NewProject;
