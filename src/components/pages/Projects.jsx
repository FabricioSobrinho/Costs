import Message from "../layout/Message"
import { useLocation } from "react-router-dom"
import LinkButton from "../layout/LinkButton"

import Container from "../layout/Container"
import styles from "./Projects.module.css"

import ProjectCard from "../project/ProjectCard"
import { useState, useEffect } from "react"

function Projects() {
  const [projects, setProjects] = useState([])

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
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className={styles.projectContainer}>
      <div className={styles.titleContainer}>
        <h1>Meus projetos</h1>
        <LinkButton to="/newproject" text="Criar projeto" />
      </div>

      {message && <Message msg={message} type="success" />}

      <Container customClass="start"> 
      <div className={styles.projectsShow}>
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              name={project.name}
              id={project.id}
              budget={project.budget}
              category={project.category ? project.category.name: "Categoria Indefinida"}
              key={project.id}
              // handleRemove=
            />
          ))}
      </div>
      </Container>
    </div>
  )
}

export default Projects
