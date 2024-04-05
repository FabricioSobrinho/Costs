import Message from "../components/layout/Message";
import { useLocation } from "react-router-dom";
import LinkButton from "../components/layout/LinkButton";

import Container from "../components/layout/Container";
import Loader from "../components/layout/Loader";
import styles from "./Projects.module.css";

import ProjectCard from "../components/project/ProjectCard";
import { useState, useEffect } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [loaderRemove, setLoaderRemove] = useState(false);

  const [projectMessage, setProjectMessage] = useState();

  const location = useLocation();
  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data);
        setLoaderRemove(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function removeProject(id) {
    setProjectMessage("");
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setProjects(
          projects.filter((project) => {
            return project.id !== id;
          })
        );
        setProjectMessage("Projeto removido com sucesso!");
        Location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.projectContainer}>
      <div className={styles.titleContainer}>
        <h1>Meus projetos</h1>
        <LinkButton to="/newproject" text="Criar projeto" />
      </div>

      {message && <Message msg={message} type="success" time="3000" />}
      {projectMessage && (
        <Message msg={projectMessage} type="success" time="3000" />
      )}

      <Container customClass="start">
        <div className={styles.projectsShow}>
          {projects.length > 0 &&
            projects.map((project) => (
              <ProjectCard
                name={project.name}
                id={project.id}
                budget={project.budget}
                category={
                  project.category
                    ? project.category.name
                    : "Categoria Indefinida"
                }
                key={project.id}
                handleRemove={removeProject}
              />
            ))}
          {!loaderRemove && <Loader />}
          {loaderRemove && projects.length === 0 && (
            <p>Não há projetos cadastrados</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Projects;
