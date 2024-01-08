import Input from "../../form/input/Input";
import Select from "../../form/select/Select";
import Submit from "../../form/submit/Submit";
import styles from "./ProjectForm.module.css";

function ProjectForm({ btnText }) {
  return (
    <form className={styles.form}>
      <Input
        type="text"
        text="Project Name"
        name="name"
        placeholder="Insert a project name"
      />
      <Input
        type="number"
        text="Project Budget"
        name="budget"
        placeholder="Insert total budget"
      />
      <Select name="category_id" text="Select a category" />
      <Submit text={btnText} />
    </form>
  );
}

export default ProjectForm;
