import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Container from "../../layout/container/Container";
import Loading from "../../layout/loading/Loading";
import Message from "../../layout/message/Message";
import ProjectForm from "../../project/project-form/ProjectForm";
import ServiceCard from "../../service/service-card/ServiceCard";
import ServiceForm from "../../service/service-form/ServiceForm";
import styles from "./Project.module.css";

const url = "http://localhost:5000/projects";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [services, setServices] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
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
          setServices(data.services);
          setShowProjectForm((value) => !value);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, [id]);

  function editPost(project) {
    if (project.budget < project.cost) {
      setMessage("Budget can't be lower than Project's total cost");
      setType("error");
      resetMessage();
      return;
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
        setShowProjectForm((value) => !value);
        setMessage("Project updated!");
        setType("success");
        resetMessage();
      })
      .catch((err) => console.log(err));
  }

  function createService(service) {
    // service validation
    if (!service?.name) {
      setMessage("Empty names are not allowed");
      setType("error");
      resetMessage();
      return;
    }

    // duplicate validation
    const servicesNames = project.services.map((service) => service.name);
    const nameExists = servicesNames.includes(service.name);
    if (nameExists) {
      setMessage("Service name already exists, choose a different one");
      setType("error");
      resetMessage();
      return;
    }

    service.id = uuidv4();
    project.services.push(service);

    const serviceCost = service.cost;
    const newCost = parseFloat(project.cost) + parseFloat(serviceCost);

    // max value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage("Budget exceeded, verify the services cost!");
      setType("error");
      resetMessage();
      project.services.pop();
      return;
    }

    // add service cost to project total cost
    project.cost = newCost;

    // update project
    fetch(`${url}/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        // show services
        setServices(data.services);
        setShowServiceForm(!showServiceForm);
        setMessage("Serviço adicionado!");
        setType("success");
        resetMessage();
      })
      .catch((err) => console.log(err));
  }

  function removeService(service) {}

  function toggleProjectForm() {
    setShowProjectForm((value) => !value);
  }

  function toggleServiceForm() {
    setShowServiceForm((value) => !value);
  }

  function resetMessage() {
    setTimeout(() => {
      setMessage(null);
    }, 3010);
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
                  <ProjectForm btnText="Save Project" handleSubmit={editPost} />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Add a service:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Add Service" : "Close"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Add Service"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Services</h2>
            <Container customClass="start">
              {services.length ? (
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))
              ) : (
                <p>There are no registered services</p>
              )}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
