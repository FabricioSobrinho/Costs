import styles from "./ProjectForm.module.css"

import Input from "../form/Input"
import Select from "../form/Select"
import Button from "../form/Button"

import { useState, useEffect } from "react"
import Message from "../layout/Message"

function ProjectForm({ btnText, handleSubmit, projectData }) {
  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
      },
    })
      .then((resp) => resp.json()) // Adicionado o retorno da resposta json()
      .then((data) => {
        setCategories(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(project)
  }

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value })
  }
  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })
  }
  return (
    <div>
      <form className={styles.form} onSubmit={submit}>
        <div>
          <Input
            type="text"
            text="Nome do projeto"
            placeholder="Nome projeto"
            name="name"
            handleOnChange={handleChange}
            value={project.name ? project.name : ""}
          />
          {!project.name && 
          <Message type="error" msg="Insira o nome do projeto!" />
          }
        </div>
        <div>
          <Input
            type="Number"
            text="Orçamento do projeto"
            placeholder="Orçamento projeto"
            name="budget"
            handleOnChange={handleChange}
            value={project.budget ? project.budget : ""}
          />
           {(!project.budget || project.budget <= 0 || project.budget < project.cost) && 
          <Message type="error" msg="Insira um orçamento válido para o projeto!" />
          }
        </div>
        <div>
          <Select
            name="categoryId"
            text="Selecione a categoria"
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ""}
          />
        </div>
        <div>
          {project.budget && project.name && project.budget > project.cost &&
          <Button text={btnText} />
          }
          
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
