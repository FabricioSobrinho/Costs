import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container } from "reactstrap";

import ProjectForm from "../components/project/ProjectForm";
import Message from "../components/layout/Message";
import ServiceForm from "../components/services/ServiceForm";
import Input from "../components/form/Input";

import Loader from "../components/layout/Loader";
import ServiceCard from "../components/services/ServiceCard";
import axios from "axios";
import Button from "../components/form/Button";

function Project() {
  const { name } = useParams();
  const [project, setProject] = useState({});

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [services, setServices] = useState([]);

  const [service, setService] = useState({
    projectName: "",
    serviceName: "",
    cost: 0,
    description: "",
  });

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
  const createService = async () => {
    setMessage("");
    setType("");

    try {
      await axios.post("http://localhost:5065/services", service);

      const newCost = parseFloat(project.cost) + parseFloat(service.cost);

      setProject((prevProject) => ({
        ...prevProject,
        cost: newCost,
      }));
      setServices((prevData) => [...prevData, service]);

      setMessage("Serviço adicionado com sucesso!");
      setType("success");
      setShowServiceForm(false);
    } catch (err) {
      console.log(err);
      setMessage("Ocorreu um erro ao adicionar o serviço.");
      setType("error");
    }
  };

  const handleChange = (e) => {
    setService((prevData) => ({
      ...prevData,
      projectName: project.projectName,
      [e.target.name]: e.target.value,
    }));
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
      method: "PATCH",
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

  const removeService = async (name, cost) => {
    setMessage("");

    try {
      const response = await axios.delete(
        `http://localhost:5065/services/:${name}`
      );

      if (response.status === 200) {
        const servicesUpdated = project.services.filter(
          (service) => service.serviceName !== name
        );

        const projectUpdated = { ...project };
        projectUpdated.services = servicesUpdated;
        projectUpdated.cost =
          parseFloat(projectUpdated.cost) - parseFloat(cost);

        setProject(projectUpdated);
        setServices(servicesUpdated);
        setMessage("Serviço removido com sucesso.");
        setType("success");
      }
    } catch (err) {
      console.log(err);
    }
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
                  <>
                    <Input
                      type="text"
                      text="Nome do serviço"
                      placeholder="Insira o nome do serviço"
                      name="serviceName"
                      handleOnChange={handleChange}
                    />
                    <Input
                      type="number"
                      text="Custo do serviço"
                      placeholder="Insira o custo do serviço"
                      name="cost"
                      handleOnChange={handleChange}
                    />
                    <Input
                      type="text"
                      text="Descrição do serviço"
                      placeholder="Descreva o serviço"
                      name="description"
                      handleOnChange={handleChange}
                    />
                    <Button
                      handleClick={createService}
                      text={"Adicionar serviço"}
                    />
                  </>
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
                      name={service.serviceName}
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
