import { useState } from "react";

import Input from "../../form/input/Input";
import Submit from "../../form/submit/Submit";
import styles from "../../project/project-form/ProjectForm.module.css";

function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState(null);

  function submit(e) {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Service Name"
        name="name"
        placeholder="Place a service name"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Service Cost"
        name="cost"
        placeholder="Place the total cost"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Service Description"
        name="description"
        placeholder="Write a service description"
        handleOnChange={handleChange}
      />
      <Submit text={btnText} />
    </form>
  );
}

export default ServiceForm;
