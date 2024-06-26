/* eslint-disable no-unused-vars */
import Message from "../components/layout/Message";
import { useLocation } from "react-router-dom";
import LinkButton from "../components/layout/LinkButton";

import Container from "../components/layout/Container";
import Loader from "../components/layout/Loader";
import styles from "./Projects.module.css";

import ProjectCard from "../components/project/ProjectCard";
import { useState, useEffect } from "react";

import axios from "axios";

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
    const loadProjects = async () => {
      try {
        const apiProjects = await axios.get("http://localhost:5065/projects");
        setProjects((prev) => apiProjects.data);
        setLoaderRemove(true);
      } catch (err) {
        console.log(err);
      }
    };

    loadProjects();
  }, []);

  const removeProject = async (name) => {
    setProjectMessage("");
    try {
      const updateProjects = projects.filter(
        (project) => project.projectName != name
      );
      
      await axios.delete(`http://localhost:5065/projects/:${name}`);
      setProjectMessage("Projeto deletado!");
      setProjects(updateProjects);
    } catch (err) {
      console.log(err);
    }
  };

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
                name={project.projectName}
                id={project.id}
                budget={project.budget}
                category={project.category}
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
