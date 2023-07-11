import Message from "../layout/Message"
import { useLocation } from "react-router-dom"
import LinkButton from "../layout/LinkButton"

import Container from "../layout/Container"
import Loader from "../layout/Loader"
import styles from "./Projects.module.css"

import ProjectCard from "../project/ProjectCard"
import { useState, useEffect } from "react"

function Projects() {
  const [projects, setProjects] = useState([])

  const [loaderRemove, setLoaderRemove] = useState(false)

  const [projectMessage, setProjectMessage] = useState()

  const location = useLocation()
  let message = ""

  if (location.state) {
    message = location.state.message
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
        setProjects(data)
        setLoaderRemove(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function removeProject(id) {
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
            return project.id !== id
          })
        )
        setProjectMessage("Projeto removido com sucesso!")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={styles.projectContainer}>
      <div className={styles.titleContainer}>
        <h1>Meus projetos</h1>
        <LinkButton to="/newproject" text="Criar projeto" />
      </div>

      {message && <Message msg={message} type="success" />}
      {projectMessage && <Message msg={projectMessage} type="success" />}

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
  )
}

export default Projects
