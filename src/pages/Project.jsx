import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container } from "reactstrap";

import ProjectForm from "../components/project/ProjectForm";
import Message from "../components/layout/Message";
import ServiceForm from "../components/services/ServiceForm";
import Loader from "../components/layout/Loader";
import ServiceCard from "../components/services/ServiceCard";
import axios from "axios";

function Project() {
  const { name } = useParams();
  const [project, setProject] = useState({});

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [services, setServices] = useState([]);

  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    const requestProject = async () => {
      try {
        const projectData = await axios.get(
          `http://localhost:5065/projects/:${name}`
        );

        setProject(projectData.data);
        setServices(projectData.data.services);
      } catch (err) {
        console.log(err);
      }
    };

    requestProject();
  }, [name]);

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };
  const toggleServiceForm = () => {
    setShowServiceForm(!showServiceForm);
  };
  const createService = () => {
    setMessage("");
    setType("");

    const lastService = project.services[project.services.length - 1];

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.budget)) {
      project.services.pop();
      return false;
    }
    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setMessage("Serviço adicionado com sucesso!");
        setType("success");
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  };

  const toFixed = (value) => {
    let stringValue = String(value);
    if (!stringValue.includes(".")) {
      return stringValue + ".00";
    } else {
      return stringValue;
    }
  };

  const editPost = (project) => {
    setMessage("");
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PATCH", //metodo para atualizar os dados
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Projeto atualizado com sucesso!");
        setType("success");
      })
      .catch((err) => console.log(err));
  };
  const removeService = (id, cost) => {
    setMessage("");
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );

    const projectUpdated = project;
    projectUpdated.services = servicesUpdated;

    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json)
      .then((data) => {
        setProject(projectUpdated);
        setServices(servicesUpdated);
        setMessage("Serviço removido com sucesso.");
        setType("success");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {project.projectName ? (
        <div className={styles.projectDetails}>
          {message && <Message msg={message} type={type} time="3000" />}
          <Container customClass="column">
            <div className={styles.detailsContainer}>
              <h1>{project.projectName} </h1>
              <hr className={styles.line} />
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={`${styles.projectInfos} ${styles.extra}`}>
                  <p>
                    <span>Categoria: </span>
                    {(() => {
                      switch (project.category) {
                        case 0:
                          return "infra";
                        case 1:
                          return "desenvolvimento";
                        case 2:
                          return "design";
                        case 3:
                          return "planejamento";
                        default:
                          return "Categoria indefinida";
                      }
                    })()}
                  </p>
                  <p>
                    <span>Orçamento total: </span> R${toFixed(project.budget)}
                  </p>
                  <p>
                    <span>Orçamento Utilizado: </span> R${toFixed(project.cost)}
                  </p>
                  <p>
                    <span>Orçamento disponível: </span> R$
                    {toFixed(project.budget - project.cost)}
                  </p>
                </div>
              ) : (
                <div className={styles.projectInfos}>
                  Detalhes do projeto
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.serviceFormContainer}>
              <h2>Adicione o serviço</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.projectInfos}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar serviço"
                    projectData={project}
                    maxValueService={project.budget}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container>
              <div className={styles.servicesCards}>
                {services.length === 0 ? (
                  <p>Não há serviços cadastrados.</p>
                ) : (
                  services.map((service) => (
                    <ServiceCard
                      id={service.id}
                      name={service.nameService}
                      cost={service.cost}
                      description={service.description}
                      key={service.id}
                      handleRemove={removeService}
                    />
                  ))
                )}
              </div>
            </Container>
          </Container>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Project;
