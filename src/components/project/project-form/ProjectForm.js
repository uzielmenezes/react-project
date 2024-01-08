function ProjectForm() {
  return (
    <form>
      <div>
        <input type="text" placeholder="Insert a project name" />
      </div>
      <div>
        {" "}
        <input type="number" placeholder="Insert total budget" />
      </div>
      <div>
        <select name="category_id">
          <option disabled selected>
            Select a category
          </option>
        </select>
      </div>
      <div>
        <input type="submit" value="Create Project" />
      </div>
    </form>
  );
}

export default ProjectForm;
