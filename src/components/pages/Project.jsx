import styles from "./Project.module.css"

import React from "react"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Loader from "../layout/Loader"
import { Container } from "reactstrap"

function Project() {
  const { id } = useParams()
  const [project, setProject] = useState({})

  const [showProjectForm, setShowProjectForm] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
      })
      .catch((err) => console.log(err))
  }, [id])

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm)
  }
  const toFixed = (value) => {
    let stringValue = String(value)
    if (!stringValue.includes(".")) {
      return stringValue + ".00"
    } else {
      return stringValue
    }
  }
  return (
    <>
      {project.name ? (
        <div className={styles.projectDetails}> 
          <Container customClass="column">
            <div className={styles.detailsContainer}>
              <h1>{project.name} </h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.projectInfos}>
                  <p>
                    <span>Categoria: </span> {project.category.name}
                  </p>
                  <p>
                    <span>Orçamento total: </span> R${toFixed(project.budget)}
                  </p>
                  <p>
                    <span>Orçamento Utilizado: </span> R${toFixed(project.cost)}
                  </p>
                </div>
              ) : (
                <div className={styles.projectInfos}>Detalhes do projeto</div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Project
