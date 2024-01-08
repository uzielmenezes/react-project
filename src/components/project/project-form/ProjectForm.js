import { useEffect, useState } from 'react';

import Input from '../../form/input/Input';
import Select from '../../form/select/Select';
import Submit from '../../form/submit/Submit';
import styles from './ProjectForm.module.css';

function ProjectForm({ btnText }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

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
      <Select
        name="category_id"
        text="Select a category"
        options={categories}
      />
      <Submit text={btnText} />
    </form>
  );
}

export default ProjectForm;
